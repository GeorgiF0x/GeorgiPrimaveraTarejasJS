import {Carta } from "./Carta.js";
import { funcionesExportadas } from "../funciones/funciones.js";
export class Baraja{
    
    constructor(){
        this.cartas=[]

    }


    construirBaraja() {
        const palos = ['Oros', 'Copas', 'Espadas', 'Bastos'];
        const valores = ['As', '2', '3', '4', '5', '6', '7', 'Sota', 'Caballo', 'Rey'];
    
        for (let palo of palos) {
            for (let valor of valores) {
                let cartaValor = 0;
                if (valor === 'Sota' || valor === 'Caballo' || valor === 'Rey') {
                    cartaValor = 0.5;
                } else if (valor != 'As') {
                    cartaValor = parseInt(valor);
                } else {
                    cartaValor = 1;
                }
                let cartaParaBaraja=new Carta(palo,cartaValor)
                this.cartas.push(cartaParaBaraja);
            }
        }
    }
    

    sacarCarta() {
        return this.cartas.shift(); 
    }

    barajar() {
        this.cartas.forEach((carta, index) => {
            const j = funcionesExportadas.getRandomInt(0, index + 1);
            let temp = this.cartas[index];
            this.cartas[index] = this.cartas[j];
            this.cartas[j] = temp;
        });
    }

    
    
}


