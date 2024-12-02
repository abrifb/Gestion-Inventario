const express = require("express");
const router = express.Router();
const db = require("../db");
const jwt = require("jsonwebtoken");

router.post("/", (req, res) => {
  const { nombreUsuario, contrasena } = req.body;

  // Verificar que los datos estén completos
  if (!nombreUsuario || !contrasena) {
    return res.status(400).json({ error: "Usuario y contraseña son obligatorios" });
  }

  // Consultar usuario en la base de datos
  const sql = "SELECT * FROM Usuario WHERE email = ?";
  db.query(sql, [nombreUsuario], (err, results) => {
    if (err) {
      console.error("Error al buscar usuario:", err.message);
      return res.status(500).json({ error: "Error interno del servidor" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Usuario o contraseña incorrectos" });
    }

    const usuario = results[0];

    // Verificar contraseña
    if (usuario.contrasena !== contrasena) {
      return res.status(401).json({ error: "Usuario o contraseña incorrectos" });
    }

    // Generar token JWT
    const token = jwt.sign(
      { rut: usuario.rut, email: usuario.email },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1h" }
    );

    // Responder con los datos del usuario y el token
    res.status(200).json({
      message: "Inicio de sesión exitoso",
      token,
      usuario: {
        rut: usuario.rut,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        cargo: usuario.cargo,
        departamento: usuario.departamento,
      },
    });
  });
});

module.exports = router;
