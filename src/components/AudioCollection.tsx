import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchAudioTracks } from "../store/audioSlice.js";
import AudioTrack from "./AudioTrack";
import Spinner from "./Spinner.js";

const AudioCollection = () => {
    const tracks = useAppSelector(state => state.audio.tracks.allIds);
    const status = useAppSelector(state => state.audio.status);
    const error = useAppSelector(state => state.audio.error);
    const dispatch = useAppDispatch();

    const handleClick = (): void => {
        dispatch(fetchAudioTracks());
    }

    return (
        <section className="audio">
            <ul className="audio__list" role="list" aria-label="Audio Tracks">
                {
                    tracks.map(trackId => {
                        return (
                            <li className="audio__item" key={trackId}>
                                <AudioTrack trackId={trackId} />
                            </li>
                        )
                    })
                }
            </ul>
            <div className="audio__load">
                {status === 'pending'
                    ? <Spinner />
                    : <button onClick={handleClick} className="audio__load-btn">Load more audio</button>
                }
                {error && <strong className="error-message">{error}</strong>}
                <span className="audio__load-disclaimer">
                    *This is a hobby project on free infrastructure, so expect cold starts and some waiting time <span>🐢</span>
                </span>
            </div>
           
        </section>
    )
}

export default AudioCollection;
