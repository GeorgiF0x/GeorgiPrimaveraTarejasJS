import { funcionesExportadas } from "../funciones/funciones.js";

export class Carta {
    constructor(palo, valor, nombre) {
        this.palo = palo;
        this.valor = valor;
        this.nombre = nombre;
    }
    
    imprimirCarta(idContenedor) {
        const contenido = `Carta: ${this.nombre} de ${this.palo}`;
        funcionesExportadas.agregarElementoAlDOM("p", contenido, idContenedor);
    }
}
    