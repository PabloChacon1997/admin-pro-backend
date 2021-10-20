/* 
  RUTA: /api/todo/
**/

const { Router } = require("express");
const { body } = require("express-validator");
const { getTodo, getDocumentosCollecion } = require("../controllers/busquedas");

const { validarCampos } = require("../middlewares/validar-campos");
const { validarJwt } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/:busqueda", [validarJwt], getTodo);
router.get("/coleccion/:tabla/:busqueda", [validarJwt], getDocumentosCollecion);

module.exports = router;
