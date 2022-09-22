import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';
import { windowSizes } from '../../constants/windowSizes';
import useWindowSize from '../../hooks/useWindowSize';
import {
    AppInfo,
    selectApp,
    setAudioVolume,
} from '../../redux/slices/appSlice';
import { BASE_URL } from '../../requests/routes';
import { detectFileType } from '../../utils/detectFileType';
import { generateFileUrl } from '../../utils/generateFileUrl';
import FileControls from '../FileControls';
import FileInfoControls from '../FileInfoControls';
import PlayerControls from '../PlayerControls';
import { AudioPlayerProps } from './AudioPlayer';

const VideoPlayer: React.FC<AudioPlayerProps> = ({ file, insert }) => {
    const windowSize = useWindowSize();
    const dispatch = useDispatch();

    const appInfo: AppInfo = useSelector(selectApp);

    const [playing, setPlaying] = useState(false);
    const [duration, setDuration] = useState<number | null>(null);
    const [playedTime, setPlayedTime] = useState<number>(0);
    const [muted, setMuted] = useState<boolean>(false);
    const [looping, setLooping] = useState<boolean>(false);
    const [playedPercentage, setPlayedPercentage] = useState<number>(0);
    const [prevFileName, setPrevFileName] = useState<string>(file.name);
    const [videoDimensions, setVideoDimensions] = useState({
        width: 0,
        height: 0,
    });
    const [playerRef, setPlayerRef] = useState<ReactPlayer | null>(null);
    const [loaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
        if (
            detectFileType(file.name) === 'video' &&
            (!videoDimensions.width || !videoDimensions.height) &&
            windowSize.height &&
            windowSize.width
        ) {
            const videoSizeLoader = document.createElement('video');

            videoSizeLoader.src = generateFileUrl(file.hash, file.name);

            videoSizeLoader.onloadedmetadata = () => {
                const { videoWidth, videoHeight } = videoSizeLoader;

                let nH = 0;

                let nW = 600;

                if (Number(windowSize.width) < windowSizes.sm) {
                    nW = Number(windowSize.width) - 20;
                }

                let w_c_p = ((nW - videoWidth) / videoWidth) * 100;
                let f_w_c_p = Math.floor(w_c_p) / 100;
                let hDiff = videoHeight * f_w_c_p;

                nH = videoHeight + hDiff;

                while (nH > Number(windowSize.height) - 300) {
                    if (Number(windowSize.width) < windowSizes.sm) {
                        nW -= 20;
                    } else {
                        nW -= 50;
                    }

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
        if (file.name !== prevFileName && appInfo.files) {
            setPlaying(false);
            setPrevFileName(file.name);
            setDuration(null);
            setPlayedTime(0);
            setPlayerRef(null);
            setLoaded(false);
            setVideoDimensions({
                width: 0,
                height: 0,
            });
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

    useEffect(() => {
        if (!loaded) {
            setTimeout(() => {
                setLoaded(true);
            }, 1000);
        }
    }, [loaded]);

    if (detectFileType(file.name) !== 'video') {
        return null;
    }

    return (
        <div
            className={`flex flex-col items-center justify-center overflow-hidden bg-primary-800 rounded-lg border border-primary-700 p-2 ${
                insert ? '' : ''
            }`}
        >
            <div className="flex items-center justify-center rounded-lg">
                {videoDimensions.width && videoDimensions.height && loaded ? (
                    <ReactPlayer
                        url={generateFileUrl(file.hash, file.name)}
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
                        onReady={(player) => {
                            setPlayerRef(player);
                            setLoaded(true);
                        }}
                        width={videoDimensions.width}
                        height={videoDimensions.height}
                    />
                ) : null}
            </div>

            <PlayerControls
                file={file}
                setPlaying={setPlaying}
                playing={playing}
                setPlayedTime={setPlayedTime}
                playerRef={playerRef}
                playedTime={playedTime}
                duration={duration}
                setAudioVolume={setAudioVolume}
                setPlayedPercentage={setPlayedPercentage}
                playedPercentage={playedPercentage}
                setLooping={setLooping}
                setMuted={setMuted}
                muted={muted}
                looping={looping}
            />

            {insert && <FileControls file={file} />}

            <FileInfoControls file={file} />
        </div>
    );
};

export default VideoPlayer;
