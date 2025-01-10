import { useAppSelector } from "../app/hooks";
import AudioTrack from "./AudioTrack";

const AudioCollection = () => {
    const tracks = useAppSelector(state => state.audio.tracks.allIds);

    return (
        <section className="audio">
            <ul className="audio__list" role="list">
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
        </section>
    )
}

export default AudioCollection;
