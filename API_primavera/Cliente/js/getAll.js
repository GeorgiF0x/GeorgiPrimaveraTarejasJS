import { funcionesExportadas } from "./funciones/errores.js";
// Función para hacer peticiones GET
function fetchGet(url, id = '') {
    return new Promise((resolve, reject) => {
        const peticion = new XMLHttpRequest();
        let urlCompleta; 
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
            document.getElementById('p1').innerText=`El id indicado no existe`;            
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
                    </tr>
                </thead>
            `;
            //cuerpo de la tabla
            tablaCoches.innerHTML += '<tbody class="mx-2">';
            datosObjeto.forEach(coche => {
                // fila para cada coche
                tablaCoches.innerHTML += `
                <tr>
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
    return fetch(`${url}/coches/${id}`, {
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



