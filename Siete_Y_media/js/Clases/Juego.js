import {Baraja } from "./Baraja.js";
import {Jugador } from "./Jugador.js";
import {Banca } from "./Banca.js";
import { funcionesExportadas } from "../funciones/funciones.js";

export class Juego {
  constructor(baraja, jugador1, banca, apuesta) {
    this.baraja = baraja;
    this.jugador1 = jugador1;
    this.banca = banca;
    this._apuesta = apuesta;
  }
  set apuesta(nuevaApuesta) {
    this._apuesta = nuevaApuesta;
  }

  repartirCartas() {
    this.jugador1.recibirCarta(this.baraja.sacarCarta());
    this.banca.recibirCarta(this.baraja.sacarCarta());

    const ulManoJugador = document.getElementById("manoJugador");

    this.jugador1.mostrarMano(ulManoJugador);

    const ulManoBanca = document.getElementById("manoBanca");
    // console.log(ulManoBanca);
    ulManoBanca.innerText = "Carta Oculta";
  }

  iniciarJuego() {
    // console.log(`se han repartido las cartas y se ha hecho la apuesta con valor ${this.apuesta}`);
    let elementoLi = document.createElement("li");
    elementoLi.innerText = `se han repartido las cartas haga su apuesta`;

 
    document.getElementById("listaPanel").appendChild(elementoLi);
    this.repartirCartas();
    // console.log(this.jugador1.mano);
  }

  jugador1PedirCarta() {

      // console.log(this.jugador1);
      const nuevaCarta = this.baraja.sacarCarta();
      this.jugador1.recibirCarta(nuevaCarta);
      const puntos=this.jugador1.calcularPuntuacion();
      if(puntos==7.5){
        this.jugador1Plantarse();
        //poner que ha ganado exactamente con 7.5 puntos
      }if (puntos>7.5) {
        this.jugador1Plantarse();
        //poner que SE HA PASADO
      } else {        
          let liPideCarta = document.createElement("li");
          liPideCarta.innerText = ` ${this.jugador1.nombre} ha peido carta y ha recibido la carta: ${nuevaCarta.valor} de ${nuevaCarta.palo}`;
          document.getElementById("listaPanel").appendChild(liPideCarta);
          console.log(
            ` ${this.jugador1.nombre} ha recibido la carta: ${nuevaCarta.valor} de ${nuevaCarta.palo}`
          );
      }
    }
  

  jugador1Plantarse() {
    this.juegaBanca();
  }
  mostrarResultado() {
    const puntuacionJugador1 = this.jugador1.calcularPuntuacion();
    const puntuacionBanca = this.banca.calcularPuntuacion();
    let mostrarResul = document.createElement("h2");
    if (puntuacionJugador1 === 7.5) {
        console.log(
            `El jugador ${this.jugador1.nombre} ha obtenido 7.5 exactos, gana y duplica la apuesta`
        );
        mostrarResul.innerText = `El jugador ${this.jugador1.nombre} ha obtenido 7.5 exactos, gana `;
        //acabar automaticamente la partida
        let contenedorBotones=document.getElementById("idPedirPlantar")
        contenedorBotones.innerHTML="";
        const botonNuevaPartida = document.createElement("Button");
        botonNuevaPartida.innerText="Jugar De Nuevo";
        botonNuevaPartida.addEventListener("click", () => {
           
            window.location.reload();
        });
        contenedorBotones.appendChild(botonNuevaPartida);
        funcionesExportadas.agregarElementoAlDOM("h3",`+${this._apuesta * 2}Puntos`,"")
        agregarElementoAlDOM("h1", "Panel", "idPanelJugador");
        if (!isNaN(this._apuesta) && !isNaN(parseInt(this.jugador1.puntosAcumuladosJugador))) {
            this.jugador1.puntosAcumuladosJugador = parseInt(this.jugador1.puntosAcumuladosJugador) + this._apuesta * 2;
        }

        console.log(this.jugador1.puntosAcumuladosJugador);
    } else if (puntuacionBanca === 7.5) {
        console.log(
            `La banca ${this.banca.nombre} ha obtenido 7.5 exactos, gana y duplica la apuesta`
        );
          mostrarResul.innerText = `La banca ha obtenido 7.5 exactos, La banca gana `;
          //acabar automaticamente la partida
          localStorage.setItem('jugador', JSON.stringify(this.jugador1));
          let contenedorBotones=document.getElementById("idPedirPlantar")
          contenedorBotones.innerHTML="";
          const botonNuevaPartida = document.createElement("Button");
          botonNuevaPartida.innerText="Jugar De Nuevo";
          botonNuevaPartida.addEventListener("click", () => {
             
              window.location.reload();
          });
        // if (!isNaN(this._apuesta) && !isNaN(parseInt(this.jugador1.puntosAcumuladosJugador))) {
        //   this.jugador1.puntosAcumuladosJugador = parseInt(this.jugador1.puntosAcumuladosJugador) - this._apuesta;
        // }
          contenedorBotones.appendChild(botonNuevaPartida);
        console.log(this.jugador1.puntosAcumuladosJugador);
    } else if (puntuacionJugador1 > 7.5) {
        console.log(
            `El jugador ${this.jugador1.nombre} se ha pasado de 7.5, gana La Banca`
        );
        mostrarResul.innerText = `El jugador ${this.jugador1.nombre} se ha pasado de 7.5, gana La Banca`;
        //acabar automaticamente la partida
        localStorage.setItem('jugador', JSON.stringify(this.jugador1));
        let contenedorBotones=document.getElementById("idPedirPlantar")
        contenedorBotones.innerHTML="";
        const botonNuevaPartida = document.createElement("Button");
        botonNuevaPartida.innerText="Jugar De Nuevo";
        botonNuevaPartida.addEventListener("click", () => {
           
            window.location.reload();
        });
        contenedorBotones.appendChild(botonNuevaPartida);
        console.log(this.jugador1.puntosAcumuladosJugador);
    } else if (puntuacionBanca > 7.5) {
        console.log(
            `La banca se ha pasado de 7.5, El jugador ${this.jugador1.nombre} gana`
        );
        funcionesExportadas.agregarElementoAlDOM("h3","+"+this._apuesta +" Puntos","idPanelJugador");
        mostrarResul.innerText = `La banca se ha pasado de 7.5, El jugador ${this.jugador1.nombre} gana`;
        if (!isNaN(this._apuesta) && !isNaN(parseInt(this.jugador1.puntosAcumuladosJugador))) {
            this.jugador1.puntosAcumuladosJugador = parseInt(this.jugador1.puntosAcumuladosJugador) + this._apuesta;
        }
        console.log(this.jugador1.puntosAcumuladosJugador);
    } else if (puntuacionJugador1 > puntuacionBanca) {
        console.log(`El jugador ${this.jugador1.nombre} gana`);
        mostrarResul.innerText = `El ${this.jugador1.nombre} tiene más puntos que la banca, ${this.jugador1.nombre} gana`;
        funcionesExportadas.agregarElementoAlDOM("h3","+"+this._apuesta +"Puntos","idPanelJugador");
        if (!isNaN(this._apuesta) && !isNaN(parseInt(this.jugador1.puntosAcumuladosJugador))) {
            this.jugador1.puntosAcumuladosJugador = parseInt(this.jugador1.puntosAcumuladosJugador) + this._apuesta;
        }
        console.log(this.jugador1.puntosAcumuladosJugador);
    } else if (puntuacionJugador1 < puntuacionBanca) {
        console.log(`La banca gana`);
        mostrarResul.innerText = `La banca tiene mas puntos que el jugador,la Banca gana`;
        // if (!isNaN(this._apuesta) && !isNaN(parseInt(this.jugador1.puntosAcumuladosJugador))) {
        //   this.jugador1.puntosAcumuladosJugador = parseInt(this.jugador1.puntosAcumuladosJugador) - this._apuesta;
        // }
        console.log(this.jugador1.puntosAcumuladosJugador);
    } else {
        console.log(`Empate`);
        mostrarResul.innerText = `Empate`;
        funcionesExportadas.agregarElementoAlDOM("h3","no pierdes ni ganas puntos","idPanelJugador");
        console.log(this.jugador1.puntosAcumuladosJugador);
    }
    document.getElementById("listaPanel").appendChild(mostrarResul);
}






  juegaBanca() {
    // La banca pide solo 1 carta
    const nuevaCarta = this.baraja.sacarCarta();
    this.banca.recibirCarta(nuevaCarta);
    console.log(
      `La banca ha recibido la carta: ${nuevaCarta.valor} de ${nuevaCarta.palo}`
    );
    let liBancaPideCarta = document.createElement("li");
    liBancaPideCarta.innerText = `La banca ha recibido una carta`;
    document.getElementById("listaPanel").appendChild(liBancaPideCarta);
    this.mostrarResultado();
    //mostrar las cartas boca arriba, de la banca
    const manoBanca = document.getElementById("manoBanca");
    manoBanca.innerHTML = "";
    this.banca.mano.forEach((carta) => {
      carta.imprimirCarta("manoBanca");
    });
  }
}