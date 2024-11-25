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
        console.error('Error al conectar a la base de datos:', err.message);
        process.exit(1); // Finaliza el proceso si no se puede conectar
    }
    console.log('Conectado a la base de datos MySQL');
});

// ** RUTAS PARA PROVEEDORES **

// Obtener todos los proveedores
app.get('/proveedores', (req, res) => {
    const sql = 'SELECT * FROM Proveedor';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error al obtener proveedores:', err.message);
            return res.status(500).json({ error: 'Error al obtener proveedores' });
        }
        res.json(results);
    });
});

// Agregar un nuevo proveedor
app.post('/proveedores', (req, res) => {
    const { nombre, direccion, comuna, region, telefono, email } = req.body;

    if (!nombre || !direccion || !comuna || !region) {
        return res.status(400).json({ error: 'Nombre, dirección, comuna y región son obligatorios' });
    }

    const sql = 'INSERT INTO Proveedor (nombre, direccion, comuna, region, telefono, email) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [nombre, direccion, comuna, region, telefono, email], (err, results) => {
        if (err) {
            console.error('Error al agregar proveedor:', err.message);
            return res.status(500).json({ error: 'Error al agregar proveedor' });
        }
        res.json({ message: 'Proveedor agregado', id: results.insertId });
    });
});

// Actualizar un proveedor
app.put('/proveedores/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, direccion, comuna, region, telefono, email } = req.body;

    if (!nombre || !direccion || !comuna || !region) {
        return res.status(400).json({ error: 'Nombre, dirección, comuna y región son obligatorios' });
    }

    const sql = 'UPDATE Proveedor SET nombre = ?, direccion = ?, comuna = ?, region = ?, telefono = ?, email = ? WHERE idProveedor = ?';
    db.query(sql, [nombre, direccion, comuna, region, telefono, email, id], (err, results) => {
        if (err) {
            console.error('Error al actualizar proveedor:', err.message);
            return res.status(500).json({ error: 'Error al actualizar proveedor' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Proveedor no encontrado' });
        }

        res.json({ message: 'Proveedor actualizado' });
    });
});

// Eliminar un proveedor
app.delete('/proveedores/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Proveedor WHERE idProveedor = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Error al eliminar proveedor:', err.message);
            return res.status(500).json({ error: 'Error al eliminar proveedor' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Proveedor no encontrado' });
        }

        res.json({ message: 'Proveedor eliminado' });
    });
});

// ** RUTA BASE **
app.get('/', (req, res) => {
    res.send('Bienvenido a la API de gestión de proveedores');
});

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
