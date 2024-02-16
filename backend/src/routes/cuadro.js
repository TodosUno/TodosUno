import { Router } from "express";

const router = Router();
import verifyTokenUser from "../middleware/verifyToken";
var {
  createCuadros,
//  acceptPay,
  cuadroId,
  deleteCuadro,
  traerCuadroPadre,
  traerCuadroPadreSub,
  cuadroHijo,
  cuadroPadre,
  everyOneActive
 
} = require("../controller/Cuadro.controller");

//router.post("/createCuadro", createCuadro);
//router.post("/acceptPay", acceptPay);

router.get("/:cuadroId", cuadroId);

router.get("/everyOneActive/:cuadroId", everyOneActive);

router.get("/cuadroHijo/:cuadroId", cuadroHijo);

router.get("/cuadroPadre/:cuadroDirection/:father", cuadroPadre);

router.post("/createCuadros", createCuadros);

//router.get("/hijoLevel/:username", hijoLevel);

router.delete("/delete", deleteCuadro);

router.post("/traerCuadroPadre", traerCuadroPadre);
 
router.post("/traerCuadroPadreSub", traerCuadroPadreSub);

module.exports = router;
