//requerir los modulos instalados
const express= require("express");
const cors= require("cors");
const rutasCoches= require("./router/rutas_Coches.js");
  

const app = express();
app.use(cors());

//middlewares
app.use(express.json());

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).send({
        error: {
            message: err.message || 'Internal Server Error',
            statusCode: err.status || 500
        }
    });
});

//asi establece /coches como raiz para rutasCoches
app.use("/coches",rutasCoches);




// app.post('/api/enviar',(req,res)=>{
//     //entre llaves porque es un objeto lo que recibe del body
//     const {mensaje}=req.body;
//     res.json({ recibido: true,
//          mensaje });
// })

const puerto=3000;

app.listen(puerto,()=>{
    console.log("servidor en escucha por el puerto 3000");
})