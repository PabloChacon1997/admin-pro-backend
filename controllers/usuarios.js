const { response } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");
const { generarJwt } = require("../helpers/jwt");

const getUsuarios = async (req, res) => {
  const desde = Number(req.query.desde) || 0;
  const [usuarios, total] = await Promise.all([
    Usuario.find({}, "nombre email role google img").skip(desde).limit(5),
    Usuario.countDocuments(),
  ]);
  res.json({
    ok: true,
    usuarios,
    total,
  });
};

// var serveIndex = require('serve-index');
// app.use(express.static(__dirname + '/'))
// app.use('/uploads', serveIndex(__dirname + '/uploads'));

const crearUsuario = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const existeEmail = await Usuario.findOne({ email });

    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: "El correo ya existe, por favor ingrese uno nuevo.",
      });
    }

    const usuario = new Usuario(req.body);

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    // Guardar contraseña
    await usuario.save();
    const token = await generarJwt(usuario.id);

    res.json({
      ok: true,
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

const actualizarUsuario = async (req, res = response) => {
  // TODO: Validar token y comprobar si el usuario es correcto

  const uid = req.params.id;
  try {
    const usuarioDB = await Usuario.findById(uid);
    if (!usuarioDB) {
      res.status(404).json({
        ok: false,
        msg: "No existe un usuario por ese id",
      });
    }

    const { password, google, email, ...campos } = req.body;

    if (usuarioDB.email !== email) {
      const existeEmail = await Usuario.findOne({ email });
      if (existeEmail) {
        return res.status(400).json({
          ok: false,
          msg: "Ya existe un usuario con este email",
        });
      }
    }

    // Actualizaciones
    if (!usuarioDB.google) {
      campos.email = email;
    }

    const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {
      new: true,
    });
    res.json({
      ok: true,
      usuario: usuarioActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      msg: "Error inseperado",
    });
  }
};

const eliminarUsuario = async (req, res = response) => {
  const uid = req.params.id;

  try {
    const usuarioDB = await Usuario.findById(uid);
    if (!usuarioDB) {
      res.status(404).json({
        ok: false,
        msg: "No existe un usuario por ese id",
      });
    }
    await Usuario.findByIdAndDelete(uid);
    res.status(200).json({
      ok: true,
      msg: "Usuario eliminado correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      msg: "Error inseperado",
    });
  }
};

module.exports = {
  getUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
};
