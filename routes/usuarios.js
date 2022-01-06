/* 
  RUTA: /api/usuarios
**/

const { Router } = require("express");
const { body } = require("express-validator");
const {
  getUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
} = require("../controllers/usuarios");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  validarJwt,
  validarAdminRole,
  validarAdminRole_o_MismoUsuario,
} = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", validarJwt, getUsuarios);
router.post(
  "/",
  [
    body("nombre", "El nombre es obligatorio!!").not().isEmpty(),
    body("password", "El password es obligatorio!!").not().isEmpty(),
    body("email", "El email es obligatorio!!").isEmail(),
    validarCampos,
  ],
  crearUsuario
);

router.put(
  "/:id",
  [
    validarJwt,
    validarAdminRole_o_MismoUsuario,
    body("nombre", "El nombre es obligatorio!!").not().isEmpty(),
    body("email", "El email es obligatorio!!").isEmail(),
    body("role", "El role es obligatorio!!").not().isEmpty(),
    validarCampos,
  ],
  actualizarUsuario
);

router.delete("/:id", [validarJwt, validarAdminRole], eliminarUsuario);
module.exports = router;
