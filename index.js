const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a la base de datos
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

// RUTA PARA OBTENER PROVEEDORES
app.get('/proveedores', (req, res) => {
    const sql = 'SELECT * FROM Proveedor';
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al obtener proveedores' });
            return;
        }
        res.json(results);
    });
});

// RUTA PARA AGREGAR UN NUEVO PROVEEDOR
app.post('/proveedores', (req, res) => {
    const { nombre, direccion, comuna, region, telefono, email } = req.body;
    const sql = 'INSERT INTO Proveedor (nombre, direccion, comuna, region, telefono, email) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [nombre, direccion, comuna, region, telefono, email], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al agregar proveedor' });
            return;
        }
        res.json({ message: 'Proveedor agregado', id: results.insertId });
    });
});

// RUTA PARA ACTUALIZAR UN PROVEEDOR
app.put('/proveedores/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, direccion, comuna, region, telefono, email } = req.body;
    const sql = 'UPDATE Proveedor SET nombre = ?, direccion = ?, comuna = ?, region = ?, telefono = ?, email = ? WHERE idProveedor = ?';
    db.query(sql, [nombre, direccion, comuna, region, telefono, email, id], (err, results) => {
        if (err) {
            console.error('Error al actualizar proveedor:', err);
            res.status(500).json({ error: 'Error al actualizar proveedor' });
            return;
        }
        res.json({ message: 'Proveedor actualizado' });
    });
});

// RUTA PARA ELIMINAR UN PROVEEDOR
app.delete('/proveedores/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Proveedor WHERE idProveedor = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Error al eliminar proveedor:', err);
            res.status(500).json({ error: 'Error al eliminar proveedor' });
            return;
        }
        res.json({ message: 'Proveedor eliminado' });
    });
});

// Iniciar el servidor
app.listen(3000, () => {
    console.log('Servidor en ejecución en el puerto 3000');
});
