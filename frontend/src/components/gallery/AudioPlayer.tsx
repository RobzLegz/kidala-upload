import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux';
import { FileInterface } from '../../interfaces/file';
import { AppInfo, selectApp } from '../../redux/slices/appSlice';
import { BASE_URL } from '../../requests/routes';
import { detectFileType } from '../../utils/detectFileType';
import { generateRandomBetween } from '../../utils/generateRandomIntBetween';

const AudioPlayer: React.FC<{ file: FileInterface }> = ({ file }) => {
    const appInfo: AppInfo = useSelector(selectApp);

    const [playing, setPlaying] = useState(false);
    const [randImage, setRandImage] = useState<string>('');
    const [duration, setDuration] = useState<number | null>(null);
    const [playedTime, setPlayedTime] = useState<number>(0);
    const [volume, setVolume] = useState<number>(0.8);
    const [muted, setMuted] = useState<boolean>(false);
    const [looping, setLooping] = useState<boolean>(false);
    const [playedPercentage, setPlayedPercentage] = useState<number>(0);

    const playerRef = useRef<any>(null);

    const trackAnim = {
        transform: `translateX(${playedPercentage}%)`,
    };

    const volTrackAnim = {
        transform: `translateX(${volume * 100}%)`,
    };

    const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPlayedTime(Number(e.target.value));
    };

    const handleSeekMouseUp = () => {
        if (playerRef.current) {
            playerRef.current.seekTo(playedTime);
        }
    };

    useEffect(() => {
        if (!duration) {
            const au = document.createElement('audio');

            au.src = `${BASE_URL}/${file.hash}`;

            au.addEventListener(
                'loadedmetadata',
                () => {
                    setDuration(au.duration);
                },
                false
            );
        }
    }, [file]);

    useEffect(() => {
        if (duration) {
            const percentage = Math.floor((playedTime / duration) * 100);

            setPlayedPercentage(percentage);

            if (duration === playedTime) {
                setPlaying(false);
            }
        }
    }, [duration, playedTime]);

    useEffect(() => {
        if (appInfo.files) {
            const imageFiles = appInfo.files.filter(
                (file) => detectFileType(file.name) === 'image'
            );

            const imgIndex = generateRandomBetween(0, imageFiles.length - 1);

            const imgFile = imageFiles[imgIndex];

            setRandImage(`${BASE_URL}/${imgFile.hash}`);
        }
    }, [appInfo.files]);

    if (detectFileType(file.name) !== 'audio' || !randImage) {
        return null;
    }

    return (
        <div className="flex flex-col items-center justify-center overflow-hidden">
            <div
                className={`flex relative w-[280px] sm:w-[300px] h-[280px] sm:h-[300px] ${
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

            {duration ? (
                <div className="w-[270px] sm:w-[300px]">
                    <div className="flex track my-4">
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

                        <div style={trackAnim} className="animate-track"></div>
                    </div>
                </div>
            ) : null}

            <div className="flex items-center justify-center">
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
                    onClick={() => setPlaying(!playing)}
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

                    <div className="flex-1">
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

            <div className="hidden">
                <ReactPlayer
                    ref={playerRef}
                    url={`${BASE_URL}/${file.hash}`}
                    playing={playing}
                    volume={volume}
                    muted={muted}
                    loop={looping}
                    onProgress={(progress) => {
                        setPlayedTime(progress.playedSeconds);
                    }}
                />
            </div>
        </div>
    );
};

export default AudioPlayer;
