import { Jugador } from "./jugador.js";

export class Tablero {
    constructor(jugador1, jugador2){
        this._filas = 3;
        this._columnas = 3;
        this.movimientos = []; 
        this.jugadores = [];
        this.registrarJugadores(jugador1, jugador2);
        this.jugadorActual = this.jugadores[0]; // Comenzamos con el primer jugador
        this.crearTablero();

        for (let i = 0; i < this._filas; i++) {
            this.movimientos[i] = [];
            for (let j = 0; j < this._columnas; j++) {
                this.movimientos[i][j] = null;
            }
        }
    }

    get filas() {
        return this._filas;
    }

    get columnas() {
        return this._columnas;
    }

    cambiarJugador() {
        // intercalamos al siguiente jugador en el array de jugadores 
        this.jugadorActual = this.jugadores.find(jugador => jugador !== this.jugadorActual);
    }

    registrarJugadores(jugador1, jugador2){
        this.jugadores.push(jugador1);
        this.jugadores.push(jugador2);
    }

    registrarMovimiento(movimiento) {
        if (
            movimiento.fila >= 0 &&
            movimiento.fila < this._filas &&
            movimiento.columna >= 0 &&
            movimiento.columna < this._columnas
        ) {
            this.movimientos[movimiento.fila][movimiento.columna] = movimiento;
            this.cambiarJugador(); // Cambiar al siguiente jugador después de cada movimiento
            console.log(this.jugadorActual);
        } else {
            console.error("Movimiento fuera de los límites del tablero.");
        }
    }
    
    

    pintar(fila, columna) {
        const elemento = document.getElementById(`F${fila}C${columna}`);
        elemento.innerText = this.jugadorActual.signo; // Usar el signo del jugador actual
    }

    comprobar3enRaya() {
        const filas = this._filas;
        const columnas = this._columnas;
        let ganadorEncontrado = false;
    
        // Comprobar filas
        for (let i = 0; i < filas; i++) {
            if (this.movimientos[i][0] !== null && 
                this.movimientos[i][0].jugador === this.movimientos[i][1].jugador && 
                this.movimientos[i][0].jugador === this.movimientos[i][2].jugador) {
                window.alert(`¡El jugador ${this.movimientos[i][0].jugador.nombre} ha ganado en la fila ${i + 1}!`);
                ganadorEncontrado = true;
            }
        }
    
        // Comprobar columnas
        for (let j = 0; j < columnas; j++) {
            if (this.movimientos[0][j] !== null && 
                this.movimientos[0][j].jugador === this.movimientos[1][j].jugador && 
                this.movimientos[0][j].jugador === this.movimientos[2][j].jugador) {
                window.alert(`¡El jugador ${this.movimientos[0][j].jugador.nombre} ha ganado en la columna ${j + 1}!`);
                ganadorEncontrado = true;
            }
        }
    
        // Comprobar diagonales
        if (this.movimientos[0][0] !== null && 
            this.movimientos[0][0].jugador === this.movimientos[1][1].jugador && 
            this.movimientos[0][0].jugador === this.movimientos[2][2].jugador) {
            window.alert(`¡El jugador ${this.movimientos[0][0].jugador.nombre} ha ganado en la diagonal principal!`);
            ganadorEncontrado = true;
        }
    
        if (this.movimientos[0][2] !== null && 
            this.movimientos[0][2].jugador === this.movimientos[1][1].jugador && 
            this.movimientos[0][2].jugador === this.movimientos[2][0].jugador) {
            window.alert(`¡El jugador ${this.movimientos[0][2].jugador.nombre} ha ganado en la diagonal secundaria!`);
            ganadorEncontrado = true;
        }
    
        // Si no hay ganador
        if (!ganadorEncontrado) {
            window.alert("¡Empate! No hay un ganador.");
        }
    }
    
    
    

    crearTablero() {
        let tablero = document.createElement("table");
        tablero.classList.add("table", "table-bordered", "mx-5", "mt-5", "mx-auto");
        tablero.style.borderCollapse = "collapse"; // Para que las celdas compartan borde

        for (let i = 0; i < this._filas; i++) {
            let fila = document.createElement("tr");
            fila.id = `F${i}`;

            for (let j = 0; j < this._columnas; j++) {
                let columna = document.createElement("td");
                columna.id = `F${i}C${j}`;
                columna.style.border = "1px solid black";
                columna.style.width = "50px"; // Tamaño de las celdas
                columna.style.height = "50px"; // Tamaño de las celdas
                columna.style.cursor = "pointer";
                columna.addEventListener("click", () => {
                    this.pintar(i, j);
                    this.registrarMovimiento({fila: i, columna: j, jugador: this.jugadorActual});
                    this.comprobar3enRaya(); // Comprobar 3 en raya después de cada movimiento
                });
                fila.appendChild(columna);
            }
            tablero.appendChild(fila);
        }
        document.body.appendChild(tablero);
    }
}
