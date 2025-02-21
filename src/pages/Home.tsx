import AudioCollection from "../components/AudioCollection";
import Footer from "../components/Footer";
import GlobalAudioControls from "../components/GlobalAudioControls";
import Hero from "../components/Hero";
import NavBar from "../components/NavBar";
import YoutubeSection from "../components/YoutubeSection";

const Home = () => {
    return(
        <>
            <NavBar />
            <main>
                <Hero />
                <GlobalAudioControls />
                <AudioCollection />
                <YoutubeSection />
            </main>
            <Footer />
        </>
    )
}

export default Home;
