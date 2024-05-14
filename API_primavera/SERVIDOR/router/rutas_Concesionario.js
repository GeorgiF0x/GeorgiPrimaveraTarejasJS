const express=require("express");
const rutasConcesionarios=express.Router();
const ConcesionariosController=require("../controller/concesionarios_Controller.js");


rutasConcesionarios.get("/",ConcesionariosController.getConcesionarios);
rutasConcesionarios.post("/",ConcesionariosController.crearConcesionario);
rutasConcesionarios.get("/:id",ConcesionariosController.getConcesionarioById);//en vez de ? poner : para los filtros
rutasConcesionarios.get("/marca/:marcaId",ConcesionariosController.getConcesionariosByMarcaId);//en vez de ? poner : para los filtros
rutasConcesionarios.delete("/:id",ConcesionariosController.borrarConcesionario);
rutasConcesionarios.patch("/patch/:id",ConcesionariosController.patchConcesionario);


module.exports=rutasConcesionarios;