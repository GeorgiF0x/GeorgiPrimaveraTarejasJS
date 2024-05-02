function fetch0(url){
    return new Promise((resolve, reject)=>{
        const peticion=new XMLHttpRequest();
        peticion.open('GET', url);
        peticion.send();
        peticion.addEventListener('load', function(){
            resolve(peticion.responseText);
        });
    })
}
console.log(document.getElementById('p1'));
document.getElementById('getCoche').addEventListener('submit', (event)=>{
    event.preventDefault();
    const url='http://127.0.0.1:3000';
    const idCiudad= document.getElementById('id-coche').value;
    console.log(idCiudad);
    fetch0(url+'/coches/'+ idCiudad)
        .then(datosCrudos=>{
            console.log(datosCrudos);
            return JSON.parse(datosCrudos);
        })
        .then(datosObjeto=>console.log(datosObjeto[0].nombre))
        .then(datosObjeto=>document.getElementById('p1').innerText=`nombre : ${datosObjeto[0].nombre} cantidad Vendida : ${datosObjeto[0].cantidad}`)
        .catch(error=>console.log(error));
});

