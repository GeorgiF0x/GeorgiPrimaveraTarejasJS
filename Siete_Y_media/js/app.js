console.log("funciona");

import {Carta } from "./Clases/Carta.js";
import {Baraja } from "./Clases/Baraja.js";
import {Jugador } from "./Clases/Jugador.js";
import {Banca } from "./Clases/Banca.js";
import {Juego } from "./Clases/Juego.js";

let sectiones=Array.from(document.querySelectorAll('section'));
let panel= sectiones[1];
panel.style.display = 'flex';
panel.style.flexDirection = 'column';
panel.style.justifyContent = 'center';
panel.style.alignItems = 'center';
panel.id="IdPanel";
panel.innerHTML="";
panel.innerHTML="<h2>Panel<h2>";
let lista=document.createElement('ul');
lista.id="listaPanel";
panel.appendChild(lista);


const baraja = new Baraja();
baraja.construirBaraja();
// baraja.cartas.forEach(element => {
//     console.log(element.valor);
// });
baraja.barajar();
let subsecciones=Array.from(document.querySelectorAll(".subseccion"));
let subseccion2=subsecciones[1];

 
let inputNombre = document.createElement("input");
inputNombre.setAttribute("type", "text");
inputNombre.id="IDNombre";
console.log(inputNombre);
let boton = document.createElement("button");
boton.innerText = "Enviar";
function empezarJuego(){
    let nombreJugador=document.getElementById('IDNombre').value
    if(nombreJugador==""){
        nombreJugador="jugador1";
    }
    const jugador = new Jugador(nombreJugador);
    subseccion2.innerHTML=""; //limpio el contenido de la subseccion2
    subseccion2.innerHTML+=`<h2>${nombreJugador}</h2>`;
    const banca = new Banca('Banca');
    const juego = new Juego(baraja, jugador, banca, 100); 
    juego.iniciarJuego();
    juego.jugador1PedirCarta();
    juego.jugador1PedirCarta();
    console.log(juego.jugador1.mano);
    juego.jugador1Plantarse();
}
boton.addEventListener("click",empezarJuego)
subseccion2.appendChild(inputNombre);
subseccion2.appendChild(boton);



subsecciones.forEach(element => {
    element.style.display = 'flex';
    element.style.flexDirection = 'column';
    element.style.justifyContent = 'center';
    element.style.alignItems = 'center';
});
