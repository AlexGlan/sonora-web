import { getImageUrl } from "../utils/imageUtils";

const Hero = () => {
    return (
        <section className="hero" style={{backgroundImage: `url(${getImageUrl('hero.jpg')})`}}>
            <h1 className="hero__header">
                White Noise & Ambient Sound Tool
            </h1>
            <p className="hero__subhead">
                Explore calming soundscapes to unwind, focus, or sleep peacefully.
            </p>
        </section>
    )
}

export default Hero;