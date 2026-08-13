/* =========================================================
   OMOR FARUK AL RASHID
   PORTFOLIO
   THREE.JS CINEMATIC BACKGROUND
========================================================= */

"use strict";


document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeThreeBackground();

    }
);


/* =========================================================
   THREE.JS BACKGROUND
========================================================= */

function initializeThreeBackground() {

    const canvas =
        document.querySelector(
            "#three-background"
        );


    if (!canvas) return;


    /* -----------------------------------------
       Respect reduced motion
    ----------------------------------------- */

    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        return;

    }


    /* -----------------------------------------
       Check Three.js
    ----------------------------------------- */

    if (
        typeof THREE === "undefined"
    ) {

        console.warn(
            "Three.js is not loaded."
        );

        return;

    }


    /* -----------------------------------------
       Scene
    ----------------------------------------- */

    const scene =
        new THREE.Scene();


    scene.fog =
        new THREE.FogExp2(
            0x050816,
            0.0018
        );


    /* -----------------------------------------
       Camera
    ----------------------------------------- */

    const camera =
        new THREE.PerspectiveCamera(
            55,
            window.innerWidth /
            window.innerHeight,
            0.1,
            3000
        );


    camera.position.z =
        850;


    /* -----------------------------------------
       Renderer
    ----------------------------------------- */

    const renderer =
        new THREE.WebGLRenderer({

            canvas,

            alpha: true,

            antialias: true,

            powerPreference:
                "high-performance"

        });


    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio,
            2
        )
    );


    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );


    /* -----------------------------------------
       Particle configuration
    ----------------------------------------- */

    const isMobile =
        window.innerWidth <= 768;


    const particleCount =
        isMobile
            ? 700
            : 1600;


    const particleGeometry =
        new THREE.BufferGeometry();


    const positions =
        new Float32Array(
            particleCount * 3
        );


    const particleSizes =
        new Float32Array(
            particleCount
        );


    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        const index =
            i * 3;


        positions[index] =
            (Math.random() - 0.5)
            * 1800;


        positions[index + 1] =
            (Math.random() - 0.5)
            * 1100;


        positions[index + 2] =
            (Math.random() - 0.5)
            * 1500;


        particleSizes[i] =
            Math.random() * 3 + 1;

    }


    particleGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
            positions,
            3
        )
    );


    particleGeometry.setAttribute(
        "size",
        new THREE.BufferAttribute(
            particleSizes,
            1
        )
    );


    /* -----------------------------------------
       Particle material
    ----------------------------------------- */

    const particleMaterial =
        new THREE.PointsMaterial({

            color:
                0xb99cff,

            size:
                isMobile
                    ? 2
                    : 2.6,

            transparent:
                true,

            opacity:
                0.72,

            depthWrite:
                false,

            blending:
                THREE.AdditiveBlending

        });


    const particles =
        new THREE.Points(
            particleGeometry,
            particleMaterial
        );


    scene.add(
        particles
    );


    /* -----------------------------------------
       Ambient particle cloud
    ----------------------------------------- */

    const cloudGeometry =
        new THREE.BufferGeometry();


    const cloudCount =
        isMobile
            ? 250
            : 600;


    const cloudPositions =
        new Float32Array(
            cloudCount * 3
        );


    for (
        let i = 0;
        i < cloudCount;
        i++
    ) {

        const index =
            i * 3;


        cloudPositions[index] =
            (Math.random() - 0.5)
            * 2400;


        cloudPositions[index + 1] =
            (Math.random() - 0.5)
            * 1400;


        cloudPositions[index + 2] =
            (Math.random() - 0.5)
            * 2000;

    }


    cloudGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
            cloudPositions,
            3
        )
    );


    const cloudMaterial =
        new THREE.PointsMaterial({

            color:
                0x5b8cff,

            size:
                4,

            transparent:
                true,

            opacity:
                0.18,

            depthWrite:
                false,

            blending:
                THREE.AdditiveBlending

        });


    const cloud =
        new THREE.Points(
            cloudGeometry,
            cloudMaterial
        );


    scene.add(
        cloud
    );


    /* -----------------------------------------
       Central ambient sphere
    ----------------------------------------- */

    const sphereGeometry =
        new THREE.SphereGeometry(
            170,
            48,
            48
        );


    const sphereMaterial =
        new THREE.MeshBasicMaterial({

            color:
                0x7c4dff,

            transparent:
                true,

            opacity:
                0.035,

            wireframe:
                true

        });


    const ambientSphere =
        new THREE.Mesh(
            sphereGeometry,
            sphereMaterial
        );


    scene.add(
        ambientSphere
    );


    /* -----------------------------------------
       Secondary orbit rings
    ----------------------------------------- */

    const rings = [];


    const ringData = [

        {
            radius: 230,
            rotationX: 1.15,
            rotationY: 0.2
        },

        {
            radius: 300,
            rotationX: 0.4,
            rotationY: 1.0
        },

        {
            radius: 370,
            rotationX: 1.9,
            rotationY: 0.5
        }

    ];


    ringData.forEach(
        data => {

            const geometry =
                new THREE.TorusGeometry(
                    data.radius,
                    0.7,
                    8,
                    180
                );


            const material =
                new THREE.MeshBasicMaterial({

                    color:
                        0x9b5cff,

                    transparent:
                        true,

                    opacity:
                        0.08,

                    blending:
                        THREE.AdditiveBlending

                });


            const ring =
                new THREE.Mesh(
                    geometry,
                    material
                );


            ring.rotation.x =
                data.rotationX;


            ring.rotation.y =
                data.rotationY;


            scene.add(
                ring
            );


            rings.push(
                ring
            );

        }
    );


    /* -----------------------------------------
       Mouse interaction
    ----------------------------------------- */

    const mouse = {

        x: 0,

        y: 0

    };


    const targetMouse = {

        x: 0,

        y: 0

    };


    window.addEventListener(
        "mousemove",
        event => {

            targetMouse.x =
                (
                    event.clientX /
                    window.innerWidth
                ) * 2 - 1;


            targetMouse.y =
                -(
                    event.clientY /
                    window.innerHeight
                ) * 2 + 1;

        },
        {
            passive: true
        }
    );


    /* -----------------------------------------
       Scroll interaction
    ----------------------------------------- */

    let scrollProgress = 0;


    window.addEventListener(
        "scroll",
        () => {

            const maxScroll =
                document.documentElement
                    .scrollHeight
                - window.innerHeight;


            scrollProgress =
                maxScroll > 0
                    ? window.scrollY /
                      maxScroll
                    : 0;

        },
        {
            passive: true
        }
    );


    /* -----------------------------------------
       Theme colors
    ----------------------------------------- */

    function updateThemeColors() {

        const styles =
            getComputedStyle(
                document.documentElement
            );


        const primary =
            styles
                .getPropertyValue(
                    "--accent-primary"
                )
                .trim();


        const secondary =
            styles
                .getPropertyValue(
                    "--accent-secondary"
                )
                .trim();


        if (primary) {

            particleMaterial.color.set(
                primary
            );


            ambientSphere.material.color.set(
                primary
            );

        }


        if (secondary) {

            cloudMaterial.color.set(
                secondary
            );

        }

    }


    window.addEventListener(
        "portfolioThemeChanged",
        () => {

            updateThemeColors();

        }
    );


    updateThemeColors();


    /* -----------------------------------------
       Animation clock
    ----------------------------------------- */

    const clock =
        new THREE.Clock();


    function animate() {

        requestAnimationFrame(
            animate
        );


        const elapsed =
            clock.getElapsedTime();


        /* Mouse smoothing */

        mouse.x +=
            (
                targetMouse.x -
                mouse.x
            ) * 0.035;


        mouse.y +=
            (
                targetMouse.y -
                mouse.y
            ) * 0.035;


        /* Particle rotation */

        particles.rotation.y =
            elapsed * 0.015;


        particles.rotation.x =
            elapsed * 0.006;


        /* Cloud rotation */

        cloud.rotation.y =
            -elapsed * 0.008;


        cloud.rotation.x =
            elapsed * 0.004;


        /* Sphere rotation */

        ambientSphere.rotation.x =
            elapsed * 0.025;


        ambientSphere.rotation.y =
            elapsed * 0.04;


        /* Rings */

        rings.forEach(
            (ring, index) => {

                ring.rotation.z +=
                    0.0005 +
                    index * 0.00025;


                ring.rotation.y +=
                    0.0007 +
                    index * 0.0002;

            }
        );


        /* Mouse parallax */

        particles.position.x +=
            (
                mouse.x * 30 -
                particles.position.x
            ) * 0.01;


        particles.position.y +=
            (
                mouse.y * 20 -
                particles.position.y
            ) * 0.01;


        cloud.position.x +=
            (
                mouse.x * -18 -
                cloud.position.x
            ) * 0.008;


        cloud.position.y +=
            (
                mouse.y * -12 -
                cloud.position.y
            ) * 0.008;


        /* Camera movement */

        camera.position.x +=
            (
                mouse.x * 22 -
                camera.position.x
            ) * 0.008;


        camera.position.y +=
            (
                mouse.y * 14 -
                camera.position.y
            ) * 0.008;


        camera.position.z =
            850 -
            scrollProgress * 70;


        camera.lookAt(
            0,
            0,
            0
        );


        /* Dynamic opacity */

        ambientSphere.material.opacity =
            0.025 +
            (
                Math.sin(
                    elapsed * 0.8
                ) + 1
            ) * 0.012;


        renderer.render(
            scene,
            camera
        );

    }


    animate();


    /* -----------------------------------------
       Resize
    ----------------------------------------- */

    window.addEventListener(
        "resize",
        () => {

            camera.aspect =
                window.innerWidth /
                window.innerHeight;


            camera.updateProjectionMatrix();


            renderer.setSize(
                window.innerWidth,
                window.innerHeight
            );


            renderer.setPixelRatio(
                Math.min(
                    window.devicePixelRatio,
                    2
                )
            );

        }
    );

}


/* =========================================================
   END THREE.JS ENGINE
========================================================= */
