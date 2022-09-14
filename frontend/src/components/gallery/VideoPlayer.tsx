import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux';
import { windowSizes } from '../../constants/windowSizes';
import useWindowSize from '../../hooks/useWindowSize';
import { FileInterface } from '../../interfaces/file';
import { AppInfo, selectApp } from '../../redux/slices/appSlice';
import { BASE_URL } from '../../requests/routes';
import { detectFileType } from '../../utils/detectFileType';
import { generateRandomBetween } from '../../utils/generateRandomIntBetween';
import Spinner from '../notifications/Loading';

const VideoPlayer: React.FC<{ file: FileInterface }> = ({ file }) => {
    const windowSize = useWindowSize();

    const appInfo: AppInfo = useSelector(selectApp);

    const [playing, setPlaying] = useState(false);
    const [randImage, setRandImage] = useState<string>('');
    const [duration, setDuration] = useState<number | null>(null);
    const [playedTime, setPlayedTime] = useState<number>(0);
    const [volume, setVolume] = useState<number>(0.8);
    const [muted, setMuted] = useState<boolean>(false);
    const [looping, setLooping] = useState<boolean>(false);
    const [playedPercentage, setPlayedPercentage] = useState<number>(0);
    const [prevFileName, setPrevFileName] = useState<string>(file.name);
    const [videoDimensions, setVideoDimensions] = useState({
        width: 0,
        height: 0,
    });
    const [playerRef, setPlayerRef] = useState<ReactPlayer | null>(null);

    const trackAnim = {
        transform: `translateX(${playedPercentage}%)`,
    };

    const volTrackAnim = {
        transform: `translateX(${volume * 100}%)`,
    };

    const getTime = (time: number) => {
        return (
            Math.floor(time / 60) +
            ':' +
            ('0' + Math.floor(time % 60)).slice(-2)
        );
    };

    const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPlayedTime(Number(e.target.value));
    };

    const handleSeekMouseUp = () => {
        if (playerRef) {
            playerRef.seekTo(playedTime);
        }
    };

    const handlePlay = () => {
        if (!duration) {
            return;
        }

        setPlaying(!playing);
    };

    useEffect(() => {
        if (windowSize.width && windowSize.width < windowSizes.sm) {
            setVolume(1);
        }
    }, [windowSize.width]);

    useEffect(() => {
        if (
            detectFileType(file.name) === 'video' &&
            (!videoDimensions.width || !videoDimensions.height) &&
            windowSize.height
        ) {
            const videoSizeLoader = document.createElement('video');

            videoSizeLoader.src = `${BASE_URL}/${file.hash}`;

            videoSizeLoader.onloadedmetadata = () => {
                const { videoWidth, videoHeight } = videoSizeLoader;

                let nH = 0;

                let nW = 600;
                let w_c_p = ((nW - videoWidth) / videoWidth) * 100;
                let f_w_c_p = Math.floor(w_c_p) / 100;
                let hDiff = videoHeight * f_w_c_p;

                nH = videoHeight + hDiff;

                while (nH > Number(windowSize.height) - 200) {
                    nW -= 50;
                    w_c_p = ((nW - videoWidth) / videoWidth) * 100;
                    f_w_c_p = Math.floor(w_c_p) / 100;
                    hDiff = videoHeight * f_w_c_p;

                    nH = videoHeight + hDiff;
                }

                setVideoDimensions({
                    width: nW,
                    height: nH,
                });
            };
            videoSizeLoader.onerror = () => {
                alert('Error!');
            };
        }
    }, [file, videoDimensions, windowSize.height]);

    useEffect(() => {
        if (file.name !== prevFileName) {
            setPrevFileName(file.name);
            setDuration(null);
            setPlayedTime(0);
            setVideoDimensions({ width: 0, height: 0 });
        }
    }, [file.name]);

    useEffect(() => {
        if (file && duration) {
            const percentage = Math.floor((playedTime / duration) * 100);

            setPlayedPercentage(percentage);

            if (duration === playedTime) {
                setPlaying(false);
            }
        }
    }, [duration, playedTime, file]);

    if (detectFileType(file.name) !== 'video') {
        return null;
    }

    return (
        <div className="flex flex-col items-center justify-center overflow-hidden w-full">
            <div className="mb-4 flex items-center justify-center">
                {videoDimensions.width && videoDimensions.height ? (
                    <ReactPlayer
                        url={`${BASE_URL}/${file.hash}`}
                        playing={playing}
                        volume={volume}
                        muted={muted}
                        loop={looping}
                        onDuration={(dur) => {
                            setDuration(dur);
                        }}
                        onProgress={(progress) => {
                            setPlayedTime(progress.playedSeconds);
                        }}
                        onReady={(player) => {
                            setPlayerRef(player);
                        }}
                        width={videoDimensions.width}
                        height={videoDimensions.height}
                    />
                ) : null}
            </div>

            {duration ? (
                <div className="flex items-center justify-center">
                    <p className="text-white w-10 flex items-center justify-center">
                        {getTime(playedTime)}
                    </p>

                    <div className="w-[260px] sm:w-[300px] flex items-center justify-center">
                        <div className="flex track">
                            <input
                                type="range"
                                name="audio_range"
                                id="audio_range"
                                min={0}
                                max={duration}
                                step="any"
                                value={playedTime}
                                onChange={handleSeekChange}
                                className="playerRange"
                                onMouseUp={handleSeekMouseUp}
                            />

                            <div
                                style={trackAnim}
                                className="animate-track"
                            ></div>
                        </div>
                    </div>

                    <p className="text-white w-10 flex items-center justify-center">
                        {getTime(duration)}
                    </p>
                </div>
            ) : (
                <div className="w-8 h-8 flex items-center justify-center">
                    <Spinner />
                </div>
            )}

            <div className="flex items-center justify-center mt-4">
                <div className="w-24 flex items-center justify-end">
                    <button
                        className="flex items-center justify-center"
                        onClick={() => setLooping(!looping)}
                    >
                        <Image
                            src={
                                looping
                                    ? '/svg/loop-song-active.svg'
                                    : '/svg/loop-song.svg'
                            }
                            width={23}
                            height={23}
                        />
                    </button>
                </div>

                <button
                    className="flex items-center justify-center mx-4"
                    onClick={handlePlay}
                    disabled={!duration}
                >
                    <Image
                        src={playing ? '/svg/pause.svg' : '/svg/play.svg'}
                        width={30}
                        height={30}
                    />
                </button>

                <div className="flex items-center w-24">
                    <button
                        className="flex items-center justify-center mr-1"
                        onClick={() => setMuted(!muted)}
                    >
                        <Image
                            src={
                                !muted
                                    ? '/svg/speaker-wave.svg'
                                    : '/svg/speaker-x-mark.svg'
                            }
                            width={18}
                            height={18}
                        />
                    </button>

                    <div className="flex-1 hidden sm:flex">
                        <div className="flex vol_track">
                            <input
                                type="range"
                                name="audio_range"
                                id="audio_range"
                                min={0}
                                max={1}
                                step="any"
                                value={volume}
                                onChange={(e) =>
                                    setVolume(Number(e.target.value))
                                }
                                className="w-full"
                            />

                            <div
                                style={volTrackAnim}
                                className="animate-track"
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoPlayer;
