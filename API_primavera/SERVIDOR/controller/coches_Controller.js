

const db=require('../dataBase/db.js');

const getMarcas = (req, res) => { //127.0.0.1:3000/marcas
  db.getConnection((err, connection) => {
    connection.query('SELECT * FROM marcas', (err, resultados) => {
      if (err) {
        console.error('Error al obtener datos desde la base de datos:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
      } else {
        res.json(resultados);
      }
      connection.release();
    });
  });
}

const crearMarca = (req, res) => {
  const { nombre, cantidad } = req.body;
  const values = [[nombre, cantidad]];
  db.getConnection((err, connection) => {
    connection.query('INSERT INTO marcas (nombre, cantidad) VALUES ?', [values], (err, resultado) => {
      if (err) {
        console.error('Error al guardar datos en la base de datos:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
      } else {
        res.json({ recibido: true, mensaje: 'Datos guardados correctamente', id: resultado.insertId });
        connection.release();
      }
    });
  });
};

const getMarcaById = (req, res) => { //127.0.0.1:3000/marcas/:id
  const idRegistro = req.params.id;
  db.getConnection((err, connection) => {
    connection.query('SELECT * FROM marcas  where id = ?', [idRegistro], (err, resultados) => {
      if (err) {
        console.error('Error al obtener datos desde la base de datos:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
      } else {
        res.json(resultados);
        connection.release();
      }
    });
  });
}

const putMarca = (req, res) => {
  const idRegistro = req.params.id;
  db.getConnection((err, connection) => {
    const { nombre, cantidad } = req.body;
    const sql = 'UPDATE marcas SET nombre=?, cantidad=? WHERE id = ?';
    connection.query(sql, [nombre, cantidad, idRegistro], (err, resultado) => {
      if (err) {
        console.error("Error al actualizar el registro en la base de datos:", err);
        res.status(500).json({ error: "Error interno del servidor" });
      } else {
        res.json({ actualizado: true, nombre: nombre, cantidad: cantidad, id: idRegistro });
        connection.release();
      }
    });
  })
};


const patchMarca = (req, res) => {
  const idRegistro = req.params.id;
  const { nombre, cantidad } = req.body;
  let sql;
  let values = [];


  if (nombre && cantidad) {
    sql = 'UPDATE marcas SET nombre=?, cantidad=? WHERE id = ?';
    values = [nombre, cantidad, idRegistro];
  } else if (nombre) {
    sql = 'UPDATE marcas SET nombre=? WHERE id = ?';
    values = [nombre, idRegistro];
  } else {
    sql = 'UPDATE marcas SET cantidad=? WHERE id = ?';
    values = [cantidad, idRegistro];
  }

  db.getConnection((err, connection) => {
    connection.query(sql, values, (err, resultado) => {
      if (err) {
        console.error("Error al actualizar el registro en la base de datos:", err);
        return res.status(500).json({ error: "Error interno del servidor", message: err.message });
      }

      if (resultado.affectedRows === 0) {
        return res.status(404).json({ error: "Marca no encontrada" });
      }

      res.json({ actualizado: true, nombre, cantidad, id: idRegistro });
      connection.release();
    });
  });
};


const deleteMarca = (req, res) => {
  const idRegistro = req.params.id;
  db.getConnection((err, connection) => {
    connection.query('DELETE FROM marcas WHERE id = ?', [idRegistro], (err, resultados) => {
      if (err) {
        console.error("Error al borrar el registro:", err);
        res.status(500).json({ error: 'Error interno del servidor' });
      } else {

        if (resultados.affectedRows > 0) {
          res.json({ mensaje: `Registro con id: ${idRegistro} se eliminó correctamente` });
        } else {
          res.status(404).json({ error: `No se encontró el registro con id ${idRegistro}` });
        }
        connection.release();
      }
    });
  })
};

module.exports = {
  getMarcas,
  crearMarca,
  getMarcaById,
  putMarca,
  patchMarca,
  deleteMarca,
}


  
