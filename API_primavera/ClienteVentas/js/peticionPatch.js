
// Función para hacer peticiones GET
function fetchGet(url, id = '') {
    return new Promise((resolve, reject) => {
        const peticion = new XMLHttpRequest();
        let urlCompleta; 
        if (id) { // si solo le mando url que busque /coches
            urlCompleta = `${url}/marcas/${id}`;
        } else {
            urlCompleta = url + '/marcas';
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
            const datosObjeto = JSON.parse(datosCrudos);[0]
            document.getElementById('nombre-coche').value = datosObjeto[0].nombre;
            document.getElementById('cantidad-coche').value = datosObjeto[0].cantidad;

            document.getElementById('nombre-coche-original').value = datosObjeto[0].nombre;
            document.getElementById('cantidad-coche-original').value = datosObjeto[0].cantidad.toLocaleString("de-DE");
            document.getElementById('id-coche').value = datosObjeto[0].id;
        })
        .catch(error => {
            document.getElementById('mensaje-modificacion-patch').style.color="red";
            const elementoError = document.getElementById('mensaje-modificacion');
            funcionesExportadas.gestionErrores(error, elementoError);          
            console.log(error)
        })

});


// PARA VER TODOS 
document.getElementById('verTodos').addEventListener('click', () => {
    const url = 'http://127.0.0.1:3000';
    fetchGet(url)
        .then(datosCrudos => {
            const datosObjeto = JSON.parse(datosCrudos);
            const tablaCoches = document.getElementById('tabla-coches');
            tablaCoches.innerHTML = ''; 
            // encabezado de la tabla
            tablaCoches.innerHTML += `
                <thead class='mx-5'>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Cantidad Vendida</th>
                        <th>Borrar</th>
                    </tr>
                </thead>
            `;
            //cuerpo de la tabla
            tablaCoches.innerHTML += '<tbody class="mx-2">';
            datosObjeto.forEach(coche => {
                // fila para cada coche
                tablaCoches.innerHTML += `
                <tr class="mt-1 mb-1">
                    <td>${coche.id}</td>
                    <td>${coche.nombre}</td>
                    <td>${coche.cantidad.toLocaleString("de-DE")}</td>
                    <td><button class="btn btn-danger btn-sm eliminar-btn">Eliminar</button></td>
                </tr>
                `;
            });
            tablaCoches.innerHTML += '</tbody>';
            document.querySelectorAll('.eliminar-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const idCoche = btn.closest('tr').querySelector('td:first-child').innerText;
                    eliminarCoche(idCoche);
                });
            });
        }) 
        .catch(error => console.log(error));
}); 


//delete 
function fetchDelete(url, id) {
    return fetch(`${url}/marcas/${id}`, {
        method: 'DELETE',
    });
}

function eliminarCoche(idCoche) {
    const url = 'http://127.0.0.1:3000';
    fetchDelete(url, idCoche)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al eliminar el coche: ' + response.status);
            }
            return response.json();
        })
        .then(datos => {
            document.getElementById('mensaje-eliminacion').innerText = 'El coche ha sido eliminado correctamente.';
            // para recargar la tabla automaticamente
            document.getElementById('verTodos').click(); 
        })
        .catch(error => {
            console.error(error);
            const elementoError = document.getElementById('mensaje-eliminacion');
            funcionesExportadas.gestionErrores(error, elementoError);
        });
}


//PATCH
function fetchPatch(url, id, datos) {
    return fetch(`${url}/marcas/patch/${id}`, {
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
    const idCoche = document.getElementById('id-coche').value;
    let nombreCoche = document.getElementById('nombre-coche').value;
    let cantidadCoche = document.getElementById('cantidad-coche').value;

    if (nombreCoche === '') {
        nombreCoche = document.getElementById('nombre-coche-original').value;
    }

    if (cantidadCoche === '') {
        cantidadCoche = document.getElementById('cantidad-coche-original').value;
    }

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
            document.getElementById('verTodos').click(); 
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('mensaje-modificacion-patch').innerText = 'Error al modificar el coche.';
        });
});

