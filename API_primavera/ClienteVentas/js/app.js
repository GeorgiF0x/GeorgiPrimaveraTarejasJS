function fetchGetMarcas(url) {
    return new Promise((resolve, reject) => {
        const peticion = new XMLHttpRequest();
        const urlCompleta = `${url}/marcas`; 
        peticion.open('GET', urlCompleta);
        peticion.send();
        peticion.addEventListener('load', function () {
            resolve(JSON.parse(peticion.responseText)); 
        });
    })
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
    })
}



document.addEventListener('DOMContentLoaded', () => {
    const url = 'http://127.0.0.1:3000';
    fetchGetMarcas(url)
        .then(marcas => {
            const selectMarcas = document.getElementById('marcaSelect');
            selectMarcas.innerHTML = ''; //borrar para que no acumule 
            selectMarcas.innerHTML += '<option value="">Seleccione una marca...</option>';
            marcas.forEach(marca => {
                selectMarcas.innerHTML += `<option value="${marca.id}">${marca.nombre}</option>`;
            });
        }) 
        .catch(error => console.log(error));

        document.getElementById('marcaSelect').addEventListener('change', () => {
            const idMarca =document.getElementById('marcaSelect').value; 
            const selectConcesionarios=document.getElementById('concesionarioSelect');
            // cuando ya se elige la marca
            if (idMarca) { // si no tiene nada el value 
                selectConcesionarios.disabled = false;
                
                fetchGetConcesionariosPorMarca(url, idMarca)
                    .then(concesionarios => {
                        //para que al recargar no se vea la que se cogio antes
                        selectConcesionarios.innerHTML = '';
                        selectConcesionarios.innerHTML += '<option value="">Seleccione un concesionario...</option>';
                        
                        console.log(concesionarios);
                        concesionarios.forEach(concesionario => {
                            
                            selectConcesionarios.innerHTML += `<option value="${concesionario.id}">${concesionario.nombre}</option>`;
                        });
                    })
                    .catch(error => console.log(error));
            } else {
                //si le vuelve a dar a la primera opcion 
                selectConcesionarios.disabled = true;
                selectConcesionarios.innerHTML += '<option value="">Seleccione un concesionario...</option>';
            }
        });
});

//nueva venta
function realizarVenta(data) {
    return fetch('http://127.0.0.1:3000/ventas', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}


const ventaForm = document.getElementById('ventaForm');
    ventaForm.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log(document.getElementById('marcaSelect').value);
        console.log(document.getElementById('concesionarioSelect').value);
        console.log(document.getElementById('cantidadInput').value);
    
        const idMarca = document.getElementById('marcaSelect').value;
        const idConcesionario = document.getElementById('concesionarioSelect').value;
        const cantidadVenta = document.getElementById('cantidadInput').value;
    
        // Verifica que se haya seleccionado una marca y un concesionario
        if (!idMarca || !idConcesionario) {
            alert('Por favor, seleccione una marca y un concesionario.');
            return;
        }

        const data = {
            idmarca: idMarca,
            idconcesionario: idConcesionario,
            cantidad: cantidadVenta
        };
    
        realizarVenta(data)
            .then(response => response.json())
            .then(data => {
                const ventasDiv = document.getElementById('ventas');
                console.log(data);
                ventasDiv.innerHTML = `<p class="alert alert-success">Se ha registrado una nueva venta`;
            })
            .catch(error => {
                console.error('Error al realizar la venta:', error);
                const ventasDiv = document.getElementById('ventas');
                ventasDiv.innerHTML = `<p class="alert alert-danger">Error al realizar la venta</p>`;
            });
    });

