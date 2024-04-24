//requerir los modulos instalados
const express= require("express");
const cors= require("cors");
const mysql=require("mysql2");

const db=mysql.createConnection({
    host:"192.168.7.103",
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
  

const app = express();
app.use(cors());

//middlewares
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("hola estas en mi api");
})

app.get('/api/datos',(req,res)=>{
    const datos = {
        mensaje: 'Estos son los datos',
        usuario: 'Tu usuario',
        edad: 25
      };
    res.json(datos)
    
})

app.post('/api/enviar',(req,res)=>{
    //entre llaves porque es un objeto lo que recibe del body
    const {mensaje}=req.body;
    res.json({ recibido: true,
         mensaje });
})

const puerto=3000;

app.listen(puerto,()=>{
    console.log("servidor en escucha por el puerto 3000");
})