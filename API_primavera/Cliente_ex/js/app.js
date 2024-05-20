



function iniciar(){


    let contenedor=document.getElementById("desordenado");


    const ciudades=[
        'Zaragoza', 'Barcelona',
        'Bilbao', 'Granada',
        'Madrid', 'Alicante',
        'Málaga', 'Valencia',
        'Sevilla', 'Murcia'
    ]

    
    const ciudadesAleatorio=[...ciudades].sort(()=>Math.random()-0.5);
    const ciudadesAlfabetico=ciudades.sort();
    
    console.log(ciudades);
    console.log(ciudadesAleatorio);
    console.log(ciudadesAlfabetico);


    let mostrarOrdenado = true;

    // Función para actualizar el contenido del elemento cada segundo
    setInterval(() => {
        // Vaciar el contenido del contenedor
        contenedor.innerText = "";

        // Si mostrarOrdenado es true, mostrar ciudades en orden alfabético
        if (mostrarOrdenado) {
            ciudadesAlfabetico.forEach(element => {
                contenedor.innerText += `${element}, `;
            });
        } else {
            ciudadesAleatorio.forEach(element => {
                contenedor.innerText += `${element}, `;
            });
        }

        mostrarOrdenado = !mostrarOrdenado; // Alternar entre ordenado y desordenado

    }, 1000); 
    

}

window.addEventListener("load",iniciar);
    
const ciudades2 = [
    { nombre: 'Zaragoza', poblacion: 666058 },
    { nombre: 'Barcelona', poblacion: 1620343 },
    { nombre: 'Bilbao', poblacion: 345821 },
    { nombre: 'Granada', poblacion: 232208 },
    { nombre: 'Madrid', poblacion: 3348536 },
    { nombre: 'Alicante', poblacion: 334757 },
    { nombre: 'Málaga', poblacion: 571026 },
    { nombre: 'Valencia', poblacion: 794288 },
    { nombre: 'Sevilla', poblacion: 688711 },
    { nombre: 'Murcia', poblacion: 461146 }
];
const ciudadesPoblacion = ciudades2.sort((ciudad1, ciudad2) => ciudad2.poblacion - ciudad1.poblacion);