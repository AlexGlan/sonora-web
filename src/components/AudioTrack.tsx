import { useRef } from "react";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setVolume, setPlayStatus } from "../store/audioSlice";
import { getImageUrl } from "../utils/imageUtils";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";

type AudioTrackProps = {
    trackId: string,
}

const AudioTrack = ({ trackId }: AudioTrackProps) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const track = useAppSelector(state => state.audio.tracks.byId[trackId]);
    const dispatch = useAppDispatch();
    const isIconAvailable = !/.*\/undefined$/i.test(getImageUrl(track.iconName + '-solid-icon.svg'));

    // Reset playback after changing routes
    if (track.isPlaying && audioRef.current == null) {
        dispatch(setPlayStatus({
            trackId: track.id,
            isPlaying: false
        }));
    }

    if (audioRef.current) {
        audioRef.current.volume = track.volume * 0.01;
        if (track.isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }

    const handlePlayback = (): void => {
        dispatch(setPlayStatus({
            trackId: track.id,
            isPlaying: !track.isPlaying
        }));
    }

    const handleVolumeChange = (val: string): void => {
        dispatch(setVolume({
            trackId: track.id,
            volume: parseInt(val)
        }));
    }

    return (
        <div className="track">
            <img
                src={isIconAvailable ? getImageUrl(track.iconName + '-solid-icon.svg') : getImageUrl('default-solid-icon.svg')}
                alt={isIconAvailable ? `${track.name} icon` : 'Music icon'}
                className="track__icon"
                style={{
                    filter: `invert(0.65) sepia(1) saturate(1.8) hue-rotate(${track.isPlaying ? '120':'200'}deg)`
                }}
            />
            <span className="track__name">{track.name}</span>
            <div className="track__controls">
                <button
                    onClick={handlePlayback}
                    className="track__playback-btn"
                    aria-label={track.isPlaying ? 'Pause' : 'Play'}
                >
                    <FontAwesomeIcon
                        icon={track.isPlaying ? faPause : faPlay}
                        className={track.isPlaying ? 'track__pause-icon' : 'track__play-icon'}
                    />
                </button>
                <input
                    type="range"
                    min={0}
                    max={100}
                    step={1}
                    value={track.volume}
                    onChange={(e) => handleVolumeChange(e.target.value)}
                    className="track__volume-slider"
                    aria-label="Volume slider"
                    style={{
                        background: `linear-gradient(to right, #cba6f7 ${track.volume}%, #45475a ${track.volume}%)`
                    }}
                />
            </div>
            <audio
                ref={audioRef}
                src={track.audioSrc}
                role="audio"
                loop
            ></audio>
        </div>
    )
}

export default AudioTrack;
