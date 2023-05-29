// A unminified version is at og-loader.js

// Array of image URLs
var imageUrls = [
    '/img/bg1.png',
    '/img/bg2.png',
    '/img/bg3.png',
    '/img/bg4.png',
    '/img/bg5.png',
    '/img/bg6.png',
    '/img/bg7.png',
    '/img/bg8.png',
    '/img/bg9.png',
    '/img/bg10.png'
];

let audioElements = {};
const spinnerElement = document.querySelector(".spinner");
const containerElement = document.querySelector(".flex-container");
let hasLoaded = false;
let time = Date.now()
fetch("sounds.json?t=" + time).then(response => response.json()).then(data => {
    data.sounds.forEach(sound => {
        const soundElement = document.createElement("div");
        soundElement.classList.add("sound");
        const buttonElement = document.createElement("button");
        buttonElement.classList.add("small-button");
        buttonElement.style.backgroundColor = "#" + Math.floor(Math.random() * 16777215).toString(16);;
        var randomIndex = Math.floor(Math.random() * imageUrls.length);
        var randomImageUrl = imageUrls[randomIndex];
        // console.log(randomImageUrl);
        buttonElement.style.backgroundImage = 'url(' + randomImageUrl + ')';
        buttonElement.style.backgroundSize = 'cover';
        buttonElement.addEventListener("click", () => {
            if (audioElements[sound.name]) {
                audioElements[sound.name].currentTime = 0;
                audioElements[sound.name].play();
            }
        });
        soundElement.appendChild(buttonElement);
        const nameElement = document.createElement("p");
        nameElement.classList.add("name");
        nameElement.innerText = sound.name;
        soundElement.appendChild(nameElement);
        const audioElement = document.createElement("audio");
        audioElement.src = sound.mp3;
        audioElement.preload = "auto";
        audioElements[sound.name] = audioElement;
        document.body.appendChild(audioElement);
        const containerElement = document.querySelector(".flex-container");
        containerElement.appendChild(soundElement);
    });
    spinnerElement.remove();
    hasLoaded = true;
    console.log(data.sounds.length + " sounds loaded!");
}).catch(error => {
    const errorMessageElement = document.createElement("h3");
    errorMessageElement.style.color = "red";
    errorMessageElement.innerText = "Error loading soundboard: " + error;
    containerElement.appendChild(errorMessageElement);
    spinnerElement.remove();
});
setTimeout(() => {
    if (!hasLoaded) {
        const errorMessageElement = document.createElement("h3");
        errorMessageElement.style.color = "red";
        errorMessageElement.innerText = "A unknown error occured while trying to load the soundboard.";
        containerElement.appendChild(errorMessageElement);
        spinnerElement.remove();
    }
}, 7000);

function playAll() {
    for (const name in audioElements) {
        if (Object.hasOwnProperty.call(audioElements, name)) {
            const el = audioElements[name];
            el.play();
        }
    }
}

function stopAll() {
    for (const name in audioElements) {
        if (Object.hasOwnProperty.call(audioElements, name)) {
            const el = audioElements[name];
            el.pause();
            el.currentTime = 0;
        }
    }
}