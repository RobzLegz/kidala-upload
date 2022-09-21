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
import { detectFileType } from '../../utils/detectFileType';
import { getRandImage } from '../../utils/getRandomImage';
import Spinner from '../Spinner';
import MusicPlate from './MusicPlate';
import { generateFileUrl } from './../../utils/generateFileUrl';
import {
    ArrowPathRoundedSquareIcon,
    PauseIcon,
    PlayIcon,
    SpeakerWaveIcon,
    SpeakerXMarkIcon,
} from '@heroicons/react/20/solid';
import FileControls from '../FileControls';

export interface AudioPlayerProps {
    file: FileInterface;
    insert?: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ file, insert = false }) => {
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
            setRandImage(getRandImage(appInfo.files));
        }
    }, [file.name, appInfo.files]);

    useEffect(() => {
        if (!randImage) {
            setRandImage(getRandImage(appInfo.files));
        }
    }, []);

    useEffect(() => {
        if (file && duration) {
            const percentage = Math.floor((playedTime / duration) * 100);

            setPlayedPercentage(percentage);

            if (duration === playedTime) {
                setPlaying(false);
            }
        }
    }, [duration, playedTime, file]);

    if (detectFileType(file.name) !== 'audio' || !randImage) {
        return null;
    }

    return (
        <div
            className={`flex flex-col items-center justify-center overflow-hidden bg-primary-800 rounded-lg border border-primary-700 p-2 ${
                insert ? '' : ''
            }`}
        >
            <div className={`${playing ? 'animate-spin-slow' : ''}`}>
                <MusicPlate image={randImage} />
            </div>

            <p className="text-white my-2">{file.name}</p>

            <div className="flex flex-col bg-primary-900 p-2 rounded-lg border border-primary-700">
                {duration && playerRef ? (
                    <div className="flex items-center justify-center">
                        <p className="text-white w-10 flex items-center justify-center">
                            {getTime(playedTime)}
                        </p>

                        <div className="w-[260px] flex items-center justify-center mx-2">
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

                <div className="flex items-center justify-between w-full h-12">
                    <div className="w-20 flex items-end justify-start h-full">
                        <button
                            className="flex items-center justify-center"
                            onClick={() => setLooping(!looping)}
                        >
                            <ArrowPathRoundedSquareIcon
                                className={`h-6 ${
                                    looping ? 'text-accent' : 'text-white'
                                }`}
                            />
                        </button>
                    </div>

                    <button
                        className="flex items-start justify-center mx-4 h-10"
                        onClick={handlePlay}
                        disabled={!duration}
                    >
                        {playing ? (
                            <PauseIcon className="text-white h-8" />
                        ) : (
                            <PlayIcon className="text-white h-8" />
                        )}
                    </button>

                    <div className="flex items-end w-20 h-full">
                        <div className="flex items-center">
                            <button
                                className="flex items-center justify-center mr-1"
                                onClick={() => setMuted(!muted)}
                            >
                                {!muted ? (
                                    <SpeakerWaveIcon className="text-white h-6" />
                                ) : (
                                    <SpeakerXMarkIcon className="text-white h-6" />
                                )}
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
                </div>
            </div>

            {insert && <FileControls file={file} />}

            <div className="hidden">
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
                    onReady={(player) => setPlayerRef(player)}
                />
            </div>
        </div>
    );
};

export default AudioPlayer;
