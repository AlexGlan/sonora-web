import { toast, ToastContainer, ToastOptions } from "react-toastify";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { fetchAudioTracks } from "../store/audioSlice.js";
import AudioTrack from "./AudioTrack";
import Spinner from "./Spinner.js";

const AudioCollection = () => {
    const tracks = useAppSelector(state => state.audio.tracks.allIds);
    const status = useAppSelector(state => state.audio.status);
    const error = useAppSelector(state => state.audio.error);
    const dispatch = useAppDispatch();
    const toastOpts: ToastOptions = {
        autoClose: 2000,
        position: 'bottom-center',
        pauseOnHover: false,
        pauseOnFocusLoss: false,
    }

    const handleClick = (): void => {
        dispatch(fetchAudioTracks());
    }

    // Show toast notification after data fetching request
    if (status === 'succeeded') {
        toast.success(
            'Successfully loaded data!',
            {
                ...toastOpts,
                ariaLabel: 'Successfully loaded data'
            }
        );
    } else if (status === 'failed') {
        toast.error(
            'Failed to load data.',
            {
                ...toastOpts,
                ariaLabel: 'Failed to load data'
            }
        );
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
           <ToastContainer limit={3} />
        </section>
    )
}

export default AudioCollection;
