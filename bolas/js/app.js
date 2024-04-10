import { Bola } from "./clases/bola.js";

const bola1 = new Bola();

document.addEventListener('keydown', function(event) {
    if (event.key === '+') {
        const nuevaBola = new Bola();
        nuevaBola.dibujar();
        bola1.arrayBolas.push(nuevaBola); // Agregar la nueva bola al array de bolas
        console.log("Se ha creado una nueva bola");
    }
});

function redibujar() {
    const elementosBody = Array.from(document.querySelectorAll('.bola'));
    elementosBody.forEach(element => {
        element.remove();
    });
    bola1.arrayBolas.forEach(bola => {
       bola.avanzar();
        bola.detectarColisionParedes(); 
        bola.detectarColisionesConBolas(); 
        bola.dibujar();
    });
}

let intervalo = setInterval(() => {
    redibujar();
}, 10);

console.log("alto " + window.innerHeight);
console.log("ancho " + window.innerWidth);







