// Función para hacer peticiones GET
function fetchGet(url, id = '') {
    return new Promise((resolve, reject) => {
        const peticion = new XMLHttpRequest();
        let urlCompleta; 
        if (id) { // si solo le mando url que busque /coches
            urlCompleta = `${url}/${id}`;
        } else {
            urlCompleta = url;
        }
        peticion.open('GET', urlCompleta);
        peticion.send();
        peticion.addEventListener('load', function () {
            resolve(peticion.responseText);
        });
    })
}

document.getElementById('getConcesionario').addEventListener('submit', (event) => {
    event.preventDefault();
    const url = 'http://127.0.0.1:3000/concesionarios';
    const idConcesionario = document.getElementById('id-concesionario').value;
    fetchGet(url, idConcesionario)
        .then(datosCrudos => {
            const datosObjeto = JSON.parse(datosCrudos);
            document.getElementById('p1').style.color="black";
            document.getElementById('p1').innerText=`ID ${datosObjeto.id}, Nombre: ${datosObjeto.nombre}, Marca ID: ${datosObjeto.marcaId}`;            
        })
        .catch(error => {
            document.getElementById('p1').style.color="red";
            document.getElementById('p1').innerText=`El id indicado no existe`;            
            console.log(error)
        })

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
                    </tr>
                </thead>
            `;
            //cuerpo de la tabla
            tablaConcesionarios.innerHTML += '<tbody class="mx-2">';
            datosObjeto.forEach(concesionario => {
                // fila para cada concesionario
                tablaConcesionarios.innerHTML += `
                <tr>
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
            // para recargar la tabla automaticamente
            document.getElementById('verTodos').click(); 
        })
        .catch(error => {
            console.error(error);
            const elementoError = document.getElementById('mensaje-eliminacion');
            funcionesExportadas.gestionErrores(error, elementoError);
        });
}

