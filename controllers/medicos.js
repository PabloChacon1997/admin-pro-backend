const { response } = require("express");
const Medico = require("../models/medico");

const getMedicos = async (req, res = response) => {
  const medicos = await Medico.find()
    .populate("usuario", "nombre")
    .populate("hospital", "nombre");
  res.json({
    ok: true,
    medicos,
  });
};
const getMedicoById = async (req, res = response) => {
  try {
    const id = req.params.id;
    const medico = await Medico.findById(id)
      .populate("usuario", "nombre img")
      .populate("hospital", "nombre img");
    res.json({
      ok: true,
      medico,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
const crearMedicos = async (req, res = response) => {
  const uid = req.uid;
  const medico = new Medico({
    usuario: uid,
    ...req.body,
  });

  try {
    const medicoDB = await medico.save();
    res.json({
      ok: true,
      medico: medicoDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
const actualizarMedico = async (req, res = response) => {
  const id = req.params.id;
  const uid = req.uid;
  try {
    const medicoDB = await Medico.findById(id);
    if (!medicoDB) {
      return res.status(404).json({
        ok: false,
        msg: "Hospital no encontrado",
      });
    }

    const cambiosMedico = {
      ...req.body,
      usuario: uid,
    };

    const medicoActualizado = await Medico.findByIdAndUpdate(
      id,
      cambiosMedico,
      { new: true }
    );
    res.json({
      ok: true,
      medico: medicoActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
const eliminarMedico = async (req, res = response) => {
  const id = req.params.id;
  try {
    const medicoDB = await Medico.findById(id);
    if (!medicoDB) {
      return res.status(404).json({
        ok: false,
        msg: "Hospital no encontrado",
      });
    }

    await Medico.findByIdAndDelete(id);
    res.json({
      ok: true,
      msg: "Medico eliminado",
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
  getMedicos,
  getMedicoById,
  crearMedicos,
  actualizarMedico,
  eliminarMedico,
};
