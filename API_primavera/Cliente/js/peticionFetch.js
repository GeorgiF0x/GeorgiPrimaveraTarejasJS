import { funcionesExportadas } from "./funciones/errores.js";
// Función para hacer peticiones GET
function fetchGet(url, id = '') {
    return new Promise((resolve, reject) => {
        const peticion = new XMLHttpRequest();
        if (id) { // si solo le mando url que busque /coches
            urlCompleta = `${url}/coches/${id}`;
        } else {
            urlCompleta = url + '/coches';
        }
        peticion.open('GET', urlCompleta);
        peticion.send();
        peticion.addEventListener('load', function () {
            resolve(peticion.responseText);
        });
    })
}
document.getElementById('getCoche').addEventListener('submit', (event) => {
    event.preventDefault();
    const url = 'http://127.0.0.1:3000';
    const idCoche = document.getElementById('id-coche').value;
    fetchGet(url, idCoche)
        .then(datosCrudos => {
            const datosObjeto = JSON.parse(datosCrudos);
            document.getElementById('p1').style.color="black";
            document.getElementById('p1').innerText=`ID ${datosObjeto[0].id}, Nombre: ${datosObjeto[0].nombre}, Cantidad Vendida: ${datosObjeto[0].cantidad.toLocaleString("de-DE")}`;            
        })
        .catch(error => {
            document.getElementById('p1').style.color="red";
            const elementoError=document.getElementById('p1');
            funcionesExportadas.gestionErrores(error,elementoError);           
            console.log(error)
        })

});


// PARA VER TODOS 
document.getElementById('verTodos').addEventListener('click', () => {
    const url = 'http://127.0.0.1:3000';
    fetchGet(url)
        .then(datosCrudos => {
            const datosObjeto = JSON.parse(datosCrudos);
            const listaCoches = document.getElementById('lista-coches');
            listaCoches.innerHTML = ''; 
            datosObjeto.forEach(coche => {
                const listItem = document.createElement('li');
                listItem.textContent = `ID ${coche.id}, Nombre: ${coche.nombre}, Cantidad Vendida: ${coche.cantidad.toLocaleString("de-DE")}`;
                listItem.classList.add('list-group-item');
                listaCoches.appendChild(listItem);
            });
        })
        .catch(error => console.log(error));
});



//PUT
function fetchPut(url, id, datos) {
    return fetch(`${url}/coches/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    });
}


document.getElementById('modificarCoche').addEventListener('submit', (event) => {
    event.preventDefault();
    const url = 'http://127.0.0.1:3000';
    const idCoche = document.getElementById('id-coche-modificar').value;
    const nombreCoche = document.getElementById('nombre-coche').value;
    const cantidadCoche = document.getElementById('cantidad-coche').value;

    const datosCoche = {
        nombre: nombreCoche,
        cantidad: cantidadCoche
    };

    fetchPut(url, idCoche, datosCoche)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al modificar el coche.');
            }
            return response.json();
        })
        .then(datos => {
            document.getElementById('mensaje-modificacion').innerText = 'El coche ha sido modificado deforma correcta.';
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('mensaje-modificacion').innerText = 'Error al modificar el coche.';
        });
});

//PATCH
function fetchPatch(url, id, datos) {
    return fetch(`${url}/coches/patch/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    });
}


document.getElementById('modificarCochePatch').addEventListener('submit', (event) => {
    event.preventDefault();

    const url = 'http://127.0.0.1:3000';
    const idCoche = document.getElementById('id-coche-modificar-patch').value;
    const nombreCoche = document.getElementById('nombre-coche-patch').value;
    const cantidadCoche = document.getElementById('cantidad-coche-patch').value;

    const datosCoche = {
        nombre: nombreCoche,
        cantidad: cantidadCoche
    };

    fetchPatch(url, idCoche, datosCoche)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al modificar el coche.');
            }
            return response.json();
        })
        .then(datos => {
            document.getElementById('mensaje-modificacion-patch').innerText = 'El coche ha sido modificado correctamente.';
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('mensaje-modificacion-patch').innerText = 'Error al modificar el coche.';
        });
});

//delete 
function fetchDelete(url, id) {
    return fetch(`${url}/coches/${id}`, {
        method: 'DELETE',
    });
}

document.getElementById('eliminarCoche').addEventListener('submit', (event) => {
    event.preventDefault();

    const url = 'http://127.0.0.1:3000';
    const idCoche = document.getElementById('id-coche-eliminar').value;

    fetchDelete(url, idCoche)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al eliminar el coche: ' + response.status);
            }
            return response.json();
        })
        .then(datos => {
            document.getElementById('mensaje-eliminacion').innerText = 'El coche ha sido eliminado correctamente.';
        })
        .catch(error => {
            console.error(error);
            const elementoError=document.getElementById('mensaje-eliminacion');
            funcionesExportadas.gestionErrores(error,elementoError);
        });
});


//POST 
function fetchPost(url, datos) {
    return fetch(`${url}/coches`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    });
}

document.getElementById('agregarCoche').addEventListener('submit', (event) => {
    event.preventDefault();

    const url = 'http://127.0.0.1:3000';
    const nombreCoche = document.getElementById('nombre-coche-agregar').value;
    const cantidadCoche = document.getElementById('cantidad-coche-agregar').value;

    const datosCoche = {
        nombre: nombreCoche,
        cantidad: cantidadCoche
    };

    fetchPost(url, datosCoche)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al agregar el coche.');
            }
            return response.json();
        })
        .then(datos => {
            document.getElementById('mensaje-agregar').innerText = 'El coche ha sido agregado correctamente.';
        })
        .catch(error => {
            console.error('Error:', error);
            const elementoError=document.getElementById('mensaje-agregar');
            funcionesExportadas.gestionErrores(error,elementoError);
        });
});