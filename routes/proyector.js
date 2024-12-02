const express = require("express");
const router = express.Router();
const db = require("../db");

// Obtener todos los proyectores
router.get("/", (req, res) => {
    const sql = "SELECT * FROM Proyector";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error al obtener proyectores:", err.message);
            return res.status(500).json({ error: "Error al obtener proyectores" });
        }
        res.json(results);
    });
});

// Agregar un nuevo proyector
router.post("/", (req, res) => {
    const { modelo, resolucion, luminosidad, tipoPantalla, rut } = req.body;

    if (!modelo) {
        return res.status(400).json({ error: "El modelo es obligatorio" });
    }

    const sql = `INSERT INTO Proyector (modelo, resolucion, luminosidad, tipoPantalla, rut) 
                 VALUES (?, ?, ?, ?, ?)`;
    db.query(sql, [modelo, resolucion, luminosidad, tipoPantalla, rut], (err, results) => {
        if (err) {
            console.error("Error al agregar proyector:", err.message);
            return res.status(500).json({ error: "Error al agregar proyector" });
        }
        res.json({ message: "Proyector agregado", id: results.insertId });
    });
});

module.exports = router;
