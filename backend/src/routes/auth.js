import { Router } from "express";

const router = Router();
var {
  registerUser,
  loginUser,

} = require("../controller/Auth.controllers");

router.post("/createUser/:referralUser?", registerUser);

/* crear usuario */
router.post("/login", loginUser);



module.exports = router;
