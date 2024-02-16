import { Router } from "express";
import verifyTokenUser from "../middleware/verifyToken";
const router = Router();
var { userData, getAllUsers, activarUsuario, desactivarUsuario, deleteUser, cambiarEstado,cambiarEstadoPadre, subirNivel,remindFatherFn } = require("../controller/User.controllers");


// Ruta para obtener todos los usuarios
router.get('/users', getAllUsers);
router.get("/data", userData);
router.post("/activarUsuario", activarUsuario);
router.post("/desactivarUsuario", desactivarUsuario);
router.post("/deleteUser", deleteUser);
router.post("/cambiarEstadoComplete", cambiarEstado)
router.post("/cambiarEstadoCompletePadre", cambiarEstadoPadre)
router.put("/subirNivel", subirNivel)
router.get("/remindFatherFn", remindFatherFn)

module.exports = router;
