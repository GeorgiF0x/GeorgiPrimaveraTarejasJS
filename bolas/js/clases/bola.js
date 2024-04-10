import { funcionesExportadas } from "../funciones/funciones.js";


export class Bola{
    constructor(){
        this.radio=funcionesExportadas.getRandomInt(20,200);
        this.colorR=funcionesExportadas.getRandomInt(0,255);
        this.colorG=funcionesExportadas.getRandomInt(0,255);
        this.colorB=funcionesExportadas.getRandomInt(0,255);
        this.posX=funcionesExportadas.getRandomInt(0, document.body.offsetWidth -this.radio);
        this.posY=funcionesExportadas.getRandomInt(0,document.body.offsetHeight+this.radio);
        this.velocidadVertical = funcionesExportadas.getRandomInt(-10, 11); 
        this.velocidadHorizontal = funcionesExportadas.getRandomInt(-10, 11); 
        this.arrayBolas=[];

    }

    dibujar() {
        let bola = document.createElement('DIV');
        bola.classList.add("bola");
        bola.style.height = `${this.radio}px`;
        bola.style.backgroundColor = `rgb(${this.colorR},${this.colorG},${this.colorB})`;
        bola.style.width = `${this.radio}px`;
        bola.style.left = `${this.posX}px`;
        bola.style.top = `${this.posY}px`; 
        bola.style.borderRadius = `${50}%`;
        document.body.appendChild(bola);
        this.arrayBolas.push(bola);
    }
    





    avanzar() {
        this.posY += this.velocidadVertical;
        this.posX += this.velocidadHorizontal;
        this.dibujar();
    }

    detectarColisionParedes(){
        // console.log("alto "+window.innerHeight);
        // console.log("ancho "+window.innerWidth);
        // console.log("ejeY "+this.posY,"ejeX "+this.posX);
        if(this.posY+this.radio*2>=window.innerHeight||this.posY<0){
            this.velocidadVertical= -this.velocidadVertical;
        }

        if(this.posX<0||this.posX+this.radio*2>=window.innerWidth){
            this.velocidadHorizontal= -this.velocidadHorizontal;
        }

    }

    detectarColisionesConBolas() {
        this.arrayBolas.forEach(element => {
            if (this !== element) { 
                const diffX = this.posX - element.posX;
                const diffY = this.posY - element.posY;
                const distanciaCentros = Math.sqrt(diffX * diffX + diffY * diffY);
                if (distanciaCentros < this.radio + element.radio) {
                    this.velocidadVertical = -this.velocidadVertical;
                    this.velocidadHorizontal = -this.velocidadHorizontal;
                }
            }
        });
    }
    
    
    
    
}








