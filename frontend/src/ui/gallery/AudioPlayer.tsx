import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux';
import { FileInterface } from '../../interfaces/file';
import {
    AppInfo,
    selectApp,
    setAudioVolume,
} from '../../redux/slices/appSlice';
import { detectFileType } from '../../utils/detectFileType';
import { getRandImage } from '../../utils/getRandomImage';
import MusicPlate from './MusicPlate';
import { generateFileUrl } from './../../utils/generateFileUrl';
import FileControls from '../FileControls';
import PlayerControls from '../PlayerControls';
import FileInfoControls from '../FileInfoControls';

export interface AudioPlayerProps {
    file: FileInterface;
    insert?: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ file, insert = false }) => {
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
    const [loaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
        if (file.name !== prevFileName && appInfo.files) {
            setPlaying(false);
            setPrevFileName(file.name);
            setDuration(null);
            setPlayedTime(0);
            setRandImage(getRandImage(appInfo.files));
            setPlayerRef(null);
            setLoaded(false);
        }
    }, [file.name, appInfo.files]);

    useEffect(() => {
        if (!randImage) {
            setRandImage(getRandImage(appInfo.files));
        }
    }, []);

    useEffect(() => {
        if (!loaded) {
            setTimeout(() => {
                setLoaded(true);
            }, 1000);
        }
    }, [loaded]);

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

            {loaded ? (
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
                        onReady={(player) => {
                            setPlayerRef(player);
                            setLoaded(true);
                        }}
                        stopOnUnmount
                    />
                </div>
            ) : null}

            <FileInfoControls file={file} />
        </div>
    );
};

export default AudioPlayer;
