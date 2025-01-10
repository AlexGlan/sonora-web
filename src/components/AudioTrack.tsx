import { useRef } from "react";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setVolume, setPlayStatus } from "../store/audioSlice";

type AudioTrackProps = {
    trackId: number,
}

const AudioTrack = ({ trackId }: AudioTrackProps) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const track = useAppSelector(state => state.audio.tracks.byId[trackId]);
    const dispatch = useAppDispatch();

    // Reset playback after changing routes
    if (track.isPlaying && audioRef.current == null) {
        dispatch(setPlayStatus({
            trackId: track.id,
            isPlaying: false
        }));
    }

    if (audioRef.current) {
        audioRef.current.volume = track.volume * 0.01;
    }

    const handlePlayback = () => {
        if (audioRef.current) {
            if (track.isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
        }
        dispatch(setPlayStatus({
            trackId: track.id,
            isPlaying: !track.isPlaying
        }));
    }

    const handleVolumeChange = (val: string) => {
        dispatch(setVolume({
            trackId: track.id,
            volume: parseInt(val)
        }));
    }

    return (
        <div className="track">
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
                />
            </div>
            <audio
                ref={audioRef}
                src={new URL(`../assets/audio/${track.fileName}`, import.meta.url).href}
                loop
            ></audio>
        </div>
    )
}

export default AudioTrack;
