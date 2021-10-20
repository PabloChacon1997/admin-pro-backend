/* 
  RUTA: /api/medicos
**/

const { Router } = require("express");
const { body } = require("express-validator");
const {
  getMedicos,
  crearMedicos,
  actualizarMedico,
  eliminarMedico,
} = require("../controllers/medicos");

const { validarCampos } = require("../middlewares/validar-campos");
const { validarJwt } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", validarJwt, getMedicos);
router.post(
  "/",
  [
    validarJwt,
    body("nombre", "El nombre es necesario").not().isEmpty(),
    body("hospital", "El hospital id debe ser válido").isMongoId(),
    validarCampos,
  ],
  crearMedicos
);

router.put("/:id", [], actualizarMedico);

router.delete("/:id", eliminarMedico);
module.exports = router;
