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
let inputCantidadApuesta = document.createElement('input');
inputCantidadApuesta.type = 'number';
inputCantidadApuesta.value = 100; 
inputCantidadApuesta.min = 10; 
inputCantidadApuesta.step = 10; 
panel.appendChild(inputCantidadApuesta);
let botonHacerApuesta = document.createElement('button');
botonHacerApuesta.textContent = 'Hacer Apuesta';

function borrarBotones(){
    
    botonHacerApuesta.remove();
    inputCantidadApuesta.remove();
}
function hacerApuesta() {

    var cantidadApuesta = parseInt(inputCantidadApuesta.value);
    console.log(`Se ha realizado una apuesta de ${cantidadApuesta} unidades.`);
    botonHacerApuesta.addEventListener('click',borrarBotones);
    return cantidadApuesta;
}


botonHacerApuesta.addEventListener('click', hacerApuesta);

panel.appendChild(botonHacerApuesta);
const cantidadApostada = hacerApuesta();
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
    
    //Cargar nombre de jugador 
    localStorage.setItem('nombreJugador', nombreJugador);
    window.addEventListener('load', () => {
        let nombreJugador = localStorage.getItem('nombreJugador');
        if (nombreJugador) {
            document.getElementById('IDNombre').value = nombreJugador;
        } else {
            document.getElementById('IDNombre').value = "Jugador1";
        }
    });

    if(nombreJugador==""){
        nombreJugador="jugador1";
    }
    const jugador = new Jugador(nombreJugador);
    subseccion2.innerHTML=""; //limpio el contenido de la subseccion2
    subseccion2.innerHTML+=`<h2>${nombreJugador}</h2>`;
    const listaMano = document.createElement("ul");
    const banca = new Banca('Banca');
    const juego = new Juego(baraja, jugador, banca, cantidadApostada); 

    juego.iniciarJuego();
    function actualizarLista(){
         listaMano.innerHTML = "";
        juego.jugador1.mano.forEach(element => {
            const elementoLi = document.createElement("li");
            if (element.valor === 0.5) {
                elementoLi.innerText = `As de ${element.palo}`; 
            } else {
                elementoLi.innerText = `${element.valor} de ${element.palo}`; 
            }
            listaMano.appendChild(elementoLi); 
        });
    }
    actualizarLista();
    subseccion2.appendChild(listaMano);

    const contenedorBotones=document.createElement('div');
    contenedorBotones.style.display = 'flex';
    contenedorBotones.style.justifyContent = 'space-between';

        const botonPlantarse = document.createElement("button");
        botonPlantarse.textContent = "Plantarse";
        botonPlantarse.addEventListener("click", () => {
            juego.jugador1Plantarse();
            contenedorBotones.innerHTML="";
            const botonNuevaPartida = document.createElement("Button");
            botonNuevaPartida.innerText="Jugar De Nuevo";
            botonNuevaPartida.addEventListener("click", () => {
               
                window.location.reload();
            });
            contenedorBotones.appendChild(botonNuevaPartida);
        });

    const botonPedirCarta = document.createElement("button");
    botonPedirCarta.textContent = "Pedir Carta";
    botonPedirCarta.addEventListener("click", () => {
       juego.jugador1PedirCarta();
       actualizarLista();
    });

    contenedorBotones.appendChild(botonPlantarse);
    contenedorBotones.appendChild(botonPedirCarta);
    subseccion2.appendChild(contenedorBotones);
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



