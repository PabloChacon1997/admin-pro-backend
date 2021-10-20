const fs = require("fs-extra");

const Usuario = require("../models/usuario");
const Hospital = require("../models/hospital");
const Medico = require("../models/medico");

const borrarImage = (path) => {
  if (fs.pathExistsSync(path)) {
    // Borrar el path viejo
    fs.removeSync(path);
  }
};

const actualizarImagen = async (tipo, id, nombreArchivo) => {
  let pathViejo = "";
  switch (tipo) {
    case "medicos":
      const medico = await Medico.findById(id);
      if (!medico) {
        console.log("No es medico por id");
        return false;
      }

      pathViejo = `./uploads/medicos/${medico.img}`;
      borrarImage(pathViejo);

      medico.img = nombreArchivo;
      medico.save();
      return true;
    case "hospitales":
      const hospital = await Hospital.findById(id);
      if (!hospital) {
        console.log("No es hospital por id");
        return false;
      }

      pathViejo = `./uploads/hospitales/${hospital.img}`;
      borrarImage(pathViejo);

      hospital.img = nombreArchivo;
      hospital.save();
      return true;
    case "usuarios":
      const usuario = await Usuario.findById(id);
      if (!usuario) {
        console.log("No es usuario por id");
        return false;
      }

      pathViejo = `./uploads/usuario/${usuario.img}`;
      borrarImage(pathViejo);

      usuario.img = nombreArchivo;
      usuario.save();
      return true;
  }
};

module.exports = {
  actualizarImagen,
};
