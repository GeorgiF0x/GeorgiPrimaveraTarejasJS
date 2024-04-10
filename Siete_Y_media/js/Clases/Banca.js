import {Carta } from "./Carta.js";
import { Jugador } from "./Jugador.js";

export class Banca extends Jugador {
    constructor(nombre = "La Banca") {
        super(nombre);
    }

    recibirCarta(carta) {
        this.mano.unshift(carta);
    }

    calcularPuntuacion() {
        let puntuacion = 0;
        this.mano.forEach(carta => {
            puntuacion += carta.valor;
        });
        return puntuacion;
    }
}

