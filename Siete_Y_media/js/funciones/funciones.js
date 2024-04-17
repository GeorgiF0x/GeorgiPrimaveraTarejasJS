

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
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
    getRandomInt,
    agregarElementoAlDOM,
  }