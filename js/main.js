/* =========================================================
   OMOR FARUK AL RASHID
   PORTFOLIO
   MAIN JAVASCRIPT CONTROLLER
========================================================= */

"use strict";


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initializePortfolio();

});


/* =========================================================
   MAIN INITIALIZER
========================================================= */

function initializePortfolio() {

    initializePageLoader();

    initializeScrollProgress();

    initializeScrollReveal();

    initializeActiveNavigation();

    initializeMobileMenu();

    initializeSmoothScrolling();

    initializeCursor();

    initializeCardEffects();

    initializeThemeSystem();

    initializeContactInteractions();

}


/* =========================================================
   PAGE LOADER
========================================================= */

function initializePageLoader() {

    const loader =
        document.querySelector(".page-loader");

    if (!loader) return;


    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.style.opacity = "0";

            loader.style.visibility = "hidden";

            loader.style.pointerEvents = "none";

            document.body.classList.add("page-loaded");

        }, 700);

    });

}


/* =========================================================
   SCROLL PROGRESS
========================================================= */

function initializeScrollProgress() {

    const progress =
        document.querySelector(".scroll-progress");

    if (!progress) return;


    const updateProgress = () => {

        const scrollTop =
            window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight
            - window.innerHeight;


        if (documentHeight <= 0) {

            progress.style.width = "0%";

            return;

        }


        const percentage =
            (scrollTop / documentHeight) * 100;


        progress.style.width =
            `${percentage}%`;

    };


    window.addEventListener(
        "scroll",
        updateProgress,
        { passive: true }
    );


    updateProgress();

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

function initializeScrollReveal() {

    const revealElements =
        document.querySelectorAll(
            ".reveal, .reveal-left, .reveal-right"
        );


    if (!revealElements.length) return;


    const observer =
        new IntersectionObserver(
            (entries, observerInstance) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;


                    entry.target.classList.add(
                        "active"
                    );


                    observerInstance.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -60px 0px"
            }
        );


    revealElements.forEach(element => {

        observer.observe(element);

    });

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

function initializeActiveNavigation() {

    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    const navigationLinks =
        document.querySelectorAll(
            ".sidebar-link, .top-link"
        );


    if (!sections.length ||
        !navigationLinks.length) return;


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting)
                        return;


                    const id =
                        entry.target.getAttribute("id");


                    navigationLinks.forEach(link => {

                        link.classList.remove(
                            "active"
                        );


                        const href =
                            link.getAttribute("href");


                        if (
                            href === `#${id}`
                        ) {

                            link.classList.add(
                                "active"
                            );

                        }

                    });

                });

            },
            {
                threshold: 0.35
            }
        );


    sections.forEach(section => {

        observer.observe(section);

    });

}


/* =========================================================
   MOBILE MENU
========================================================= */

function initializeMobileMenu() {

    const menuButton =
        document.querySelector(
            ".mobile-menu-button"
        );


    const mobileMenu =
        document.querySelector(
            ".mobile-navigation"
        );


    if (!menuButton ||
        !mobileMenu) return;


    menuButton.addEventListener(
        "click",
        () => {

            const isOpen =
                mobileMenu.classList.toggle(
                    "open"
                );


            menuButton.classList.toggle(
                "active",
                isOpen
            );


            menuButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        }
    );


    const mobileLinks =
        mobileMenu.querySelectorAll(
            "a"
        );


    mobileLinks.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                mobileMenu.classList.remove(
                    "open"
                );


                menuButton.classList.remove(
                    "active"
                );


                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }
        );

    });

}


/* =========================================================
   SMOOTH SCROLLING
========================================================= */

function initializeSmoothScrolling() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    links.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute(
                        "href"
                    );


                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) return;


                event.preventDefault();


                const headerOffset =
                    window.innerWidth <= 1024
                        ? 75
                        : 85;


                const targetPosition =
                    target.getBoundingClientRect()
                        .top
                    + window.scrollY
                    - headerOffset;


                window.scrollTo({

                    top: targetPosition,

                    behavior: "smooth"

                });

            }
        );

    });

}


/* =========================================================
   CUSTOM CURSOR
========================================================= */

function initializeCursor() {

    const dot =
        document.querySelector(
            ".cursor-dot"
        );


    const outline =
        document.querySelector(
            ".cursor-outline"
        );


    if (!dot || !outline) return;


    if (
        window.matchMedia(
            "(hover: none)"
        ).matches
    ) {

        dot.style.display = "none";

        outline.style.display = "none";

        return;

    }


    let mouseX = 0;

    let mouseY = 0;

    let outlineX = 0;

    let outlineY = 0;


    document.addEventListener(
        "mousemove",
        event => {

            mouseX =
                event.clientX;

            mouseY =
                event.clientY;


            dot.style.left =
                `${mouseX}px`;

            dot.style.top =
                `${mouseY}px`;

        }
    );


    function animateCursor() {

        outlineX +=
            (mouseX - outlineX) * 0.15;


        outlineY +=
            (mouseY - outlineY) * 0.15;


        outline.style.left =
            `${outlineX}px`;

        outline.style.top =
            `${outlineY}px`;


        requestAnimationFrame(
            animateCursor
        );

    }


    animateCursor();


    const interactiveElements =
        document.querySelectorAll(
            "a, button, .project-card, .skill-card"
        );


    interactiveElements.forEach(element => {

        element.addEventListener(
            "mouseenter",
            () => {

                outline.style.width =
                    "48px";

                outline.style.height =
                    "48px";

                outline.style.borderColor =
                    "var(--accent-third)";

            }
        );


        element.addEventListener(
            "mouseleave",
            () => {

                outline.style.width =
                    "34px";

                outline.style.height =
                    "34px";

                outline.style.borderColor =
                    "rgba(155, 92, 255, 0.65)";

            }
        );

    });

}


/* =========================================================
   CARD INTERACTION
========================================================= */

function initializeCardEffects() {

    const cards =
        document.querySelectorAll(
            ".tilt-card"
        );


    if (!cards.length) return;


    if (
        window.matchMedia(
            "(hover: none)"
        ).matches
    ) return;


    cards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX
                    - rect.left;


                const y =
                    event.clientY
                    - rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateY =
                    (x - centerX)
                    / centerX
                    * 5;


                const rotateX =
                    (centerY - y)
                    / centerY
                    * 5;


                card.style.transform =
                    `
                    perspective(1000px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-6px)
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
   THEME SYSTEM
========================================================= */

function initializeThemeSystem() {

    const themeButtons =
        document.querySelectorAll(
            ".theme-dot"
        );


    if (!themeButtons.length) return;


    const savedTheme =
        localStorage.getItem(
            "portfolio-theme"
        );


    if (savedTheme) {

        applyTheme(
            savedTheme,
            false
        );

    }


    themeButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const theme =
                    button.dataset.theme;


                if (!theme) return;


                applyTheme(
                    theme,
                    true
                );

            }
        );

    });

}


function applyTheme(
    theme,
    save = true
) {

    const body =
        document.body;


    if (theme === "purple") {

        body.removeAttribute(
            "data-theme"
        );

    } else {

        body.setAttribute(
            "data-theme",
            theme
        );

    }


    document
        .querySelectorAll(".theme-dot")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.theme === theme
            );

        });


    if (save) {

        localStorage.setItem(
            "portfolio-theme",
            theme
        );

    }

}


/* =========================================================
   CONTACT INTERACTIONS
========================================================= */

function initializeContactInteractions() {

    const emailLinks =
        document.querySelectorAll(
            '[data-email]'
        );


    emailLinks.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                const email =
                    link.dataset.email;


                if (!email) return;


                window.location.href =
                    `mailto:${email}`;

            }
        );

    });

}


/* =========================================================
   EXPOSE GLOBAL UTILITIES
========================================================= */

window.PortfolioApp = {

    applyTheme,

    scrollToTop() {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }

};
