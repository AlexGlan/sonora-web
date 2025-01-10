import AudioCollection from "../components/AudioCollection";
import Hero from "../components/Hero";
import NavBar from "../components/NavBar";

const Home = () => {
    return(
        <>
            <NavBar />
            <main>
                <Hero />
                <AudioCollection />
            </main>
        </>
    )
}

export default Home;
