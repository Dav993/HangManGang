'use strict';

const alfabeto = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'ñ',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
];
const solucion = ['murcielago', 'pep', 'bota', 'un', 'niños'];

let palabraElegida = solucion[Math.floor(Math.random() * solucion.length)];
let solucionArray = palabraElegida.split('');
let palDisplayArr = '_'.repeat(palabraElegida.length).split('');

const h1Elem = document.getElementById('h1');
const keys = document.getElementById('keys');
const cuentaAtras = document.getElementById('cuenta-atras');
const modoContrarrelojBtn = document.getElementById('modo-contrarreloj');

h1Elem.textContent = palDisplayArr.join(' ');

console.log(palabraElegida);

let fallos = 0;
let tiempoRestante = 15;
let intervalo;

// Función para deshabilitar todos los botones al terminar el juego
function disableAllButtons() {
    const allButtons = document.getElementsByTagName('button');
    for (const thing of allButtons) {
        thing.disabled = true;
    }
}

// Función para actualizar la imagen del ahorcado
function actualizarImagen(fallos) {
    const imgElem = document.getElementById('dibujoAhorcado');
    imgElem.src = `fotos/ahorcado${fallos}.jpg`;
}

// Función para iniciar la cuenta atrás
function iniciarCuentaAtras() {
    intervalo = setInterval(() => {
        const minutos = Math.floor(tiempoRestante / 60);
        const segundos = tiempoRestante % 60;

        cuentaAtras.textContent = `${minutos}m ${segundos}s`;

        tiempoRestante--;

        if (tiempoRestante < 0) {
            clearInterval(intervalo);
            cuentaAtras.textContent = '¡Tiempo agotado!';
            alert(
                '¡Perdiste! Tiempo agotado. Presiona F5 para volver a jugar.'
            );
            disableAllButtons();
        }
    }, 1000);
}

// Función que se ejecuta al hacer clic en una letra
function charCheck(button, guess) {
    if (solucionArray.includes(guess)) {
        // Si la letra propuesta está en la palabra, la actualizamos en la palabra oculta
        for (let i = 0; i < solucionArray.length; i++) {
            if (solucionArray[i] === guess) {
                palDisplayArr[i] = guess; // Actualiza la letra en la posición correcta
            }
        }
        h1Elem.textContent = palDisplayArr.join(' '); // Muestra la palabra actualizada
    } else {
        // Si la letra no está en la palabra, incrementamos los fallos y actualizamos la imagen
        fallos += 1;
        actualizarImagen(fallos);
        console.log(`Fallos: ${fallos}`);
    }

    // Deshabilitamos el botón después de usarlo
    button.disabled = true;

    // Comprobamos si el juego ha terminado
    if (palDisplayArr.indexOf('_') === -1) {
        alert('¡Ganaste! Presiona F5 para volver a jugar');
        disableAllButtons();
    }

    if (fallos >= 6) {
        alert('¡Perdiste! Presiona F5 para volver a jugar');
        disableAllButtons();
    }
}

// Crear botones para cada letra del alfabeto
for (let character of alfabeto) {
    let button = document.createElement('button');
    button.innerText = character;
    keys.appendChild(button);
    button.addEventListener('click', (e) => {
        charCheck(e.target, character);
    });
}

// Iniciar el juego y activar el botón "Modo Contrarreloj"
modoContrarrelojBtn.addEventListener('click', () => {
    // Iniciar la cuenta atrás cuando se presiona el botón
    iniciarCuentaAtras();

    // Deshabilitar el botón para evitar que se pulse más de una vez
    modoContrarrelojBtn.disabled = true;
});

/* OPCIÓN 1
// Selecciona el elemento donde se mostrará la cuenta atrás
const cuentaAtras = document.getElementById('cuenta-atras');

// Define el tiempo final de la cuenta atrás (ej.: 10 minutos desde ahora)
const tiempoFinal = new Date().getTime() + 10 * 60 * 1000;

// Función para actualizar la cuenta atrás
function actualizarCuentaAtras() {
    const ahora = new Date().getTime();
    const diferencia = tiempoFinal - ahora;

    if (diferencia >= 0) {
        // Calcula minutos y segundos restantes
        const minutos = Math.floor(
            (diferencia % (1000 * 60 * 60)) / (1000 * 60)
        );
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

        // Actualiza el texto del elemento
        cuentaAtras.textContent = `${minutos}m ${segundos}s`;
    } else {
        // Si termina la cuenta atrás
        cuentaAtras.textContent = '¡Tiempo agotado!';
        clearInterval(intervalo); // Detiene la actualización
    }
}

// Actualiza la cuenta atrás cada segundo
const intervalo = setInterval(actualizarCuentaAtras, 1000);
*/
/* OPCIÓN 2

// Tiempo de la cuenta atrás en segundos (ejemplo: 10 minutos)
let tiempoRestante = 10 * 60; // 10 minutos

// Selecciona el elemento del HTML
const cuentaAtras = document.getElementById('cuenta-atras');

// Función para actualizar la cuenta atrás
function actualizarCuentaAtras() {
  const minutos = Math.floor(tiempoRestante / 60); // Calcula minutos
  const segundos = tiempoRestante % 60;           // Calcula segundos restantes

  // Muestra el tiempo en el formato "Xm Ys"
  cuentaAtras.textContent = `${minutos}m ${segundos}s`;

  if (tiempoRestante <= 0) {
    clearInterval(intervalo); // Detiene la cuenta atrás
    cuentaAtras.textContent = "¡Tiempo agotado!";
  } else {
    tiempoRestante--; // Resta un segundo
  }
}

// Llama a la función cada segundo
const intervalo = setInterval(actualizarCuentaAtras, 1000);   */
/*  OPCION 3
let tiempoRestante = 300; // 5 minutos en segundos

// Obtén el elemento <p> donde se mostrará la cuenta atrás
const cuentaAtras = document.getElementById('cuenta-atras');

const intervalo = setInterval(() => {
    const minutos = Math.floor(tiempoRestante / 60);
    const segundos = tiempoRestante % 60;

    // Actualiza el contenido del elemento <p> en el HTML
    cuentaAtras.textContent = `${minutos}m ${segundos}s`;

    tiempoRestante--; // Resta un segundo

    if (tiempoRestante < 0) {
        clearInterval(intervalo);
        cuentaAtras.textContent = '¡Tiempo agotado!'; // Mensaje final
    }
}, 1000); */
