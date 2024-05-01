const mysql=require("mysql2");
 const db=mysql.createConnection({
    host:"192.168.56.1", //cambiar en clase
    port:3307,
    user:"user",
    password:"user123",
    database:'ejemplo00'
})

db.connect((err) => {
    if (err) {
      console.error('Error de conexión a la base de datos:', err);
    } else {
      console.log('Conexión exitosa a la base de datos');
    }
});

module.exports = db;