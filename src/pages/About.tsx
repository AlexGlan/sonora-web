import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AudioTrack } from "../types/types";
import { useAppSelector } from "../hooks/hooks";

const About = () => {
    const audioData: Record<string, AudioTrack> = useAppSelector(state => state.audio.tracks.byId);
    
    return (
        <main className="about">
            <div className="about__description">
                <p className="about__text">
                    This project provides an easy way to create and enjoy a peaceful environment with background noise and ambient
                    sounds, all from a single browser tab. It's designed to help you focus, relax, sleep better, or enhance music,
                    allowing you to mix and adjust sounds to fit your mood and needs.
                </p>
                <p className="about__text">
                    I created this project because I enjoy working with white/brown noise and calm ambient sounds in the background
                    more than music. It helps me to stay focused and productive, and I’ve found it to be an important part of my workflow.
                    So my goal was to make this experience as simple, customizable, and accessible as possible—for myself and for anyone
                    else who might find it interesting or helpful 🍀
                </p>
            </div>
            <div className="about__links">
                <p className="about__github">
                    Source code: <a href="https://github.com/AlexGlan/sonora-web" target="_blank">Github <FontAwesomeIcon icon={faGithub} /></a>
                </p>
                <p className="about__credits-text">
                    ✨ Special thanks to the following people for generously sharing their recordings for free:
                </p>
                <ul className="about__credits-list" aria-label="Audio Credits">
                    {
                        Object.values(audioData).map(track => {
                            return (
                                <li key={`attr_${track.id}`}>
                                    <a href={track.originalAudioLink} target="_blank">
                                        {track.originalName} by {track.authorName}
                                    </a>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        </main>
    )
}

export default About;
