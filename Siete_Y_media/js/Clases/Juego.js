import {Baraja } from "./Baraja.js";
import {Jugador } from "./Jugador.js";
import {Banca } from "./Banca.js";

export class Juego {
    constructor(baraja, jugador1, banca, apuesta) {
        this.baraja = baraja;
        this.jugador1 = jugador1;
        this.banca = banca;
        this.apuesta = apuesta;
    }

    repartirCartas() {
        this.jugador1.recibirCarta(this.baraja.sacarCarta());
        this.banca.recibirCarta(this.baraja.sacarCarta());
    }
    
    iniciarJuego() {
        // console.log(`se han repartido las cartas y se ha hecho la apuesta con valor ${this.apuesta}`);
        let elementoLi=document.createElement('li');
        elementoLi.innerText=`se han repartido las cartas y se ha hecho la apuesta con valor ${this.apuesta}`
        console.log( document.getElementById("listaPanel"));
        document.getElementById("listaPanel").appendChild(elementoLi);
        this.repartirCartas();
        this.jugador1.hacerApuesta(this.apuesta);
        // console.log(this.jugador1.mano);
    }


    jugador1PedirCarta() {
        console.log(this.jugador1);
        const nuevaCarta = this.baraja.sacarCarta();
        this.jugador1.recibirCarta(nuevaCarta);
        let liPideCarta=document.createElement('li');
        liPideCarta.innerText=` ${this.jugador1.nombre} ha peido carta y ha recibido la carta: ${nuevaCarta.valor} de ${nuevaCarta.palo}`
        document.getElementById('listaPanel').appendChild(liPideCarta);
        console.log(` ${this.jugador1.nombre} ha recibido la carta: ${nuevaCarta.valor} de ${nuevaCarta.palo}`);
    }
    
    jugador1Plantarse() {
        this.juegaBanca();
    }
    mostrarResultado() {
        const puntuacionJugador1 = this.jugador1.calcularPuntuacion();
        const puntuacionBanca = this.banca.calcularPuntuacion();

        let mostrarResul=document.createElement('h2');
        
    
        if (puntuacionJugador1 > 7.5) {
            console.log(`El jugador ${this.jugador1.nombre} se ha pasado de 7.5 gana La Banca `);
            mostrarResul.innerText=`El jugador ${this.jugador1.nombre} se ha pasado de 7.5 gana La Banca`;
        } else if (puntuacionBanca > 7.5) {
            console.log(`La banca se ha pasado de 7.5 El jugador ${this.jugador1.nombre} gana`);
            mostrarResul.innerText=`La banca se ha pasado de 7.5 El jugador ${this.jugador1.nombre} gana`;
        } else if (puntuacionJugador1 > puntuacionBanca) {
            console.log(`El jugador ${this.jugador1.nombre} gana`);
            mostrarResul.innerText=`El  ${this.jugador1.nombre} tiene mas puntos que la banca,${this,jugador1.nombre} gana`;
        } else if (puntuacionJugador1 < puntuacionBanca) {
            console.log(`La banca gana`);
            mostrarResul.innerText=`La banca gana`;
        } else {
            console.log(`Empate`);
            mostrarResul.innerText=`Empate`;
        }
        document.getElementById('IdPanel').appendChild(mostrarResul);
    }
    


    juegaBanca() {
        for (let i = 0; i < 4; i++) {  // por ahora lo que hago es repartir siempre 4 cartas a la banca 
            const nuevaCarta = this.baraja.sacarCarta();
            this.banca.recibirCarta(nuevaCarta);
            console.log(`La banca ha recibido la carta: ${nuevaCarta.valor} de ${nuevaCarta.palo}`);
            let liBancaPideCarta=document.createElement('li');
            liBancaPideCarta.innerText=`La banca ha recibido una carta`;
            document.getElementById('listaPanel').appendChild(liBancaPideCarta);
        }
        this.mostrarResultado();
    }

}