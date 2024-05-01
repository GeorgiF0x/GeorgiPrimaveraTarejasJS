const express=require("express");
const rutasCoches=express.Router();
const cochesController=require("../controller/coches_Controller.js");

//ruta para obtener todos los coches
rutasCoches.get("/",cochesController.getCoches);
rutasCoches.post("/",cochesController.crearCoche);
rutasCoches.get("/:id",cochesController.getCocheById);//en vez de ? poner : para los filtros
rutasCoches.put("/:id",cochesController.putCoche);
rutasCoches.patch("/patch/:id",cochesController.patchCoche);
rutasCoches.delete("/:id",cochesController.deleteCoche);
module.exports=rutasCoches;