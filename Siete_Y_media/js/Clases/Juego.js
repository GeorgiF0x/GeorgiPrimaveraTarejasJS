import {Baraja } from "./Baraja.js";
import {Jugador } from "./Jugador.js";
import {Banca } from "./Banca.js";

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
    console.log(ulManoJugador);
    this.jugador1.mostrarMano(ulManoJugador);

    const ulManoBanca = document.getElementById("manoBanca");
    console.log(ulManoBanca);
    ulManoBanca.innerText = "Carta Oculta";
  }

  iniciarJuego() {
    // console.log(`se han repartido las cartas y se ha hecho la apuesta con valor ${this.apuesta}`);
    let elementoLi = document.createElement("li");
    elementoLi.innerText = `se han repartido las cartas`;

    console.log(document.getElementById("listaPanel"));
    document.getElementById("listaPanel").appendChild(elementoLi);
    this.repartirCartas();
    // console.log(this.jugador1.mano);
    console.log("PUNTOS*****" + this.jugador1.calcularPuntuacion());
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
      this.jugador1.puntosAcumuladosJugador(this.apuesta+this.jugador1.getPuntosAcumuladosJugador*2);
      console.log(this.jugador1.getPuntosAcumuladosJugador());
      
    }else if(puntuacionBanca==7.5){
      console.log(
        `La banca ${this.banca.nombre} ha obtenido 7.5 exactos, gana y duplica la apuesta`
      );
      console.log(this.jugador1.getPuntosAcumuladosJugador());
    }
     else if (puntuacionJugador1 > 7.5) {
      console.log(
        `El jugador ${this.jugador1.nombre} se ha pasado de 7.5, gana La Banca`
      );
      mostrarResul.innerText = `El jugador ${this.jugador1.nombre} se ha pasado de 7.5, gana La Banca`;
      console.log(this.jugador1.getPuntosAcumuladosJugador());
    } else if (puntuacionBanca > 7.5) {
      console.log(
        `La banca se ha pasado de 7.5, El jugador ${this.jugador1.nombre} gana`
      );
      mostrarResul.innerText = `La banca se ha pasado de 7.5, El jugador ${this.jugador1.nombre} gana`;
      this.jugador1.puntosAcumuladosJugador(this.apuesta+this.jugador1.getPuntosAcumuladosJugador());
      console.log(this.jugador1.getPuntosAcumuladosJugador());
    } else if (puntuacionJugador1 > puntuacionBanca) {
      console.log(`El jugador ${this.jugador1.nombre} gana`);
      mostrarResul.innerText = `El ${this.jugador1.nombre} tiene más puntos que la banca, ${this.jugador1.nombre} gana`;
      this.jugador1.puntosAcumuladosJugador(this.apuesta+this.jugador1.getPuntosAcumuladosJugador());
      console.log(this.jugador1.getPuntosAcumuladosJugador());
      console.log(this.jugador1.getPuntosAcumuladosJugador());
    } else if (puntuacionJugador1 < puntuacionBanca) {
      console.log(`La banca gana`);
      mostrarResul.innerText = `La banca tiene mas puntos que el jugador,la Banca gana`;
      console.log(this.jugador1.getPuntosAcumuladosJugador());
    } else {
      console.log(`Empate`);
      mostrarResul.innerText = `Empate`;
      console.log(this.jugador1.getPuntosAcumuladosJugador());
    }
    document.getElementById("IdPanel").appendChild(mostrarResul);
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