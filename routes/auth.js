/* 
  RUTA: /api/auth
**/

const { Router } = require("express");
const { body } = require("express-validator");
const { login, googleSignIn, renewToken } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJwt } = require("../middlewares/validar-jwt");

const router = Router();

router.post(
  "/",
  [
    body("email", "El email es obligatorio!!").isEmail(),
    body("password", "El password es obligatorio!!").not().isEmpty(),
    validarCampos,
  ],
  login
);

router.post(
  "/google",
  [body("token", "El token es obligatorio!!").not().isEmpty(), validarCampos],
  googleSignIn
);

router.get("/renew", validarJwt, renewToken);

module.exports = router;
