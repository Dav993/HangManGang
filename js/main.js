"use strict";
//Sonidos
let win = new Audio("./sound/win.wav");
let correct = new Audio("./sound/correct.wav");
let lose = new Audio("./sound/lose.wav");
let fail = new Audio("./sound/fail.wav");
let soundOn = true;
//Funcion Sonido
function playSound(audio) {
    if (soundOn) {
        audio.play();
    }
}
//Funcion habilitar/deshabilitar sonido
function activateSound() {
    soundOn = !soundOn;
    const imagenBoton = document.getElementById("soundIcon");
    imagenBoton.src = soundOn ? "./img/off.png" : "./img/on.png";
    const boton = document.getElementById("soundToggle");
    boton.style.backgroundColor = soundOn
        ? "rgb(115, 246, 108)"
        : "rgb(246, 140, 108)";
}

const alfabeto = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "ñ",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
];
const solucion = ["murcielago", "bota", "un", "niños"];

let palabraElegida = solucion[Math.floor(Math.random() * solucion.length)];
let solucionArray = palabraElegida.split("");
let palDisplayArr = "_".repeat(palabraElegida.length).split("");

const h2Elem = document.getElementById("h2");
const keys = document.getElementById("keys");
h2Elem.textContent = palDisplayArr.join(" ");

console.log(palabraElegida);

let fallos = 0;

function disableAllButtons() {
    const allButtons = document.getElementsByTagName("button");
    for (const thing of allButtons) {
        thing.disabled = true;
    }
}

function charCheck(button, guess) {
    if (solucionArray.includes(guess)) {
        for (let elem of solucionArray) {
            if (guess === elem) {
                palDisplayArr[solucionArray.indexOf(elem)] = elem;
                playSound(correct);
            }
        }
        h2Elem.textContent = palDisplayArr.join(" ");
    } else {
        fallos += 1;
        console.log(`Fallos: ${fallos}`);
        playSound(fail);
    }
    button.disabled = true;
    if (palDisplayArr.indexOf("_") === -1) {
        alert("Ganaste! Presiona F5 para volver a jugar");
        disableAllButtons();
        playSound(win);
    }
    if (fallos >= 6) {
        alert("Perdiste! Presiona F5 para volver a jugar");
        disableAllButtons();
        playSound(lose);
    }
}

for (let character of alfabeto) {
    let button = document.createElement("button");
    button.innerText = character;
    keys.appendChild(button);
    button.addEventListener("click", (e) => {
        charCheck(e.target, character);
    });
}

let botonActivarSonido = document.createElement("button");
botonActivarSonido.id = "soundToggle";
botonActivarSonido.style.backgroundColor = "rgb(115, 246, 108)";
let imagenBoton = document.createElement("img");
imagenBoton.id = "soundIcon";
imagenBoton.src = soundOn ? "./img/off.png" : "./img/on.png";
imagenBoton.alt = "Icono de sonido";
botonActivarSonido.appendChild(imagenBoton);
botonActivarSonido.addEventListener("click", activateSound);
document.body.appendChild(botonActivarSonido);
