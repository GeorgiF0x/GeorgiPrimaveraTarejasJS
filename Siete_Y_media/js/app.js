console.log("funciona");

import {Carta } from "./Clases/Carta.js";
import {Baraja } from "./Clases/Baraja.js";
import {Jugador } from "./Clases/Jugador.js";
import {Banca } from "./Clases/Banca.js";
import {Juego } from "./Clases/Juego.js";
import { funcionesExportadas } from "./funciones/funciones.js";

window.addEventListener('load', () => {
    let jugadorGuardado = localStorage.getItem('jugador');
    if (jugadorGuardado) {
        const jugador = JSON.parse(jugadorGuardado);
        document.getElementById('IDNombre').value = jugador.nombre;
    } else {

        document.getElementById('IDNombre').value = "Jugador1";
    }
});


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
boton.innerText = "Empezar Juego";


function empezarJuego(){
    let nombreJugador=document.getElementById('IDNombre').value
    //guardar nombre de jugador 
    localStorage.setItem('nombreJugador', nombreJugador);
    //poner nombre por defecto si no se ha rellenado
    if(nombreJugador==""){
        nombreJugador="jugador1";
    }
    const jugador = new Jugador(nombreJugador);
    subseccion2.innerHTML=""; //limpio el contenido de la subseccion2
    subseccion2.innerHTML+=`<h2>${nombreJugador} puntos totales :${jugador._puntosAcumuladosJugador} </h2>`;
    console.log(jugador);



    function borrarBotones(){
    botonHacerApuesta.remove();
    inputCantidadApuesta.remove();
    }

    const formularioApuesta = document.createElement("form");
    formularioApuesta.addEventListener("submit", (event) => {
        borrarBotones();
        event.preventDefault();
        const cantidadApostada = parseInt(inputCantidadApuesta.value);
        // Cambiar la apuesta 
        juego.apuesta = cantidadApostada;
        funcionesExportadas.agregarElementoAlDOM("p", `Se ha realizado una apuesta de ${cantidadApostada}`, "IdPanel");
        
    const contenedorBotones=document.createElement('div');
    contenedorBotones.style.display = 'flex';
    contenedorBotones.style.justifyContent = 'space-between';

        const botonPlantarse = document.createElement("button");
        botonPlantarse.textContent = "Plantarse";
        botonPlantarse.addEventListener("click", () => {
            juego.jugador1Plantarse();
            console.log(jugador);
            contenedorBotones.innerHTML="";
            const botonNuevaPartida = document.createElement("Button");
            botonNuevaPartida.innerText="Jugar De Nuevo";
            botonNuevaPartida.addEventListener("click", () => {
               
                window.location.reload();
            });
            contenedorBotones.appendChild(botonNuevaPartida);
        });

    const botonPedirCarta = document.createElement("button");
    const puntuacionManoJugador=document.createElement('h3');
    puntuacionManoJugador.innerText="Puntos en la mano "+juego.jugador1.calcularPuntuacion();
    botonPedirCarta.textContent = "Pedir Carta";
    botonPedirCarta.addEventListener("click", () => {
       juego.jugador1PedirCarta();
       const ulManoJugador = document.getElementById("manoJugador");
       console.log(ulManoJugador);
       ulManoJugador.innerHTML="";
       juego.jugador1.mostrarMano(ulManoJugador);
       puntuacionManoJugador.innerText="Puntos en la mano "+juego.jugador1.calcularPuntuacion();
       console.log(puntuacionManoJugador);
    });
    subseccion2.insertBefore(puntuacionManoJugador, subseccion2.firstChild);
    contenedorBotones.appendChild(botonPlantarse);
    contenedorBotones.appendChild(botonPedirCarta);
    subseccion2.appendChild(contenedorBotones);
    });

    const inputCantidadApuesta = document.createElement('input');
    inputCantidadApuesta.type = 'number';
    inputCantidadApuesta.value = 100; 
    inputCantidadApuesta.min = 10; 
    inputCantidadApuesta.step = 10; 

    const botonHacerApuesta = document.createElement('button');
    botonHacerApuesta.textContent = 'Hacer Apuesta';

    formularioApuesta.appendChild(inputCantidadApuesta);
    formularioApuesta.appendChild(botonHacerApuesta);
    subseccion2.appendChild(formularioApuesta);

    //mano del jugador 
    const manoJugador=document.createElement("ul");
    manoJugador.id="manoJugador";
    subseccion2.appendChild(manoJugador);

 

    const banca = new Banca('Banca');
    const juego = new Juego(baraja, jugador, banca, 100); 
    juego.iniciarJuego();


    localStorage.setItem('jugador', JSON.stringify(jugador));
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



