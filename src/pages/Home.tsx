import AudioCollection from "../components/AudioCollection";
import GlobalAudioControls from "../components/GlobalAudioControls";
import Hero from "../components/Hero";
import YoutubeSection from "../components/YoutubeSection";

const Home = () => {
    return(
        <main>
            <Hero />
            <GlobalAudioControls />
            <AudioCollection />
            <YoutubeSection />
        </main>
    )
}

export default Home;
