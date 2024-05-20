console.log("funciona");
import { Jugador } from "./clases/jugador.js";
import { Tablero } from "./clases/tablero.js";


document.getElementById("start").addEventListener("click",iniciar);

function iniciar(event){
    event.preventDefault();
    let jugador1Nombre=document.getElementById("playerName1").value;
    let jugador1Signo=document.getElementById("playerToken1").value;
    
    let jugador2Nombre=document.getElementById("playerName2").value;
    let jugador2Signo=document.getElementById("playerToken2").value;
    
    let jugador1 = new Jugador(jugador1Nombre, jugador1Signo);
    let jugador2 = new Jugador(jugador2Nombre, jugador2Signo);
    
    let tablero = new Tablero(jugador1,jugador2);
    console.log(tablero.jugadorActual);
    document.getElementById("playerForm").remove();
}
