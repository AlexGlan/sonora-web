import ParticleComponent from "./ParticleComponent";

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero__particle-container" aria-hidden="true">
                <ParticleComponent />
            </div>
            <div className="hero__content">
                <h1 className="hero__header">
                    White Noise & Ambient Sound Tool
                </h1>
                <p className="hero__subhead">
                    Explore calming soundscapes to unwind, focus, or sleep peacefully.
                </p>
            </div>
        </section>
    )
}

export default Hero;