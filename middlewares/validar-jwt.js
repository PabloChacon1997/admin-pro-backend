const { response } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const validarJwt = (req, res = response, next) => {
  // Leer el token
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la petición",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.uid = uid;
    next();
  } catch (error) {
    console.log("Error: ", error);
    return res.status(401).json({
      ok: false,
      msg: "Token inválido",
    });
  }
};

const validarAdminRole = async (req, res = response, next) => {
  const uid = req.uid;
  try {
    const usuarioDB = await Usuario.findById(uid);
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario no existe",
      });
    }
    if (usuarioDB.role !== "ADMIN_ROLE") {
      return res.status(403).json({
        ok: false,
        msg: "No tiene privilegios para hacer eso",
      });
    }
    next();
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const validarAdminRole_o_MismoUsuario = async (req, res = response, next) => {
  const uid = req.uid;
  const id = req.params.id;
  try {
    const usuarioDB = await Usuario.findById(uid);
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario no existe",
      });
    }
    if (usuarioDB.role === "ADMIN_ROLE" || uid === id) {
      next();
    } else {
      return res.status(403).json({
        ok: false,
        msg: "No tiene privilegios para hacer eso",
      });
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  validarJwt,
  validarAdminRole,
  validarAdminRole_o_MismoUsuario,
};
