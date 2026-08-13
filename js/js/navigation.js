/* =========================================================
   OMOR FARUK AL RASHID
   PORTFOLIO
   NAVIGATION ENGINE
========================================================= */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    initializeNavigation();

});


/* =========================================================
   MAIN NAVIGATION INITIALIZER
========================================================= */

function initializeNavigation() {

    setupSmoothNavigation();

    setupMobileNavigation();

    setupActiveSectionTracking();

    setupPageTransition();

}


/* =========================================================
   SMOOTH NAVIGATION
========================================================= */

function setupSmoothNavigation() {

    const navigationLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    navigationLinks.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");


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


                const mobileHeader =
                    document.querySelector(
                        ".mobile-header"
                    );


                const headerHeight =
                    mobileHeader &&
                    window.innerWidth <= 1024
                        ? mobileHeader.offsetHeight
                        : 75;


                const targetPosition =
                    target.getBoundingClientRect()
                        .top
                    + window.scrollY
                    - headerHeight;


                window.scrollTo({

                    top: targetPosition,

                    behavior: "smooth"

                });


                closeMobileNavigation();

            }
        );

    });

}


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

function setupMobileNavigation() {

    const menuButton =
        document.querySelector(
            ".mobile-menu-button"
        );


    const mobileNavigation =
        document.querySelector(
            ".mobile-navigation"
        );


    if (
        !menuButton ||
        !mobileNavigation
    ) {

        return;

    }


    menuButton.addEventListener(
        "click",
        () => {

            toggleMobileNavigation();

        }
    );


    const mobileLinks =
        mobileNavigation.querySelectorAll(
            "a"
        );


    mobileLinks.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                closeMobileNavigation();

            }
        );

    });

}


function toggleMobileNavigation() {

    const menuButton =
        document.querySelector(
            ".mobile-menu-button"
        );


    const mobileNavigation =
        document.querySelector(
            ".mobile-navigation"
        );


    if (
        !menuButton ||
        !mobileNavigation
    ) {

        return;

    }


    const isOpen =
        mobileNavigation.classList.toggle(
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


    document.body.classList.toggle(
        "menu-open",
        isOpen
    );

}


function closeMobileNavigation() {

    const menuButton =
        document.querySelector(
            ".mobile-menu-button"
        );


    const mobileNavigation =
        document.querySelector(
            ".mobile-navigation"
        );


    if (
        !menuButton ||
        !mobileNavigation
    ) {

        return;

    }


    mobileNavigation.classList.remove(
        "open"
    );


    menuButton.classList.remove(
        "active"
    );


    menuButton.setAttribute(
        "aria-expanded",
        "false"
    );


    document.body.classList.remove(
        "menu-open"
    );

}


/* =========================================================
   ACTIVE SECTION TRACKING
========================================================= */

function setupActiveSectionTracking() {

    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    const navigationLinks =
        document.querySelectorAll(
            '[data-nav-link]'
        );


    if (
        !sections.length ||
        !navigationLinks.length
    ) {

        return;

    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        !entry.isIntersecting
                    ) {

                        return;

                    }


                    const currentId =
                        entry.target.id;


                    updateActiveNavigation(
                        currentId,
                        navigationLinks
                    );

                });

            },
            {
                root: null,

                rootMargin:
                    "-25% 0px -55% 0px",

                threshold: 0
            }
        );


    sections.forEach(section => {

        observer.observe(section);

    });

}


function updateActiveNavigation(
    currentId,
    navigationLinks
) {

    navigationLinks.forEach(link => {

        const targetId =
            link.getAttribute(
                "href"
            );


        link.classList.toggle(
            "active",
            targetId === `#${currentId}`
        );

    });

}


/* =========================================================
   PAGE TRANSITION
========================================================= */

function setupPageTransition() {

    const transition =
        document.querySelector(
            ".page-transition"
        );


    if (!transition) return;


    const internalLinks =
        document.querySelectorAll(
            'a[data-transition]'
        );


    internalLinks.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const target =
                    link.getAttribute(
                        "href"
                    );


                if (
                    !target ||
                    target.startsWith("#")
                ) {

                    return;

                }


                event.preventDefault();


                transition.classList.add(
                    "active"
                );


                setTimeout(() => {

                    window.location.href =
                        target;

                }, 500);

            }
        );

    });

}


/* =========================================================
   CLOSE MENU WITH ESCAPE
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeMobileNavigation();

        }

    }
);


/* =========================================================
   CLOSE MENU WHEN CLICKING OUTSIDE
========================================================= */

document.addEventListener(
    "click",
    event => {

        const mobileNavigation =
            document.querySelector(
                ".mobile-navigation"
            );


        const menuButton =
            document.querySelector(
                ".mobile-menu-button"
            );


        if (
            !mobileNavigation ||
            !menuButton
        ) {

            return;

        }


        if (
            !mobileNavigation.classList.contains(
                "open"
            )
        ) {

            return;

        }


        if (
            mobileNavigation.contains(
                event.target
            ) ||
            menuButton.contains(
                event.target
            )
        ) {

            return;

        }


        closeMobileNavigation();

    }
);


/* =========================================================
   HEADER SCROLL EFFECT
========================================================= */

const navigationHeader =
    document.querySelector(
        ".top-header, .mobile-header"
    );


if (navigationHeader) {

    window.addEventListener(
        "scroll",
        () => {

            if (
                window.scrollY > 40
            ) {

                navigationHeader.classList.add(
                    "scrolled"
                );

            } else {

                navigationHeader.classList.remove(
                    "scrolled"
                );

            }

        },
        { passive: true }
    );

}


/* =========================================================
   PUBLIC NAVIGATION API
========================================================= */

window.PortfolioNavigation = {

    open() {

        const navigation =
            document.querySelector(
                ".mobile-navigation"
            );


        if (navigation) {

            navigation.classList.add(
                "open"
            );

        }

    },


    close() {

        closeMobileNavigation();

    },


    toggle() {

        toggleMobileNavigation();

    }

};
