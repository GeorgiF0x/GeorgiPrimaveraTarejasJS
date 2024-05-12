const db=require('../dataBase/db.js');

const getConcesionarios = (req, res) => { // 127.0.0.1:3000/concesionarios
    db.getConnection((err, connection) => {
      connection.query('SELECT * FROM concesionarios', (err, resultados) => {
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
  
  const getConcesionarioById = (req, res) => { // 127.0.0.1:3000/concesionarios/:id
    const idRegistro = req.params.id;
    db.getConnection((err, connection) => {
      connection.query('SELECT * FROM concesionarios WHERE id = ?', [idRegistro], (err, resultados) => {
        if (err) {
          console.error('Error al obtener datos desde la base de datos:', err);
          res.status(500).json({ error: 'Error interno del servidor' });
        } else {
          if (resultados.length === 0) {
            res.status(404).json({ error: 'Concesionario no encontrado' });
          } else {
            res.json(resultados[0]);
          }
        }
        connection.release();
      });
    });
  }
  
  const getConcesionariosByMarcaId = (req, res) => { // 127.0.0.1:3000/concesionarios/marca/:idMarca
    const idMarca = req.params.idMarca;
    db.getConnection((err, connection) => {
      connection.query('SELECT * FROM concesionarios WHERE marcaId = ?', [idMarca], (err, resultados) => {
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
 
  

  const crearConcesionario = (req, res) => {
    const { nombre, idMarca } = req.body;
    
    if (!nombre || !idMarca) {
      return res.status(400).json({ error: 'Se requieren nombre y marcaId para crear un nuevo concesionario' });
    }
  
    const values = [[nombre, idMarca]];
    
    db.getConnection((err, connection) => {
      if (err) {
        console.error('Error al obtener conexión con la base de datos:', err);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }
  
      connection.query('INSERT INTO concesionarios (nombre, marcaId) VALUES ?', [values], (err, resultado) => {
        if (err) {
          console.error('Error al guardar datos en la base de datos:', err);
          res.status(500).json({ error: 'Error interno del servidor' });
        } else {
          res.json({ recibido: true, mensaje: 'Datos guardados correctamente', id: resultado.insertId });
        }
        connection.release();
      });
    });
  };



  const borrarConcesionario = (req, res) => {
    const idConcesionario = req.params.id;
  
    db.getConnection((err, connection) => {
      if (err) {
        console.error('Error al obtener conexión con la base de datos:', err);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }
  
      connection.query('DELETE FROM concesionarios WHERE id = ?', [idConcesionario], (err, resultados) => {
        if (err) {
          console.error('Error al borrar el concesionario de la base de datos:', err);
          res.status(500).json({ error: 'Error interno del servidor' });
        } else {
          if (resultados.affectedRows > 0) {
            res.json({ mensaje: `Concesionario con id ${idConcesionario} eliminado correctamente` });
          } else {
            res.status(404).json({ error: `No se encontró un concesionario con id ${idConcesionario}` });
          }
        }
        connection.release();
      });
    });
  };
  
  module.exports = {
    getConcesionarios,
    getConcesionarioById,
    getConcesionariosByMarcaId,
    crearConcesionario,
    borrarConcesionario
  };
  