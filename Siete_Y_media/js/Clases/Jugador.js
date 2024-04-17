import {Carta } from "./Carta.js";

export class Jugador {
    constructor(nombre) {
        this.nombre = nombre;
        this.mano = [];
        this._puntosAcumuladosJugador = 10;
    }

    set puntosAcumuladosJugador(nuevosPuntos) {
        this._puntosAcumuladosJugador = nuevosPuntos;
    }

    recibirCarta(carta) {
        this.mano.push(carta);
    }

    calcularPuntuacion() {
        let puntuacion = 0;
        this.mano.forEach(element => {
            puntuacion += element.valor;
        });
        return puntuacion;
    }

    mostrarMano(elementoLista) {
        this.mano.forEach((carta, index) => {
            const elementoLi = document.createElement("li");
            elementoLi.id = "liCarta" + index;
            const idCarta=elementoLi.id;
            console.log(elementoLi);
            elementoLista.appendChild(elementoLi);
            carta.imprimirCarta(idCarta);
        });
    }
    


    hacerApuesta(cantidad) {
        this.apuestaJugador = cantidad;
    }
}
