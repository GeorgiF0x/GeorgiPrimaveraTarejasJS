// Función para hacer peticiones GET
function fetchGet(url, id = '') {
    return new Promise((resolve, reject) => {
        const peticion = new XMLHttpRequest();
        let urlCompleta; 
        if (id) { 
            urlCompleta = `${url}/${id}`;
        } else {
            urlCompleta = url;
        }
        peticion.open('GET', urlCompleta);
        peticion.send();
        peticion.addEventListener('load', function () {
            resolve(peticion.responseText);
        });
    });
}

document.getElementById('getConcesionario').addEventListener('submit', (event) => {
    event.preventDefault();
    const url = 'http://127.0.0.1:3000/concesionarios';
    const idConcesionario = document.getElementById('id-concesionario').value;
    fetchGet(url, idConcesionario)
        .then(datosCrudos => {
            const datosObjeto = JSON.parse(datosCrudos);
            document.getElementById('nombre-concesionario').value = datosObjeto.nombre;
            document.getElementById('marca-id').value = datosObjeto.marcaId;

            document.getElementById('nombre-concesionario-original').value = datosObjeto.nombre;
            document.getElementById('marca-id-original').value = datosObjeto.marcaId;
            document.getElementById('id-concesionario').value = datosObjeto.id;
        })
        .catch(error => {
            document.getElementById('mensaje-modificacion-patch').style.color="red";
            const elementoError = document.getElementById('mensaje-modificacion');
            funcionesExportadas.gestionErrores(error, elementoError);          
            console.log(error)
        });
});

// PARA VER TODOS 
document.getElementById('verTodos').addEventListener('click', () => {
    const url = 'http://127.0.0.1:3000/concesionarios';
    fetchGet(url)
        .then(datosCrudos => {
            const datosObjeto = JSON.parse(datosCrudos);
            const tablaConcesionarios = document.getElementById('tabla-concesionarios');
            tablaConcesionarios.innerHTML = ''; 
            // encabezado de la tabla
            tablaConcesionarios.innerHTML += `
                <thead class='mx-5'>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Marca ID</th>
                        <th>Borrar</th>
                    </tr>
                </thead>
            `;
            //cuerpo de la tabla
            tablaConcesionarios.innerHTML += '<tbody class="mx-2">';
            datosObjeto.forEach(concesionario => {
                // fila para cada concesionario
                tablaConcesionarios.innerHTML += `
                <tr class="mt-1 mb-1">
                    <td>${concesionario.id}</td>
                    <td>${concesionario.nombre}</td>
                    <td>${concesionario.marcaId}</td>
                    <td><button class="btn btn-danger btn-sm eliminar-btn">Eliminar</button></td>
                </tr>
                `;
            });
            tablaConcesionarios.innerHTML += '</tbody>';
            document.querySelectorAll('.eliminar-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const idConcesionario = btn.closest('tr').querySelector('td:first-child').innerText;
                    eliminarConcesionario(idConcesionario);
                });
            });
        }) 
        .catch(error => console.log(error));
}); 

//delete 
function fetchDelete(url, id) {
    return fetch(`${url}/${id}`, {
        method: 'DELETE',
    });
}

function eliminarConcesionario(idConcesionario) {
    const url = 'http://127.0.0.1:3000/concesionarios';
    fetchDelete(url, idConcesionario)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al eliminar el concesionario: ' + response.status);
            }
            return response.json();
        })
        .then(datos => {
            document.getElementById('mensaje-eliminacion').innerText = 'El concesionario ha sido eliminado correctamente.';
            // para recargar la tabla automáticamente
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
    return fetch(`${url}/patch/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    });
}

document.getElementById('modificarConcesionarioPatch').addEventListener('submit', (event) => {
    event.preventDefault();

    const url = 'http://127.0.0.1:3000/concesionarios';
    const idConcesionario = document.getElementById('id-concesionario').value;
    let nombreConcesionario = document.getElementById('nombre-concesionario').value;
    let marcaId = document.getElementById('marca-id').value;

    if (nombreConcesionario === '') {
        nombreConcesionario = document.getElementById('nombre-concesionario-original').value;
    }

    if (marcaId === '') {
        marcaId = document.getElementById('marca-id-original').value;
    }

    const datosConcesionario = {
        nombre: nombreConcesionario,
        marcaId: marcaId
    };

    fetchPatch(url, idConcesionario, datosConcesionario)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al modificar el concesionario.');
            }
            return response.json();
        })
        .then(datos => {
            document.getElementById('mensaje-modificacion-patch').innerText = 'El concesionario ha sido modificado correctamente.';
            document.getElementById('verTodos').click(); 
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('mensaje-modificacion-patch').innerText = 'Error al modificar el concesionario.';
        });
});
