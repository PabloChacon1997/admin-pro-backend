require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { dbConnection } = require("./database/config");

// Crear el servidor express

const app = express();

// Configurar CORS

app.use(cors());

// Lecura y parseo del body
app.use(express.json());

// DB CONECTION

dbConnection();
// RUTAS
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/login", require("./routes/auth"));

app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en el puerto: " + process.env.PORT);
});
