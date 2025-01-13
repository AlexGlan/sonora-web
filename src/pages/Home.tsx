import AudioCollection from "../components/AudioCollection";
import GlobalAudioControls from "../components/GlobalAudioControls";
import Hero from "../components/Hero";
import NavBar from "../components/NavBar";

const Home = () => {
    return(
        <>
            <NavBar />
            <main>
                <Hero />
                <GlobalAudioControls />
                <AudioCollection />
            </main>
        </>
    )
}

export default Home;
