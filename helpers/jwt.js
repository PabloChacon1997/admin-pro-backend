const jwt = require("jsonwebtoken");

const generarJwt = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = {
      uid,
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "12h",
      },
      (err, token) => {
        if (err) {
          console.log("Error en generarToken: ", err);
          reject("No se pudo generar el Token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  generarJwt,
};
