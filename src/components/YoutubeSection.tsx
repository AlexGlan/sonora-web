import { useAppDispatch, useAppSelector } from "../app/hooks";
import { resetSearchQuery, setSearchQuery, setVideoSrc } from "../store/videoSlice";
import SearchForm from "./SearchForm";
import YoutubeVideoPlayer from "./YoutubeVideoPlayer"

const YoutubeSection = () => {
    const searchQuery: string = useAppSelector(state => state.video.searchQuery);
    const error: string | null = useAppSelector(state => state.video.error);
    const dispatch = useAppDispatch();

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        dispatch(setVideoSrc(searchQuery));
    }

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        dispatch(setSearchQuery(e.target.value));
    }

    const handleInputClear = (): void => {
        dispatch(resetSearchQuery());
    }

    return (
        <section className="youtube">
            <span className="youtube__heading">Play Your YouTube Video Here</span>
            <p className="youtube__subhead">
                Paste a YouTube link to enjoy a video alongside the background sounds.
                Perfect for enhancing your experience and listening to music or anything
                else without switching tabs.
            </p>
            <SearchForm
                label="Enter YouTube video link:"
                name="youtube-video"
                value={searchQuery}
                placeholder="Paste youtube link here..."
                error={error}
                handleSubmit={handleFormSubmit}
                handleChange={handleFormChange}
                handleClear={handleInputClear}
            />
            <YoutubeVideoPlayer />
        </section>
    )
}

export default YoutubeSection;
