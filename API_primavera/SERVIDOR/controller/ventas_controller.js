const db=require('../dataBase/db.js');

const getVentas = (req, res) => { // 127.0.0.1:3000/ventas
    db.getConnection((err, connection) => {
      if (err) {
        console.error('Error al obtener conexión con la base de datos:', err);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }
  
      connection.query('SELECT * FROM ventas', (err, resultados) => {
        if (err) {
          console.error('Error al obtener datos desde la base de datos:', err);
          res.status(500).json({ error: 'Error interno del servidor' });
        } else {
          res.json(resultados);
        }
        connection.release();
      });
    });
  };
  
  const getVentaById = (req, res) => { // 127.0.0.1:3000/ventas/:id
    const idVenta = req.params.id;
  
    db.getConnection((err, connection) => {
      if (err) {
        console.error('Error al obtener conexión con la base de datos:', err);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }
  
      connection.query('SELECT * FROM ventas WHERE id = ?', [idVenta], (err, resultados) => {
        if (err) {
          console.error('Error al obtener datos desde la base de datos:', err);
          res.status(500).json({ error: 'Error interno del servidor' });
        } else {
          if (resultados.length === 0) {
            res.status(404).json({ error: 'Venta no encontrada' });
          } else {
            res.json(resultados[0]);
          }
        }
        connection.release();
      });
    });
  };
  
  const getUltimaVenta = (req, res) => { // 127.0.0.1:3000/ventas/ultima
    db.getConnection((err, connection) => {
      if (err) {
        console.error('Error al obtener conexión con la base de datos:', err);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }
  
      connection.query('SELECT * FROM ventas ORDER BY id DESC LIMIT 1', (err, resultados) => {
        if (err) {
          console.error('Error al obtener datos desde la base de datos:', err);
          res.status(500).json({ error: 'Error interno del servidor' });
        } else {
          if (resultados.length === 0) {
            res.status(404).json({ error: 'No hay ventas registradas' });
          } else {
            res.json(resultados[0]);
          }
        }
        connection.release();
      });
    });
  };
  
  const crearVenta = (req, res) => { // POST 127.0.0.1:3000/ventas
    const { idmarca, idconcesionario, cantidad } = req.body;
  
    if (!idmarca || !idconcesionario || !cantidad) {
      return res.status(400).json({ error: 'Se requieren idmarca, idconcesionario y cantidad para crear una venta' });
    }
  
    const values = [[idmarca, idconcesionario, cantidad]];
  
    db.getConnection((err, connection) => {
      if (err) {
        console.error('Error al obtener conexión con la base de datos:', err);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }
  
      connection.query('INSERT INTO ventas (idmarca, idconcesionario, cantidad) VALUES ?', [values], (err, resultado) => {
        if (err) {
          console.error('Error al guardar datos en la base de datos:', err);
          res.status(500).json({ error: 'Error interno del servidor' });
        } else {
          res.json({ recibido: true, mensaje: 'Datos de venta guardados correctamente', id: resultado.insertId });
        }
        connection.release();
      });
    });
  };
  
  const borrarVenta = (req, res) => { // DELETE 127.0.0.1:3000/ventas/:id
    const idVenta = req.params.id;
  
    db.getConnection((err, connection) => {
      if (err) {
        console.error('Error al obtener conexión con la base de datos:', err);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }
  
      connection.query('DELETE FROM ventas WHERE id = ?', [idVenta], (err, resultados) => {
        if (err) {
          console.error('Error al borrar la venta de la base de datos:', err);
          res.status(500).json({ error: 'Error interno del servidor' });
        } else {
          if (resultados.affectedRows > 0) {
            res.json({ mensaje: `Venta con id ${idVenta} eliminada correctamente` });
          } else {
            res.status(404).json({ error: `No se encontró una venta con id ${idVenta}` });
          }
        }
        connection.release();
      });
    });
  };
  
  module.exports = {
    getVentas,
    getVentaById,
    getUltimaVenta,
    crearVenta,
    borrarVenta,
  };
  