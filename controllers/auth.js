const { response } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");
const { generarJwt } = require("../helpers/jwt");

const login = async (req, res = response) => {
  const { email, password } = req.body;
  // Verificar email
  try {
    const usuarioDB = await Usuario.findOne({ email });
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "Correo o contraseña incorrectos",
      });
    }

    // Verificar contraseña
    const validPassword = bcrypt.compareSync(password, usuarioDB.password);

    if (!validPassword) {
      return res.status(404).json({
        ok: false,
        msg: "Correo o contraseña incorrectos",
      });
    }

    // Genrar un Token JWT
    const token = await generarJwt(usuarioDB.id);
    res.json({
      ok: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  login,
};
