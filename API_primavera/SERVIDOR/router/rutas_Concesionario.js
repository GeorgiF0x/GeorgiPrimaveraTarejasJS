const express=require("express");
const rutasConcesionarios=express.Router();
const ConcesionariosController=require("../controller/concesionarios_Controller.js");


rutasConcesionarios.get("/",ConcesionariosController.getConcesionarios);
rutasConcesionarios.post("/",ConcesionariosController.crearConcesionario);
rutasConcesionarios.get("/:id",ConcesionariosController.getConcesionarioById);//en vez de ? poner : para los filtros
rutasConcesionarios.get("/marca/:Idmarca",ConcesionariosController.getConcesionariosByMarcaId);//en vez de ? poner : para los filtros
rutasConcesionarios.delete("/:id",ConcesionariosController.borrarConcesionario);


module.exports=rutasConcesionarios;