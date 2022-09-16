import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';
import { windowSizes } from '../../constants/windowSizes';
import useWindowSize from '../../hooks/useWindowSize';
import { FileInterface } from '../../interfaces/file';
import {
    AppInfo,
    selectApp,
    setAudioVolume,
} from '../../redux/slices/appSlice';
import { BASE_URL } from '../../requests/routes';
import { detectFileType } from '../../utils/detectFileType';
import { generateRandomBetween } from '../../utils/generateRandomIntBetween';
import Spinner from '../notifications/Loading';

const AudioPlayer: React.FC<{ file: FileInterface }> = ({ file }) => {
    const dispatch = useDispatch();
    const windowSize = useWindowSize();

    const appInfo: AppInfo = useSelector(selectApp);

    const [playing, setPlaying] = useState(false);
    const [randImage, setRandImage] = useState<string>('');
    const [duration, setDuration] = useState<number | null>(null);
    const [playedTime, setPlayedTime] = useState<number>(0);
    const [muted, setMuted] = useState<boolean>(false);
    const [looping, setLooping] = useState<boolean>(false);
    const [playedPercentage, setPlayedPercentage] = useState<number>(0);
    const [prevFileName, setPrevFileName] = useState<string>(file.name);
    const [playerRef, setPlayerRef] = useState<ReactPlayer | null>(null);

    const trackAnim = {
        transform: `translateX(${playedPercentage}%)`,
    };

    const volTrackAnim = {
        transform: `translateX(${appInfo.audioVolume * 100}%)`,
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

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setAudioVolume(e.target.value));
    };

    useEffect(() => {
        if (windowSize.width && windowSize.width < windowSizes.sm) {
            dispatch(setAudioVolume(1));
        } else {
            const savedVolume = localStorage.getItem('audioVolume');

            if (savedVolume) {
                dispatch(setAudioVolume(savedVolume));
            }
        }
    }, [windowSize.width]);

    useEffect(() => {
        if (file.name !== prevFileName && appInfo.files) {
            setPlaying(false);
            setPrevFileName(file.name);
            setDuration(null);
            setPlayedTime(0);

            getRandImage();
        }
    }, [file.name, appInfo.files]);

    useEffect(() => {
        if (file && duration) {
            const percentage = Math.floor((playedTime / duration) * 100);

            setPlayedPercentage(percentage);

            if (duration === playedTime) {
                setPlaying(false);
            }
        }
    }, [duration, playedTime, file]);

    const getRandImage = () => {
        if (appInfo.files) {
            const imageFiles = appInfo.files.filter(
                (file) => detectFileType(file.name) === 'image'
            );

            const imgIndex = generateRandomBetween(0, imageFiles.length - 1);

            const imgFile = imageFiles[imgIndex];

            setRandImage(`${BASE_URL}/${imgFile.hash}`);
        }
    };

    useEffect(() => {
        if (appInfo.files) {
            getRandImage();
        }
    }, [appInfo.files]);

    if (detectFileType(file.name) !== 'audio' || !randImage) {
        return null;
    }

    return (
        <div className="flex flex-col items-center justify-center overflow-hidden">
            <div
                className={`flex relative w-[260px] sm:w-[300px] h-[260px] sm:h-[300px] mb-4 ${
                    playing ? 'animate-spin-slow' : ''
                }`}
            >
                <Image
                    src="/icons/music-plate.png"
                    draggable={false}
                    layout="fill"
                    objectFit="cover"
                    priority
                />

                <div className="absolute w-full h-full flex items-center justify-center">
                    <div className="absolute w-[100px] sm:w-[125px] h-[100px] sm:h-[125px] bg-slate-600 rounded-full"></div>

                    <div className="relative w-[100px] sm:w-[125px] h-[100px] sm:h-[125px] rounded-full overflow-hidden">
                        <Image
                            src={randImage}
                            draggable={false}
                            objectFit="cover"
                            className="rounded-full"
                            placeholder="blur"
                            blurDataURL={randImage}
                            layout="fill"
                        />
                    </div>

                    <div className="flex flex-col items-center justify-center absolute w-28 h-28 rounded-full overflow-hidden">
                        <small className="text-white italic text-xs font-bold">
                            {file.name}
                        </small>

                        <small className="text-white italic text-xs mt-4">
                            Kidala records
                        </small>
                    </div>

                    <div className="absolute w-28 h-28 rounded-full"></div>

                    <div className="w-2 h-2 rounded-full absolute bg-sky-800"></div>
                </div>
            </div>
            <p className="text-white text-center">
                {file.name}
            </p>
            {duration && playerRef ? (
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

            <div className="flex items-center justify-center my-4">
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
                                value={appInfo.audioVolume}
                                onChange={handleVolumeChange}
                                onMouseUp={() => {
                                    localStorage.setItem(
                                        'audioVolume',
                                        String(appInfo.audioVolume)
                                    );
                                }}
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

            <div className="hidden">
                <ReactPlayer
                    url={`${BASE_URL}/${file.hash}`}
                    playing={playing}
                    volume={appInfo.audioVolume}
                    muted={muted}
                    loop={looping}
                    onDuration={(dur) => {
                        setDuration(dur);
                    }}
                    onProgress={(progress) => {
                        setPlayedTime(progress.playedSeconds);
                    }}
                    onReady={(player) => setPlayerRef(player)}
                />
            </div>
        </div>
    );
};

export default AudioPlayer;
