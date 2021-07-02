// ==UserScript==
// @name         jut.su Autoplay
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Autoplay script for jut.su
// @author       DOROK
// @match        https://jut.su/*
// @icon         https://www.google.com/s2/favicons?domain=jut.su
// ==/UserScript==

(function () {
    'use strict';
    function mainFunc() {
        var video = document.querySelector("#my-player_html5_api");
        var controlBar = document.querySelector(".vjs-control-bar");
        var skipButton = document.getElementsByClassName("vjs-overlay-bottom-left vjs-overlay-skip-intro")[0];
        var nextButton = document.getElementsByClassName("vjs-overlay-bottom-right vjs-overlay-skip-intro")[0];

        const windowWidth = window.innerWidth * window.devicePixelRatio;
        const windowHeight = window.innerHeight * window.devicePixelRatio;
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
        var playStarted = false;

        function skip(a) {
            if (!a.classList.contains("vjs-hidden")) {
                a.click()
            };
        }

        function isFullscreen() {
            return ((windowWidth / screenWidth) >= 0.95) && ((windowHeight / screenHeight) >= 0.95) ? true : false;
        }

        function disableScript() {
            document.body.style.overflowY = "scroll";

            document.querySelector("#my-player, .video-js").classList.remove("vjs-fullscreen");
            video.removeAttribute("style");
            document.body.removeEventListener('keydown', confirmDisable);

            controlBar.removeAttribute("style");

            document.querySelector(".header").style.opacity = 1;
            document.querySelector(".footer").style.opacity = 1;
            document.querySelector(".info_panel").style.opacity = 1;
        }

        function confirmDisable(e) {
            if (e.key == "Escape" && confirm("Exit fullscreen?")) {
                disableScript();
            }
        }

        console.log(isFullscreen());
        if (video && controlBar && skipButton && nextButton && isFullscreen()) {
            setInterval(() => {
                skip(skipButton);
                skip(nextButton);

                if (!playStarted) {
                    document.querySelector(".vjs-big-play-button").click();
                    playStarted = true;

                    document.querySelector(".header").style.opacity = 0;
                    document.querySelector(".footer").style.opacity = 0;
                    document.querySelector(".info_panel").style.opacity = 0;
                    document.body.style.overflowY = "hidden";

                    document.querySelector("#my-player, .video-js").classList.add("vjs-fullscreen");
                    video.setAttribute("style", "position: fixed; z-index: 101; background-color: black;");

                    controlBar.setAttribute("style", "position: fixed; z-index: 101;");
                };
            }, 1000);

            document.body.addEventListener('keydown', confirmDisable);
        } else {
            setTimeout(mainFunc, 300);
        }
    };
    mainFunc();
})();