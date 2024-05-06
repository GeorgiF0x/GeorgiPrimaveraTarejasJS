const mysql=require("mysql2");
 const db=mysql.createPool({
    host:"127.0.0.1", //cambiar en clase
    port:3307,
    user:"user",
    password:"user123",
    database:'ejemplo00'
})

// db.connect((err) => {
//     if (err) {
//       console.error('Error de conexión a la base de datos:', err);
//     } else {
//       console.log('Conexión exitosa a la base de datos');
//     }
// });

module.exports = db;