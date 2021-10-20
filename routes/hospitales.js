/* 
  RUTA: /api/hospitales
**/

const { Router } = require("express");
const { body } = require("express-validator");
const {
  getHospitales,
  crearHospital,
  actualizarHospital,
  eliminarHospital,
} = require("../controllers/hospitales");

const { validarCampos } = require("../middlewares/validar-campos");
const { validarJwt } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", validarJwt, getHospitales);
router.post(
  "/",
  [
    validarJwt,
    body("nombre", "EL nombre del hospital es necesario").not().isEmpty(),
    validarCampos,
  ],
  crearHospital
);

router.put("/:id", [], actualizarHospital);

router.delete("/:id", eliminarHospital);
module.exports = router;
