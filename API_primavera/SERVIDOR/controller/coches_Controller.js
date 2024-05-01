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

const crearCoche = (req, res) => { 
  const { nombre, cantidad } = req.body; // 
  const values = [[nombre, cantidad]];
  db.query('INSERT INTO coches (nombre, cantidad) VALUES ?', [values], (err, resultado) => {
    if (err) {
      console.error('Error al guardar datos en la base de datos:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      res.json({ recibido: true, mensaje: 'Datos guardados correctamente', id: resultado.insertId });
    }
  });
};





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

const putCoche = (req, res) => {
  const idRegistro = req.params.id;
  const { nombre, cantidad } = req.body; //con nombre si con nombre no
  const sql = 'UPDATE coches SET nombre=?, cantidad=? WHERE id = ?'; 
  db.query(sql, [nombre, cantidad, idRegistro], (err, resultado) => { 
    if (err) {
      console.error("Error al actualizar el registro en la base de datos:", err); 
      res.status(500).json({ error: "Error interno del servidor" });
    } else {
      res.json({ actualizado: true, nombre: nombre, cantidad: cantidad, id: idRegistro }); 
    }
  });
};

const patchCoche = (req, res) => {
  const idRegistro = req.params.id;
  const { nombre, cantidad } = req.body;
  const sql = 'UPDATE coches SET nombre=?, cantidad=? WHERE id = ?';
  db.query(sql, [nombre, cantidad, idRegistro], (err, resultado) => {
    if (err) {
      console.error("Error al actualizar el registro en la base de datos:", err);
      return res.status(500).json({ error: "Error interno del servidor", message: err.message }); 
    }
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ error: "Coche no encontrado" });
    }
    res.json({ actualizado: true, nombre: nombre, cantidad: cantidad, id: idRegistro });
  });
};

const deleteCoche = (req, res) => {
  const idRegistro = req.params.id;
  db.query('DELETE FROM coches WHERE id = ?', [idRegistro], (err, resultados) => {
      if (err) {
          console.error("Error al borrar el registro:", err);
          res.status(500).json({ error: 'Error interno del servidor' });
      } else {

          if (resultados.affectedRows > 0) {
              res.json({ mensaje: `Registro con id: ${idRegistro} se eliminó correctamente` });
          } else {
              res.status(404).json({ error: `No se encontró el registro con id ${idRegistro}` });
          }
      }
  });
};








module.exports={
  getCoches,
  crearCoche,
  getCocheById,
  putCoche,
  patchCoche,
  deleteCoche,
}


  
