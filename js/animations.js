/* =========================================================
   OMOR FARUK AL RASHID
   PORTFOLIO
   ADVANCED ANIMATION ENGINE
========================================================= */

"use strict";


document.addEventListener("DOMContentLoaded", () => {

    initializeAnimations();

});


/* =========================================================
   MAIN INITIALIZER
========================================================= */

function initializeAnimations() {

    initializeRevealAnimations();

    initializeStaggerAnimations();

    initializeTiltCards();

    initializeMagneticElements();

    initializeNumberCounters();

    initializeParallaxElements();

    initializeImageHoverEffects();

    initializeTextSplitEffects();

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

function initializeRevealAnimations() {

    const elements =
        document.querySelectorAll(
            ".reveal, .reveal-left, .reveal-right"
        );


    if (!elements.length) return;


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        !entry.isIntersecting
                    ) {

                        return;

                    }


                    entry.target.classList.add(
                        "active"
                    );


                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12,

                rootMargin:
                    "0px 0px -70px 0px"
            }
        );


    elements.forEach(element => {

        observer.observe(element);

    });

}


/* =========================================================
   STAGGER ANIMATION
========================================================= */

function initializeStaggerAnimations() {

    const groups =
        document.querySelectorAll(
            "[data-stagger]"
        );


    groups.forEach(group => {

        const children =
            group.children;


        Array.from(children)
            .forEach((child, index) => {

                child.style.transitionDelay =
                    `${index * 80}ms`;

            });

    });

}


/* =========================================================
   ADVANCED 3D TILT
========================================================= */

function initializeTiltCards() {

    const cards =
        document.querySelectorAll(
            "[data-tilt]"
        );


    if (!cards.length) return;


    const isTouchDevice =
        window.matchMedia(
            "(hover: none)"
        ).matches;


    if (isTouchDevice) return;


    cards.forEach(card => {

        const intensity =
            parseFloat(
                card.dataset.tiltIntensity
            ) || 7;


        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();


                const mouseX =
                    event.clientX -
                    rect.left;


                const mouseY =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateY =
                    (
                        mouseX -
                        centerX
                    )
                    / centerX
                    * intensity;


                const rotateX =
                    (
                        centerY -
                        mouseY
                    )
                    / centerY
                    * intensity;


                card.style.transform =
                    `
                    perspective(1200px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-8px)
                    scale(1.015)
                    `;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    });

}


/* =========================================================
   MAGNETIC BUTTON
========================================================= */

function initializeMagneticElements() {

    const elements =
        document.querySelectorAll(
            "[data-magnetic]"
        );


    if (!elements.length) return;


    if (
        window.matchMedia(
            "(hover: none)"
        ).matches
    ) {

        return;

    }


    elements.forEach(element => {

        element.addEventListener(
            "mousemove",
            event => {

                const rect =
                    element.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;


                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;


                const strength =
                    parseFloat(
                        element.dataset.magnetic
                    ) || 0.25;


                element.style.transform =
                    `
                    translate(
                        ${x * strength}px,
                        ${y * strength}px
                    )
                    `;

            }
        );


        element.addEventListener(
            "mouseleave",
            () => {

                element.style.transform =
                    "";

            }
        );

    });

}


/* =========================================================
   NUMBER COUNTER
========================================================= */

function initializeNumberCounters() {

    const counters =
        document.querySelectorAll(
            "[data-counter]"
        );


    if (!counters.length) return;


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        !entry.isIntersecting
                    ) {

                        return;

                    }


                    animateCounter(
                        entry.target
                    );


                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.6
            }
        );


    counters.forEach(counter => {

        observer.observe(counter);

    });

}


function animateCounter(element) {

    const target =
        parseFloat(
            element.dataset.counter
        );


    if (
        Number.isNaN(target)
    ) {

        return;

    }


    const duration =
        parseInt(
            element.dataset.duration
        ) || 1800;


    const suffix =
        element.dataset.suffix || "";


    const prefix =
        element.dataset.prefix || "";


    const decimals =
        parseInt(
            element.dataset.decimals
        ) || 0;


    const startTime =
        performance.now();


    function updateCounter(currentTime) {

        const elapsed =
            currentTime -
            startTime;


        const progress =
            Math.min(
                elapsed / duration,
                1
            );


        const eased =
            1 -
            Math.pow(
                1 - progress,
                3
            );


        const current =
            target * eased;


        element.textContent =
            prefix +
            current.toFixed(decimals) +
            suffix;


        if (progress < 1) {

            requestAnimationFrame(
                updateCounter
            );

        }

    }


    requestAnimationFrame(
        updateCounter
    );

}


/* =========================================================
   PARALLAX EFFECT
========================================================= */

function initializeParallaxElements() {

    const elements =
        document.querySelectorAll(
            "[data-parallax]"
        );


    if (!elements.length) return;


    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        return;

    }


    let ticking = false;


    function updateParallax() {

        const scrollY =
            window.scrollY;


        elements.forEach(element => {

            const speed =
                parseFloat(
                    element.dataset.parallax
                ) || 0.15;


            const rect =
                element.getBoundingClientRect();


            const center =
                rect.top +
                rect.height / 2;


            const viewportCenter =
                window.innerHeight / 2;


            const offset =
                (
                    center -
                    viewportCenter
                ) * speed;


            element.style.transform =
                `translate3d(0, ${offset}px, 0)`;

        });


        ticking = false;

    }


    window.addEventListener(
        "scroll",
        () => {

            if (!ticking) {

                requestAnimationFrame(
                    updateParallax
                );

                ticking = true;

            }

        },
        {
            passive: true
        }
    );


    updateParallax();

}


/* =========================================================
   IMAGE HOVER EFFECT
========================================================= */

function initializeImageHoverEffects() {

    const containers =
        document.querySelectorAll(
            "[data-image-hover]"
        );


    if (!containers.length) return;


    if (
        window.matchMedia(
            "(hover: none)"
        ).matches
    ) {

        return;

    }


    containers.forEach(container => {

        const image =
            container.querySelector(
                "img"
            );


        if (!image) return;


        container.addEventListener(
            "mousemove",
            event => {

                const rect =
                    container.getBoundingClientRect();


                const x =
                    (
                        event.clientX -
                        rect.left
                    )
                    / rect.width;


                const y =
                    (
                        event.clientY -
                        rect.top
                    )
                    / rect.height;


                const moveX =
                    (x - 0.5) * 12;


                const moveY =
                    (y - 0.5) * 12;


                image.style.transform =
                    `
                    scale(1.08)
                    translate(
                        ${moveX}px,
                        ${moveY}px
                    )
                    `;

            }
        );


        container.addEventListener(
            "mouseleave",
            () => {

                image.style.transform =
                    "";

            }
        );

    });

}


/* =========================================================
   TEXT SPLIT EFFECT
========================================================= */

function initializeTextSplitEffects() {

    const elements =
        document.querySelectorAll(
            "[data-text-reveal]"
        );


    elements.forEach(element => {

        const text =
            element.textContent.trim();


        if (!text) return;


        element.innerHTML = "";


        const words =
            text.split(" ");


        words.forEach(
            (word, index) => {

                const span =
                    document.createElement(
                        "span"
                    );


                span.textContent =
                    word;


                span.style.display =
                    "inline-block";


                span.style.opacity =
                    "0";


                span.style.transform =
                    "translateY(25px)";


                span.style.transition =
                    `
                    opacity 0.6s ease
                    ${index * 60}ms,
                    transform 0.6s
                    cubic-bezier(
                        0.22,
                        1,
                        0.36,
                        1
                    )
                    ${index * 60}ms
                    `;


                element.appendChild(
                    span
                );


                if (
                    index <
                    words.length - 1
                ) {

                    element.appendChild(
                        document.createTextNode(
                            " "
                        )
                    );

                }

            }
        );


        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            !entry.isIntersecting
                        ) {

                            return;

                        }


                        entry.target
                            .querySelectorAll(
                                "span"
                            )
                            .forEach(span => {

                                span.style.opacity =
                                    "1";


                                span.style.transform =
                                    "translateY(0)";

                            });


                        observer.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.5
                }
            );


        observer.observe(element);

    });

}


/* =========================================================
   SCROLL VELOCITY EFFECT
========================================================= */

let lastScrollY =
    window.scrollY;

let scrollVelocity = 0;


window.addEventListener(
    "scroll",
    () => {

        const currentScrollY =
            window.scrollY;


        scrollVelocity =
            currentScrollY -
            lastScrollY;


        lastScrollY =
            currentScrollY;


        document.documentElement
            .style
            .setProperty(
                "--scroll-velocity",
                Math.min(
                    Math.abs(scrollVelocity),
                    20
                )
            );

    },
    {
        passive: true
    }
);


/* =========================================================
   HOVER GLOW FOLLOWER
========================================================= */

function initializeGlowFollower() {

    const elements =
        document.querySelectorAll(
            "[data-glow]"
        );


    if (!elements.length) return;


    if (
        window.matchMedia(
            "(hover: none)"
        ).matches
    ) {

        return;

    }


    elements.forEach(element => {

        element.addEventListener(
            "mousemove",
            event => {

                const rect =
                    element.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                element.style.setProperty(
                    "--mouse-x",
                    `${x}px`
                );


                element.style.setProperty(
                    "--mouse-y",
                    `${y}px`
                );

            }
        );

    });

}


initializeGlowFollower();


/* =========================================================
   3D FLOATING OBJECTS
========================================================= */

function initializeFloatingObjects() {

    const objects =
        document.querySelectorAll(
            "[data-floating]"
        );


    objects.forEach(
        (object, index) => {

            const speed =
                parseFloat(
                    object.dataset.floating
                ) || 4;


            const delay =
                index * 0.4;


            object.style.animation =
                `
                smoothFloat
                ${speed}s
                ease-in-out
                ${delay}s
                infinite
                `;

        }
    );

}


initializeFloatingObjects();


/* =========================================================
   RESIZE CLEANUP
========================================================= */

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth <= 768
        ) {

            document
                .querySelectorAll(
                    "[data-tilt]"
                )
                .forEach(element => {

                    element.style.transform =
                        "";

                });

        }

    }
);
