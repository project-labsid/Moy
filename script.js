/* =========================================
   CONFIG
========================================= */

const birthdayName = "Siti Hamilatudini";

const birthdayDate =
    "2026-09-28T00:00:00";

// Ganti angka ini dengan PIN yang kamu inginkan.
const accessPin = "280906";


/* =========================================
   ELEMENTS
========================================= */

const loading =
    document.getElementById("loading");

const opening =
    document.getElementById("opening");

const mainContent =
    document.getElementById("mainContent");

const music =
    document.getElementById("music");

const musicBtn =
    document.getElementById("musicBtn");

const heroName =
    document.getElementById("heroName");

const finalName =
    document.getElementById("finalName");

const surpriseMessage =
    document.getElementById("surpriseMessage");

const pinScreen =
    document.getElementById("pinScreen");

const pinDots =
    [...document.querySelectorAll(".access-pin-dot")];

const pinKeys =
    [...document.querySelectorAll(".access-pin-key")];

const pinMessage =
    document.getElementById("pinMessage");

const pinInputsWrap =
    document.getElementById("pinInputs");


/* =========================================
   NAME
========================================= */

document
    .querySelectorAll(".name-placeholder")
    .forEach(element => {

        element.textContent = birthdayName;

    });


heroName.textContent =
    birthdayName;


finalName.textContent =
    birthdayName;


/* =========================================
   PIN ACCESS
========================================= */

function unlockWebsite() {

    pinScreen.classList.add("hide");

    setTimeout(() => {

        pinScreen.remove();

    }, 600);

}


let enteredPin = "";


function renderPinDots() {

    pinDots.forEach((dot, index) => {

        dot.classList.toggle("filled", index < enteredPin.length);

    });

}


function validatePin() {

    if (enteredPin.length !== accessPin.length) return;

    if (enteredPin === accessPin) {

        unlockWebsite();

        return;

    }

    pinMessage.textContent = "Apakah kamu lupa dengan tanggal lahir kamu?.";
    pinInputsWrap.classList.add("error");

    setTimeout(() => {

        enteredPin = "";
        renderPinDots();
        pinInputsWrap.classList.remove("error");

    }, 500);

}


pinKeys.forEach(key => {

    key.addEventListener("click", () => {

        if (key.hasAttribute("data-pin-delete")) {

            enteredPin = enteredPin.slice(0, -1);
            renderPinDots();

            return;

        }

        if (enteredPin.length >= accessPin.length) return;

        enteredPin += key.dataset.pinNumber;
        pinMessage.textContent = "";
        renderPinDots();
        validatePin();

    });

});


document.addEventListener("keydown", event => {

    if (!pinScreen.isConnected) return;

    if (/^\d$/.test(event.key) && enteredPin.length < accessPin.length) {

        enteredPin += event.key;
        pinMessage.textContent = "";
        renderPinDots();
        validatePin();

    } else if (event.key === "Backspace") {

        enteredPin = enteredPin.slice(0, -1);
        renderPinDots();

    }

});


/* =========================================
   LOADING
========================================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        loading.classList.add("hide");

    }, 1200);

});


/* =========================================
   OPEN WEBSITE
========================================= */

function openWebsite() {

    opening.style.opacity = "0";

    opening.style.transform =
        "scale(1.02)";

    opening.style.transition =
        "opacity .8s ease, transform .8s ease";


    setTimeout(() => {

        opening.style.display = "none";

        mainContent.style.display =
            "block";


        window.scrollTo({
            top: 0,
            behavior: "instant"
        });


        document.body.style.overflowX =
            "hidden";


        startMusic();

        createConfetti();

        observeReveal();

    }, 800);

}


/* =========================================
   MUSIC
========================================= */

function startMusic() {

    music.volume = 0.35;

    const playPromise =
        music.play();

    if (playPromise !== undefined) {

        playPromise.catch(() => {
            // Autoplay diblokir browser.
        });

    }

}


function toggleMusic() {

    if (music.paused) {

        music.play();

        musicBtn.textContent =
            "♫";

    } else {

        music.pause();

        musicBtn.textContent =
            "♪";

    }

}


/* =========================================
   COUNTDOWN
========================================= */

function updateCountdown() {

    const target =
        new Date(birthdayDate).getTime();

    const now =
        new Date().getTime();

    const distance =
        target - now;


    if (distance <= 0) {

        document.getElementById("days")
            .textContent = "00";

        document.getElementById("hours")
            .textContent = "00";

        document.getElementById("minutes")
            .textContent = "00";

        document.getElementById("seconds")
            .textContent = "00";

        return;
    }


    const days =
        Math.floor(
            distance /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (distance %
                (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );


    const minutes =
        Math.floor(
            (distance %
                (1000 * 60 * 60)) /
            (1000 * 60)
        );


    const seconds =
        Math.floor(
            (distance %
                (1000 * 60)) /
            1000
        );


    document.getElementById("days")
        .textContent =
        String(days).padStart(2, "0");


    document.getElementById("hours")
        .textContent =
        String(hours).padStart(2, "0");


    document.getElementById("minutes")
        .textContent =
        String(minutes).padStart(2, "0");


    document.getElementById("seconds")
        .textContent =
        String(seconds).padStart(2, "0");

}


updateCountdown();

setInterval(
    updateCountdown,
    1000
);


/* =========================================
   SURPRISE
========================================= */

function showSurprise() {

    surpriseMessage.classList.add("show");

    createConfetti();


    setTimeout(() => {

        surpriseMessage.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }, 200);

}


/* =========================================
   SCROLL REVEAL
========================================= */

function observeReveal() {

    const elements =
        document.querySelectorAll(".reveal");


    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target
                            .classList
                            .add("visible");


                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    elements.forEach(element => {

        observer.observe(element);

    });

}


/* =========================================
   CONFETTI
========================================= */

function createConfetti() {

    const symbols =
        ["✦", "·", "✧"];


    for (let i = 0; i < 35; i++) {

        const confetti =
            document.createElement("div");


        confetti.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        confetti.style.position =
            "fixed";

        confetti.style.left =
            Math.random() * 100 + "vw";

        confetti.style.top =
            "-20px";

        confetti.style.zIndex =
            "99999";

        confetti.style.pointerEvents =
            "none";

        confetti.style.color =
            "#c8a96b";

        confetti.style.fontSize =
            Math.random() * 12 + 8 + "px";

        confetti.style.opacity =
            Math.random() * .6 + .3;


        document.body.appendChild(
            confetti
        );


        const duration =
            Math.random() * 2500 +
            2500;


        const rotation =
            Math.random() * 720 -
            360;


        confetti.animate(
            [
                {
                    transform:
                        "translateY(0) rotate(0deg)",
                    opacity: 1
                },

                {
                    transform:
                        `translateY(110vh) rotate(${rotation}deg)`,
                    opacity: 0
                }
            ],
            {
                duration: duration,

                easing:
                    "cubic-bezier(.2,.7,.3,1)"
            }
        );


        setTimeout(() => {

            confetti.remove();

        }, duration);

    }

}


/* =========================================
   INITIAL
========================================= */

document.body.style.overflowX =
    "hidden";
