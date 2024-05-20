const SERVER = 'http://localhost:3000';

async function getData() {
    const response = await fetch(SERVER + '/marcas')
    if (!response.ok) {
    throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
    const datos = await response.json()
    return datos
}
async function getByIdData(id) {
    const response = await fetch(SERVER + '/marcas/'+id);
    if (!response.ok) {
    throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
    const datos = await response.json()
    return datos
}

async function deleteData(idMarca) {
    try {
        const response = await fetch(`${SERVER}/marcas/${idMarca}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status} al eliminar el recurso: ${response.statusText}`);
        }

        return true; // Indica que la eliminación fue exitosa
    } catch (error) {
        console.error('Error al eliminar el recurso:', error);
        return false; // Indica que la eliminación falló
    }
}

async function updateData(id, nombre, cantidad) {
    try {
        const response = await fetch(`${SERVER}/marcas/patch/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json' // Especifica el tipo de contenido JSON
            },
            body: JSON.stringify({
                nombre: nombre,
                cantidad: cantidad
                // Puedes incluir más campos aquí si es necesario
            })
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status} al actualizar el recurso: ${response.statusText}`);
        }

        return true; // Indica que la actualización fue exitosa
    } catch (error) {
        console.error('Error al actualizar el recurso:', error);
        return false; // Indica que la actualización falló
    }
}

async function postData( nombre, cantidad) {
    try {
        const response = await fetch(`${SERVER}/marcas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Especifica el tipo de contenido JSON
            },
            body: JSON.stringify({
                nombre: nombre,
                cantidad: cantidad
                // Puedes incluir más campos aquí si es necesario
            })
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status} al actualizar el recurso: ${response.statusText}`);
        }

        return true; // Indica que la actualización fue exitosa
    } catch (error) {
        console.error('Error al actualizar el recurso:', error);
        return false; // Indica que la actualización falló
    }
}


async function Getall(){
    const datos = await getData();
    console.log(datos);

    const searchForm = document.getElementById("searchForm");
    const searchInput = document.getElementById("searchInput");
    const result = document.getElementById("resultados");

  
    function mostrarResultados(datosFiltrados) {
        result.innerHTML = ''; // Limpiar resultados anteriores
        datosFiltrados.forEach(element => {
            result.innerHTML += `
            <tr>
                <form id="cocheForm${element.id}">
                    
                <td><input type="text" value="${element.id}" id="id${element.id}" class="text text-end"></input></td>
                <td><input type="text" value="${element.nombre}" id="nombre${element.id}" class="text text-end"></input></td>
                <td><input type="text" value="${element.cantidad}" id="cantidad${element.id}" class="text text-end"></input></td>                                 
                <td><button onclick="modificar(${element.id}, '${element.nombre}', '${element.cantidad}')">modificar</button></td>
                    <td><button onclick="eliminar(${element.id})">Eliminar</button></td>
                </form>
            </tr>
            `;
        });
    }
    
    function filtrarDatos(marca) {
        return datos.filter(element => element.nombre.toLowerCase().includes(marca.toLowerCase()));
    }

    searchForm.addEventListener('submit', (event) => {
        event.preventDefault(); 
        const query = searchInput.value.trim(); 
        const datosFiltrados = filtrarDatos(query); 
        mostrarResultados(datosFiltrados); 
    });

    mostrarResultados(datos);
}


document.addEventListener("DOMContentLoaded", Getall);

    async function eliminar(idMarca) {
        const eliminado = await deleteData(idMarca);
        if (eliminado) {
            // Si la eliminación fue exitosa, recargar los datos para actualizar la tabla
            location.reload();
        } else {
            alert("Error al eliminar el recurso.");
        }
    }
    
  function modificar(id, nombre, cantidad) {


            window.alert("Datos actualizados");
            updateData(id,nombre,cantidad);
            Getall();

    }

    function insertar( marca) {



        postData(marca.nombre,marca.cantidad);
        Getall();

}
    
document.addEventListener("DOMContentLoaded",async ()=>{
    const datos=await getByIdData(1);
    console.log(datos);
    let marca={
        nombre:"PEPE",
        cantidad:666
    }
    // if( insertar(marca)){
    //     console.log("ins");
    // }
    
})




