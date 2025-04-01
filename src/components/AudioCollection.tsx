import { toast, ToastContainer, ToastOptions } from "react-toastify";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { fetchAudioTracks } from "../store/audioSlice.js";
import AudioTrack from "./AudioTrack";
import Spinner from "./Spinner.js";
import store from "../store/store.js";

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

    const loadAudioData = async () => {
        const result = await dispatch(fetchAudioTracks());
        // Show toast notification after data fetching request
        if (result.meta.requestStatus === 'fulfilled') {
            toast.success(
                'Successfully loaded data!',
                {
                    ...toastOpts,
                    ariaLabel: 'Successfully loaded data'
                }
            );
        } else if (result.meta.requestStatus === 'rejected') {
            toast.error(
                'Failed to load data.',
                {
                    ...toastOpts,
                    ariaLabel: 'Failed to load data'
                }
            );
        }
    }

    const saveAudioTracks = () => {
        try {
            // Persist the current audio track state in localStorage across sessions
            const trackState = store.getState().audio.tracks;
            localStorage.setItem("audioTrackState", JSON.stringify(trackState));

            toast.success(
                'Your preferences have been saved!',
                {
                    ...toastOpts,
                    ariaLabel: 'Your preferences have been saved'
                }
            );
        } catch (err) {
            console.error('Error occured while saving data to localStorage:', err);            
            toast.error(
                'Failed to save your preferences.',
                {
                    ...toastOpts,
                    ariaLabel: 'Failed to save your preferences'
                }
            );
        }
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
                    : <button onClick={loadAudioData} className="btn-pill">Load More Audio</button>
                }
                {error && <strong className="error-message">{error}</strong>}
                <span className="audio__load-disclaimer">
                    *This is a hobby project on free infrastructure, so expect cold starts and some waiting time <span>🐢</span>
                </span>
                <button
                    className="btn-pill"
                    onClick={saveAudioTracks}
                    title="Save your current audio settings for later"
                >
                    Save My Selection
                </button>
            </div>
           <ToastContainer limit={3} />
        </section>
    )
}

export default AudioCollection;
