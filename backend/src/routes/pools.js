import { Router } from "express";

const router = Router();
var {
  createPool,
  getAllPools,
  getPoolById,
  agregarApool
} = require("../controller/Pools.controllers");

router.post("/createPool", createPool);
router.get("/allPools", getAllPools);
router.get("/getPool/:id", getPoolById);
router.post("/agregarApool", agregarApool);

module.exports = router;
