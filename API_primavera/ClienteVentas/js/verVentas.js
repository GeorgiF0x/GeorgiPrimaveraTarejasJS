//ver ventas
console.log("funcona");

function fetchGetMarcas(url) {
    return new Promise((resolve, reject) => {
        const peticion = new XMLHttpRequest();
        const urlCompleta = `${url}/marcas`; 
        peticion.open('GET', urlCompleta);
        peticion.send();
        peticion.addEventListener('load', function () {
            resolve(JSON.parse(peticion.responseText)); 
        });
    });
}

function fetchGetConcesionariosPorMarca(url, idMarca) {
    return new Promise((resolve, reject) => {
        const peticion = new XMLHttpRequest();
        const urlCompleta = `${url}/concesionarios/marca/${idMarca}`; 
        peticion.open('GET', urlCompleta);
        peticion.send();
        peticion.addEventListener('load', function () {
            resolve(JSON.parse(peticion.responseText)); 
        });
    });
}
// console.log(document.getElementById('prueba').value);

document.addEventListener('DOMContentLoaded', () => {
    const url = 'http://127.0.0.1:3000';
    
    fetchGetMarcas(url)
        .then(marcas => {
            const selectMarcas = document.getElementById('marcaSelectVerVentas');
            selectMarcas.innerHTML = ''; 
            selectMarcas.innerHTML += '<option value="">Seleccione una marca...</option>';
            marcas.forEach(marca => {
                selectMarcas.innerHTML += `<option value="${marca.id}">${marca.nombre}</option>`;
            });
        }) 
        .catch(error => console.log(error));

    document.getElementById('verTodasVentasForm').addEventListener('submit', (event) => {
        event.preventDefault(); 
        
        const idMarca = document.getElementById('marcaSelectVerVentas').value;
        const idConcesionario = document.getElementById('concesionarioSelectVerVentas').value;

    });

    document.getElementById('marcaSelectVerVentas').addEventListener('change', () => {
     
        const idMarca = document.getElementById('marcaSelectVerVentas').value; 
        const selectConcesionarios = document.getElementById('concesionarioSelectVerVentas');
        
        // Cuando se selecciona la marca
        if (idMarca) { //si no tiene nada en value "" cuenta como false
            selectConcesionarios.disabled = false;
            
            fetchGetConcesionariosPorMarca(url, idMarca)
                .then(concesionarios => {
                   
                    selectConcesionarios.innerHTML = '';
                    selectConcesionarios.innerHTML += '<option value="">Seleccione un concesionario...</option>';
            
                    concesionarios.forEach(concesionario => {
                        selectConcesionarios.innerHTML += `<option value="${concesionario.id}">${concesionario.nombre}</option>`;
                    });
                })
                .catch(error => console.log(error));
        } else {

            selectConcesionarios.disabled = true;
            selectConcesionarios.innerHTML += '<option value="">Seleccione un concesionario...</option>';
        }
    });
});

// ver las centas

function fetchGetVentas(url, idMarca, idConcesionario) {
    const urlCompleta = `${url}/ventas/todasVentas/${idMarca}/${idConcesionario}`;
    return fetch(urlCompleta)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener las ventas');
            }
            return response.json();
        })
        .then(ventas => {
            return ventas;
        })
        .catch(error => {
            throw new Error('Error al obtener las ventas');
        });
}

let formVentas =document.getElementById("verTodasVentasForm");
formVentas.addEventListener('submit', (event) => {
    const url = 'http://127.0.0.1:3000';

    console.log(document.getElementById('marcaSelectVerVentas').value);
    console.log(document.getElementById('concesionarioSelectVerVentas').value);

    const idMarca = document.getElementById('marcaSelectVerVentas').value;
    const idConcesionario = document.getElementById('concesionarioSelectVerVentas').value;



    fetchGetVentas(url, idMarca, idConcesionario)
    .then(ventas => {

        console.log(ventas);
    
        const tablaVentas = document.getElementById('tablaVentas');
        tablaVentas.innerHTML = ''; 

        tablaVentas.innerHTML += `
            <table class="table table-striped mt-2 mb-5">
                <thead>
                    <tr>
                        <th>ID Venta</th>
                        <th>Cantidad</th>
                    </tr>
                </thead>
                <tbody id="tbodyVentas">
                    <!-- Aquí se llenarán dinámicamente los datos de las ventas -->
                </tbody>
            </table>
        `;
    

        const tbodyVentas = document.getElementById('tbodyVentas');
    
      
        ventas.forEach(venta => {
            const fila = `
                <tr>
                    <td>${venta.id}</td>
                    <td>${venta.Cantidad}</td>
                </tr>
            `;
            tbodyVentas.innerHTML += fila;
        });
    })
    .catch(error => {
        console.error('Error al obtener las ventas:', error);
    });

});




