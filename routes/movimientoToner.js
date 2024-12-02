const express = require("express");
const router = express.Router();
const db = require("../db");

// Obtener todos los movimientos de toners
router.get("/", (req, res) => {
    const sql = "SELECT * FROM MovimientoToner";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error al obtener movimientos de toners:", err.message);
            return res.status(500).json({ error: "Error al obtener movimientos de toners" });
        }
        res.json(results);
    });
});

// Agregar un nuevo movimiento de toner
router.post("/", (req, res) => {
    const { idToner, fecha, tipo, cantidad, rut_proveedor, rut_usuario } = req.body;

    if (!idToner || !fecha || !tipo || !cantidad || !rut_proveedor || !rut_usuario) {
        return res.status(400).json({ error: "Todos los campos obligatorios deben estar completos" });
    }

    const sql = `INSERT INTO MovimientoToner (idToner, fecha, tipo, cantidad, rut_proveedor, rut_usuario) 
                 VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(sql, [idToner, fecha, tipo, cantidad, rut_proveedor, rut_usuario], (err, results) => {
        if (err) {
            console.error("Error al agregar movimiento de toner:", err.message);
            return res.status(500).json({ error: "Error al agregar movimiento de toner" });
        }
        res.json({ message: "Movimiento de toner agregado", id: results.insertId });
    });
});

module.exports = router;
