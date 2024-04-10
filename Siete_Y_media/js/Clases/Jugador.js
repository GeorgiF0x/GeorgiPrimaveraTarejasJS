import {Carta } from "./Carta.js";

export class Jugador {
    constructor(nombre) {
        this.nombre = nombre;
        this.mano = [];
        this.apuestaJugador = 0;
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

    hacerApuesta(cantidad) {
        this.apuestaJugador = cantidad;
    }
}
