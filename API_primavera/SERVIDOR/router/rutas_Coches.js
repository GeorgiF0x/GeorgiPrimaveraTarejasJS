const express=require("express");
const rutasCoches=express.Router();
const cochesController=require("../controller/coches_Controller.js");

//ruta para obtener todos los coches
rutasCoches.get("/",cochesController.getMarcas);
rutasCoches.post("/",cochesController.crearMarca);
rutasCoches.get("/:id",cochesController.getMarcaById);//en vez de ? poner : para los filtros
rutasCoches.put("/:id",cochesController.putMarca);
rutasCoches.patch("/patch/:id",cochesController.patchMarca);
rutasCoches.delete("/:id",cochesController.deleteMarca);
module.exports=rutasCoches;