import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { resetTracks, setGlobalPlayStatus, setGlobalVolume } from "../store/audioSlice";
import { faArrowRotateRight, faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GlobalAudioControls = () => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [volume, setVolume] = useState<number>(30);
    const dispatch = useAppDispatch();

    const handleReset = (): void => {
        dispatch(resetTracks());
        setIsPlaying(false);
        setVolume(30);
    }

    const handleGlobalPlayback = (): void => {
        dispatch(setGlobalPlayStatus(!isPlaying));
        setIsPlaying(prevVal => {
            return !prevVal;
        });
    }
    const handleGlobalVolumeChange = (volumeVal: string): void => {
        dispatch(setGlobalVolume(volumeVal));
        setVolume(parseInt(volumeVal));
    }

    return (
        <div className="global-controls">
            <div className="global-controls__button-container">
                <button
                    onClick={handleReset}
                    className="global-controls__btn"
                    aria-label="Reset tracks"
                    title="Reset"
                >
                    <FontAwesomeIcon icon={faArrowRotateRight} className="global-controls__icon" />
                </button>
                <button
                    onClick={handleGlobalPlayback}
                    className="global-controls__btn"
                    aria-label={isPlaying ? 'Pause all tracks' : 'Play all tracks'}
                    title={isPlaying? 'Pause All' : 'Play All'}
                    >
                    <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} className="global-controls__icon" />
                </button>
            </div>
            <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={volume}
                onChange={(e) => handleGlobalVolumeChange(e.target.value)}
                className="global-controls__slider"
                aria-label="Master volume slider"
                style={{
                    background: `linear-gradient(to right, #cba6f7 ${volume}%, #45475a ${volume}%)`
                }}
            />
        </div>
    )
}

export default GlobalAudioControls;
