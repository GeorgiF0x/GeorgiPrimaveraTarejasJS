console.log("funciona");

import {Carta } from "./Clases/Carta.js";
import {Baraja } from "./Clases/Baraja.js";
import {Jugador } from "./Clases/Jugador.js";
import {Banca } from "./Clases/Banca.js";
import {Juego } from "./Clases/Juego.js";
import { funcionesExportadas } from "./funciones/funciones.js";

window.addEventListener('load', () => {
    let jugadorGuardado = JSON.parse(localStorage.getItem('jugador'));
    if (jugadorGuardado) {
        document.getElementById('IDNombre').value = jugadorGuardado.nombre;
    } else {
        document.getElementById('IDNombre').value = "Jugador1";
    }


    if (jugadorGuardado) {
        const jugador = new Jugador(jugadorGuardado.nombre);
        jugador.puntosAcumuladosJugador = jugadorGuardado._puntosAcumuladosJugador;
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


var panelJugador = document.createElement("div");
panelJugador.id="idPanelJugador";
panel.appendChild(panelJugador);
funcionesExportadas.agregarElementoAlDOM("h1", "Panel", "idPanelJugador");
// panelJugador.innerHTML = "<h1>Panel</h1>";


// panelJugador.style.border = "2px solid red"; // Bordes rojos
panelJugador.style.height="100%";
panelJugador.style.width="100%";
panelJugador.style.display="flex";
panelJugador.style.flexDirection = 'column'; 
panelJugador.style.justifyContent = 'center';
panelJugador.style.alignItems = 'center';




var panelPartida = document.createElement("div");
panelPartida.id="panelPartida";
panelPartida.innerHTML = "";
panel.appendChild(panelPartida);

// panelPartida.style.border = "2px solid blue"; // Bordes azules
panelPartida.style.height="100%";
panelPartida.style.width="100%";
panelPartida.style.height="100%";
panelPartida.style.width="100%";
panelPartida.style.display="flex";
panelPartida.style.flexDirection = 'column';
panelPartida.style.justifyContent = 'space-between';
panelPartida.style.alignItems = 'center';




panel.style.display = "flex";
panel.style.flexDirection = "column";
panel.style.alignItems = "center";
panel.style.justifyContent = "center";


let lista=document.createElement('ul');
lista.id="listaPanel";
panelPartida.appendChild(lista);


const baraja = new Baraja();
// baraja.construirBaraja();
// baraja.cartas.forEach(element => {
//     console.log(element.valor);
// });
baraja.barajar();
let subsecciones=Array.from(document.querySelectorAll(".subseccion"));
let subseccion2=subsecciones[1];

 
let inputNombre = document.createElement("input");
inputNombre.setAttribute("type", "text");
inputNombre.id="IDNombre";

let boton = document.createElement("button");
boton.innerText = "Empezar Juego";


function empezarJuego(){
    let nombreJugador=document.getElementById('IDNombre').value
    //poner nombre por defecto si no se ha rellenado
    if(nombreJugador==""){
        nombreJugador="jugador1";
    }
    let jugadorGuardado = JSON.parse(localStorage.getItem('jugador'));
    let jugador;
    if (jugadorGuardado && jugadorGuardado.nombre === nombreJugador) {
        jugador = new Jugador(nombreJugador);
        jugador.puntosAcumuladosJugador = jugadorGuardado._puntosAcumuladosJugador;
        console.log("cambio",jugador);
    } else {
        jugador = new Jugador(nombreJugador);
    }



    subseccion2.style.overflow="auto";
    subseccion2.innerHTML=""; //limpio el contenido de la subseccion2
    subseccion2.innerHTML=`<h2>${jugador.nombre}</h2>`; 
    panelJugador.innerHTML="";
;
    panelJugador.innerHTML+=`<h2>Total acumulado :${jugador._puntosAcumuladosJugador} Puntos </h2>`;
    panelJugador.querySelector("h2").style.textAlign = "center";




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
        funcionesExportadas.agregarElementoAlDOM("h2", `apuesta de esta partida: ${cantidadApostada}`, "idPanelJugador");
       
        
    const contenedorBotones=document.createElement('div');
    contenedorBotones.id="idPedirPlantar"
    contenedorBotones.style.display = 'flex';
    contenedorBotones.style.justifyContent = 'space-between';

        const botonPlantarse = document.createElement("button");
        botonPlantarse.id="botonPlantarse";
        botonPlantarse.textContent = "Plantarse";
        botonPlantarse.addEventListener("click", () => {
            juego.jugador1Plantarse();
            localStorage.setItem('jugador', JSON.stringify(jugador));
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
    botonPedirCarta.id="botonPedirCarta";
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
    panelJugador.appendChild(puntuacionManoJugador);
    contenedorBotones.appendChild(botonPlantarse);
    contenedorBotones.appendChild(botonPedirCarta);
    subseccion2.appendChild(contenedorBotones);
    });

    const inputCantidadApuesta = document.createElement('input');
    inputCantidadApuesta.type = 'number';
    inputCantidadApuesta.value = 1; 
    inputCantidadApuesta.min = 1;
    inputCantidadApuesta.max = jugador._puntosAcumuladosJugador; 
   

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

    // localStorage.setItem('jugador', JSON.stringify(jugador));
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



