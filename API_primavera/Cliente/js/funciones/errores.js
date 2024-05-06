

function gestionErrores(error,campoError){
    console.error(error);
    console.log(error.message.slice(-3));
    switch (error.message.slice(-3)) {
        case "400":
            campoError.innerText="error 400 error por parte del cliente";
            break;
        case "401":
            campoError.innerText="error 401 El cliente no está autorizado para acceder al recurso solicitado";
            break;
        case "403":
            campoError.innerText="error 403 El cliente no tiene permiso para realizar esa peticion";
            break;
        case "404":
            campoError.innerText="error 404 El servidor no puede encontrar el recurso solicitado";
            break;
        case "405":
            campoError.innerText="error 405  El método de la peticion utilizado no esta autorizado en el servidor";
            break;
        case "500":
            campoError.innerText="error 500 error interno del servidor";
        default:
            break;
    }
}



function agregarElementoAlDOM(tipoElemento, contenido, idContenedor) {
    const contenedor = document.getElementById(idContenedor);
    if (contenedor) {
        const nuevoElemento = document.createElement(tipoElemento);
        nuevoElemento.textContent = contenido;
        contenedor.appendChild(nuevoElemento);
    } else {
        console.error("No existe ese elemento con ese id");
    }
  }

export const funcionesExportadas={
    gestionErrores,
    agregarElementoAlDOM
}