/* =========================================================
   OMOR FARUK AL RASHID
   PORTFOLIO
   DYNAMIC THEME ENGINE
========================================================= */

"use strict";


/* =========================================================
   AVAILABLE THEMES
========================================================= */

const PORTFOLIO_THEMES = {

    purple: {

        name: "Violet",

        primary: "#9b5cff",

        secondary: "#5b8cff",

        third: "#00d4ff"

    },


    cyan: {

        name: "Cyber Cyan",

        primary: "#00d4ff",

        secondary: "#367cff",

        third: "#8b5cf6"

    },


    emerald: {

        name: "Emerald",

        primary: "#00d68f",

        secondary: "#00a6ff",

        third: "#7c5cff"

    },


    rose: {

        name: "Rose",

        primary: "#ff4f9a",

        secondary: "#9b5cff",

        third: "#ff8a5c"

    },


    gold: {

        name: "Aurora Gold",

        primary: "#ffc857",

        secondary: "#ff7a59",

        third: "#a855f7"

    }

};


/* =========================================================
   DEFAULT THEME
========================================================= */

const DEFAULT_THEME =
    "purple";


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeThemeEngine();

    }
);


/* =========================================================
   INITIALIZE THEME ENGINE
========================================================= */

function initializeThemeEngine() {

    const savedTheme =
        localStorage.getItem(
            "portfolio-theme"
        );


    const initialTheme =
        savedTheme &&
        PORTFOLIO_THEMES[savedTheme]
            ? savedTheme
            : DEFAULT_THEME;


    applyPortfolioTheme(
        initialTheme,
        false
    );


    setupThemeButtons();

}


/* =========================================================
   THEME BUTTONS
========================================================= */

function setupThemeButtons() {

    const buttons =
        document.querySelectorAll(
            "[data-theme]"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const theme =
                    button.dataset.theme;


                if (
                    !PORTFOLIO_THEMES[theme]
                ) {

                    return;

                }


                applyPortfolioTheme(
                    theme,
                    true
                );

            }
        );

    });

}


/* =========================================================
   APPLY THEME
========================================================= */

function applyPortfolioTheme(
    theme,
    save = true
) {

    const themeData =
        PORTFOLIO_THEMES[theme];


    if (!themeData) return;


    const root =
        document.documentElement;


    root.style.setProperty(
        "--accent-primary",
        themeData.primary
    );


    root.style.setProperty(
        "--accent-secondary",
        themeData.secondary
    );


    root.style.setProperty(
        "--accent-third",
        themeData.third
    );


    root.style.setProperty(
        "--accent-gradient",
        `
        linear-gradient(
            135deg,
            ${themeData.primary},
            ${themeData.secondary},
            ${themeData.third}
        )
        `
    );


    document.body.dataset.theme =
        theme;


    updateActiveThemeButton(
        theme
    );


    if (save) {

        localStorage.setItem(
            "portfolio-theme",
            theme
        );

    }


    dispatchThemeEvent(
        theme
    );

}


/* =========================================================
   ACTIVE THEME BUTTON
========================================================= */

function updateActiveThemeButton(
    currentTheme
) {

    const buttons =
        document.querySelectorAll(
            "[data-theme]"
        );


    buttons.forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.theme ===
                currentTheme
        );

    });

}


/* =========================================================
   THEME TRANSITION
========================================================= */

function transitionTheme(
    callback
) {

    const overlay =
        document.querySelector(
            ".theme-transition"
        );


    if (!overlay) {

        callback();

        return;

    }


    overlay.classList.add(
        "active"
    );


    setTimeout(() => {

        callback();

    }, 250);


    setTimeout(() => {

        overlay.classList.remove(
            "active"
        );

    }, 750);

}


/* =========================================================
   THEME CHANGE EVENT
========================================================= */

function dispatchThemeEvent(
    theme
) {

    window.dispatchEvent(
        new CustomEvent(
            "portfolioThemeChanged",
            {
                detail: {

                    theme,

                    data:
                        PORTFOLIO_THEMES[
                            theme
                        ]

                }
            }
        )
    );

}


/* =========================================================
   PUBLIC THEME API
========================================================= */

window.PortfolioTheme = {

    set(theme) {

        if (
            !PORTFOLIO_THEMES[theme]
        ) {

            console.warn(
                `Unknown portfolio theme: ${theme}`
            );

            return;

        }


        transitionTheme(
            () => {

                applyPortfolioTheme(
                    theme,
                    true
                );

            }
        );

    },


    get() {

        return (
            document.body.dataset.theme
            || DEFAULT_THEME
        );

    },


    getAll() {

        return {
            ...PORTFOLIO_THEMES
        };

    }

};


/* =========================================================
   KEYBOARD THEME SWITCHING
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            !event.altKey
        ) {

            return;

        }


        const themeKeys = [
            "1",
            "2",
            "3",
            "4",
            "5"
        ];


        const index =
            themeKeys.indexOf(
                event.key
            );


        if (index === -1) return;


        const themeNames =
            Object.keys(
                PORTFOLIO_THEMES
            );


        const selectedTheme =
            themeNames[index];


        if (selectedTheme) {

            window.PortfolioTheme.set(
                selectedTheme
            );

        }

    }
);


/* =========================================================
   SYSTEM COLOR PREFERENCE
========================================================= */

const prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );


prefersReducedMotion.addEventListener?.(
    "change",
    event => {

        document.documentElement
            .classList.toggle(
                "reduced-motion",
                event.matches
            );

    }
);
