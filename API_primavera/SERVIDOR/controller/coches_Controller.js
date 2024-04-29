const db=require('../dataBase/db.js');


const getCoches=(req,res)=>{ //127.0.0.1:3000/coches
  db.query('SELECT * FROM coches', (err, resultados) => {
    if (err) {
      console.error('Error al obtener datos desde la base de datos:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      res.json(resultados);
    }
  });
}

const crearCoche=(req,res)=>{ //127.0.0.1:3000/coches
  const {nuevoNombre,cantidad}= req.body;
  db.query('INSERT INTO coches (nombre,cantidad) VALUES (?)', [nuevoNombre,cantidad], (err, resultado) => {
    if (err) {
      console.error('Error al guardar datos en la base de datos:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      res.json({ recibido: true, mensaje, id: resultado.insertId });
    }
  });
}

//para obtener un registro
const getCocheById=(req,res)=>{ //127.0.0.1:3000/coches
  const idRegistro= req.params.id;
  db.query('SELECT * FROM coches  where id = ?',[idRegistro], (err, resultados) => {
    if (err) {
      console.error('Error al obtener datos desde la base de datos:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      //verificar si se encontro el registro
      res.json(resultados);


      // if(res.length>0){
      // }else{
      //   res.status(404).json({error:'Registro no encontrado'});
      // }
    }
  });
}



module.exports={
  getCoches,
  crearCoche,
  getCocheById,
}


  
