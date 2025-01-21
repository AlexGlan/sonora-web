import { loadStarsPreset } from "@tsparticles/preset-stars";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useState } from "react";

const ParticleComponent = () => {
    const [init, setInit] = useState<boolean>(false);   
    
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadStarsPreset(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    return (
        <>
        {
            init && <Particles 
            id="tsparticles"
            options={{
                fullScreen: {
                    enable: false,
                },
                background: {
                    color: {
                        value: "#313244",
                    },
                },
                style: {
                    width: '100%',
                },
                fpsLimit: 24,
                particles: {
                    color: {
                        value: "#a6e3a1",
                    },
                    links: {
                        color: "#a6e3a1",
                        distance: 150,
                        enable: true,
                        opacity: 0.5,
                        width: 1,
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: {
                            default: "bounce",
                        },
                        random: false,
                        speed: 0.3,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            // @ts-ignore
                            area: 800,
                        },
                        value: 200,
                    },
                    opacity: {
                        value: 0.5,
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: 1, max: 2 },
                    },
                },
                detectRetina: true,
            }}
            />
        }
        </>
    )
}

export default ParticleComponent;
