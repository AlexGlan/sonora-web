import { useAppSelector } from "../app/hooks";

const YoutubeVideoPlayer = () => {
    const videoId: string | null = useAppSelector(state => state.video.videoId);

    return (
        <div className="youtube-video-container">
            {videoId && <iframe
                src={'https://www.youtube-nocookie.com/embed/' + videoId}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
            ></iframe>
            }
        </div>
    )
}

export default YoutubeVideoPlayer;
