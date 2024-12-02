const express = require("express");
const router = express.Router();
const db = require("../db");

// Obtener todos los proveedores
router.get("/", (req, res) => {
    const sql = "SELECT * FROM Proveedor";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error al obtener proveedores:", err.message);
            return res.status(500).json({ error: "Error al obtener proveedores" });
        }
        res.json(results);
    });
});

// Agregar un nuevo proveedor
router.post("/", (req, res) => {
    const { rut_proveedor, digito_verificador, nombre, direccion, comuna, region, telefono, email, tipo } = req.body;

    if (!rut_proveedor || !digito_verificador || !nombre || !direccion || !comuna || !region || !tipo) {
        return res.status(400).json({ error: "Todos los campos obligatorios deben estar completos" });
    }

    const sql = `INSERT INTO Proveedor (rut_proveedor, digito_verificador, nombre, direccion, comuna, region, telefono, email, tipo) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    db.query(sql, [rut_proveedor, digito_verificador, nombre, direccion, comuna, region, telefono, email, tipo], (err, results) => {
        if (err) {
            console.error("Error al agregar proveedor:", err.message);
            return res.status(500).json({ error: "Error al agregar proveedor" });
        }
        res.json({ message: "Proveedor agregado", id: results.insertId });
    });
});

module.exports = router;
