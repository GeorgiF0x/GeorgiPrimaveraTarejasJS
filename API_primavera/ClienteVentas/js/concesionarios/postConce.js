// Función para hacer peticiones GET
function fetchGet(url, id = '') {
    return new Promise((resolve, reject) => {
        const peticion = new XMLHttpRequest();
        let urlCompleta; 
        if (id) {
            urlCompleta = `${url}/concesionarios/${id}`; 
        } else {
            urlCompleta = `${url}/concesionarios`; 
        }
        peticion.open('GET', urlCompleta);
        peticion.send();
        peticion.addEventListener('load', function () {
            resolve(peticion.responseText);
        });
    });
}

// PARA VER TODOS 
document.getElementById('verTodos').addEventListener('click', () => {
    const url = 'http://127.0.0.1:3000';
    fetchGet(url)
        .then(datosCrudos => {
            const datosObjeto = JSON.parse(datosCrudos);
            const tablaConcesionarios = document.getElementById('tabla-concesionarios'); 
            tablaConcesionarios.innerHTML = ''; 
            tablaConcesionarios.innerHTML += `
                <thead class='mx-5'>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Marca ID</th> <!-- Cambio en el encabezado -->
                        <th>Borrar</th>
                    </tr>
                </thead>
            `;
            tablaConcesionarios.innerHTML += '<tbody class="mx-2">';
            datosObjeto.forEach(concesionario => {
                tablaConcesionarios.innerHTML += `
                <tr class="mt-1 mb-1">
                    <td>${concesionario.id}</td>
                    <td>${concesionario.nombre}</td>
                    <td>${concesionario.marcaId}</td> <!-- Cambio en los datos mostrados -->
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

// DELETE 
function fetchDelete(url, id) {
    return fetch(`${url}/concesionarios/${id}`, {
        method: 'DELETE',
    });
}

function eliminarConcesionario(idConcesionario) {
    const url = 'http://127.0.0.1:3000';
    fetchDelete(url, idConcesionario)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al eliminar el concesionario: ' + response.status);
            }
            return response.json();
        })
        .then(datos => {
            document.getElementById('mensaje-eliminacion').innerText = 'El concesionario ha sido eliminado correctamente.';
            document.getElementById('verTodos').click(); 
        })
        .catch(error => {
            console.error(error);
            const elementoError = document.getElementById('mensaje-eliminacion');
            funcionesExportadas.gestionErrores(error, elementoError);
        });
}

// POST 
function fetchPost(url, datos) {
    return fetch(`${url}/concesionarios`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    });
}

document.getElementById('agregarConcesionario').addEventListener('submit', (event) => {
    event.preventDefault();

    const url = 'http://127.0.0.1:3000';
    const nombreConcesionario = document.getElementById('nombre-concesionario-agregar').value;
    const marcaId = document.getElementById('marca-id-agregar').value;

    const datosConcesionario = {
        nombre: nombreConcesionario,
        marcaId: marcaId
    };

    fetchPost(url, datosConcesionario)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al agregar el concesionario.');
            }
            return response.json();
        })
        .then(datos => {
            document.getElementById('mensaje-agregar').innerText = 'El concesionario ha sido agregado correctamente.';
            document.getElementById('verTodos').click(); 
        })
        .catch(error => {
            console.error('Error:', error);
            const elementoError = document.getElementById('mensaje-agregar');
            funcionesExportadas.gestionErrores(error, elementoError);
        });
});
