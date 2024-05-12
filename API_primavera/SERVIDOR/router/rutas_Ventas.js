const express=require("express");
const rutasVentas=express.Router();
const VentasController=require("../controller/ventas_controller.js");


rutasVentas.get("/",VentasController.getVentas);
rutasVentas.get("/ultima",VentasController.getUltimaVenta);
rutasVentas.get("/:id",VentasController.getVentaById);//en vez de ? poner : para los filtros
rutasVentas.post("/",VentasController.crearVenta);
rutasVentas.delete("/:id",VentasController.borrarVenta);
rutasVentas.get("/todasVentas/:idMarca/:idConcesionario", VentasController.getVentasByMarcaConcesionario);



module.exports=rutasVentas;