import {
    ArrowPathRoundedSquareIcon,
    PauseIcon,
    PlayIcon,
    SpeakerWaveIcon,
    SpeakerXMarkIcon,
} from '@heroicons/react/20/solid';
import React, { useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';
import { windowSizes } from '../constants/windowSizes';
import { useKeyPress } from '../hooks/useKeyPress';
import useWindowSize from '../hooks/useWindowSize';
import { FileInterface } from '../interfaces/file';
import { AppInfo } from '../redux/slices/appSlice';
import { selectApp } from './../redux/slices/appSlice';
import Spinner from './Spinner';

export interface PlayerControlsProps {
    playing: boolean;
    looping: boolean;
    muted: boolean;
    playedTime: number;
    playedPercentage: number;
    duration: number | null;
    file: FileInterface;
    playerRef: ReactPlayer | null;
    setLooping: React.Dispatch<React.SetStateAction<boolean>>;
    setMuted: React.Dispatch<React.SetStateAction<boolean>>;
    setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
    setPlayedTime: React.Dispatch<React.SetStateAction<number>>;
    setAudioVolume: React.Dispatch<React.SetStateAction<string>>;
    setPlayedPercentage: React.Dispatch<React.SetStateAction<number>>;
}

const PlayerControls: React.FC<PlayerControlsProps> = ({
    file,
    setPlaying,
    playing,
    setPlayedTime,
    playerRef,
    playedTime,
    duration,
    setAudioVolume,
    setPlayedPercentage,
    playedPercentage,
    setLooping,
    setMuted,
    muted,
    looping,
}) => {
    const dispatch = useDispatch();
    const windowSize = useWindowSize();
    const spacePressed = useKeyPress(' ');

    const appInfo: AppInfo = useSelector(selectApp);

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
        if (spacePressed) {
            setPlaying(!playing);
        }
    }, [spacePressed]);

    useEffect(() => {
        if (windowSize.width && windowSize.width < windowSizes.sm) {
            dispatch(setAudioVolume('1'));
        } else {
            const savedVolume = localStorage.getItem('audioVolume');

            if (savedVolume) {
                dispatch(setAudioVolume(savedVolume));
            }
        }
    }, [windowSize.width]);

    useEffect(() => {
        if (file && duration) {
            const percentage = Math.floor((playedTime / duration) * 100);

            setPlayedPercentage(percentage);

            if (duration === playedTime) {
                setPlaying(false);
            }
        }
    }, [duration, playedTime, file]);

    return (
        <div className="flex flex-col p-2 mt-2">
            {duration && playerRef ? (
                <div className="flex items-center justify-center h-6">
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
                <div className="w-[356px] flex items-center justify-center h-6">
                    <Spinner size="4" />
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
                                    step={0.1}
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
    );
};

export default PlayerControls;
