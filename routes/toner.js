const express = require("express");
const router = express.Router();
const db = require("../db");

// Obtener todos los tóneres
router.get("/", (req, res) => {
    const sql = "SELECT * FROM Toner";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error al obtener toners:", err.message);
            return res.status(500).json({ error: "Error al obtener toners" });
        }
        res.json(results); // Devuelve la lista de tóneres
    });
});

// Agregar un nuevo tóner
router.post("/", (req, res) => {
    const { marca, color, contenido, impresora, rut } = req.body;

    // Validar que los campos obligatorios estén presentes
    if (!marca || !contenido || !impresora) {
        return res.status(400).json({
            error: "Los campos marca, contenido e impresora son obligatorios.",
        });
    }

    // Consulta SQL para insertar un nuevo tóner
    const sql = `
        INSERT INTO Toner (marca, color, contenido, impresora, rut)
        VALUES (?, ?, ?, ?, ?)
    `;

    // Ejecutar la consulta SQL
    db.query(sql, [marca, color || null, contenido, impresora, rut || null], (err, results) => {
        if (err) {
            console.error("Error al agregar toner:", err.message);
            return res.status(500).json({ error: "Error al agregar toner" });
        }

        // Respuesta exitosa
        res.status(201).json({
            message: "Toner agregado exitosamente.",
            id: results.insertId, // Devuelve el ID del nuevo tóner
        });
    });
});

// Obtener un tóner por ID
router.get("/:id", (req, res) => {
    const { id } = req.params;

    const sql = "SELECT * FROM Toner WHERE id = ?";
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error("Error al obtener toner:", err.message);
            return res.status(500).json({ error: "Error al obtener toner" });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "Toner no encontrado" });
        }

        res.json(results[0]); // Devuelve el tóner encontrado
    });
});

// Actualizar un tóner por ID
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { marca, color, contenido, impresora, rut } = req.body;

    // Validar que los campos obligatorios estén presentes
    if (!marca || !contenido || !impresora) {
        return res.status(400).json({
            error: "Los campos marca, contenido e impresora son obligatorios.",
        });
    }

    const sql = `
        UPDATE Toner
        SET marca = ?, color = ?, contenido = ?, impresora = ?, rut = ?
        WHERE id = ?
    `;

    db.query(sql, [marca, color || null, contenido, impresora, rut || null, id], (err, results) => {
        if (err) {
            console.error("Error al actualizar toner:", err.message);
            return res.status(500).json({ error: "Error al actualizar toner" });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Toner no encontrado" });
        }

        res.json({ message: "Toner actualizado exitosamente." });
    });
});

// Eliminar un tóner por ID
router.delete("/:id", (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM Toner WHERE id = ?";
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error("Error al eliminar toner:", err.message);
            return res.status(500).json({ error: "Error al eliminar toner" });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Toner no encontrado" });
        }

        res.json({ message: "Toner eliminado exitosamente." });
    });
});

module.exports = router;
