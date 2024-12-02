const express = require("express");
const router = express.Router();
const db = require("../db");

// Obtener todos los toners
router.get("/", (req, res) => {
    const sql = "SELECT * FROM Toner";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error al obtener toners:", err.message);
            return res.status(500).json({ error: "Error al obtener toners" });
        }
        res.json(results);
    });
});

// Agregar un nuevo toner
router.post("/", (req, res) => {
    const { marca, color, contenido, impresora, rut } = req.body;

    if (!marca || !contenido || !impresora) {
        return res.status(400).json({ error: "Marca, contenido e impresora son obligatorios" });
    }

    const sql = "INSERT INTO Toner (marca, color, contenido, impresora, rut) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [marca, color, contenido, impresora, rut], (err, results) => {
        if (err) {
            console.error("Error al agregar toner:", err.message);
            return res.status(500).json({ error: "Error al agregar toner" });
        }
        res.json({ message: "Toner agregado", id: results.insertId });
    });
});

module.exports = router;
