const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a la base de datos
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err.message);
    process.exit(1); // Finaliza el proceso si no se puede conectar
  }
  console.log("Conectado a la base de datos MySQL");
});

/* 
====================================
 RUTAS DEL SERVIDOR
====================================
*/

// ** 1. Rutas específicas (Login) **
app.post("/login", (req, res) => {
  const { nombreUsuario, contrasena } = req.body;

  if (!nombreUsuario || !contrasena) {
    return res.status(400).json({ error: "Usuario y contraseña son obligatorios" });
  }

  const sql = "SELECT * FROM Usuario WHERE email = ?";
  db.query(sql, [nombreUsuario], (err, results) => {
    if (err) {
      console.error("Error al validar usuario:", err.message);
      return res.status(500).json({ error: "Error interno del servidor" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Usuario o contraseña incorrectos" });
    }

    const usuario = results[0];

    // Comparar la contraseña
    if (usuario.contrasena !== contrasena) {
      return res.status(401).json({ error: "Usuario o contraseña incorrectos" });
    }

    // Autenticación exitosa
    res.json({ message: "Inicio de sesión exitoso", usuario });
  });
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



// ** RUTAS PARA DEPARTAMENTO **

// Obtener todos los departamentos
app.get('/departamentos', (req, res) => {
    const sql = 'SELECT * FROM Departamento';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error al obtener departamentos:', err.message);
            return res.status(500).json({ error: 'Error al obtener departamentos' });
        }
        res.json(results);
    });
});

// Agregar un nuevo departamento
app.post('/departamentos', (req, res) => {
    const { nombre, descripcion } = req.body;

    if (!nombre) {
        return res.status(400).json({ error: 'El nombre es obligatorio' });
    }

    const sql = 'INSERT INTO Departamento (nombre, descripcion) VALUES (?, ?)';
    db.query(sql, [nombre, descripcion], (err, results) => {
        if (err) {
            console.error('Error al agregar departamento:', err.message);
            return res.status(500).json({ error: 'Error al agregar departamento' });
        }
        res.json({ message: 'Departamento agregado', id: results.insertId });
    });
});

// Actualizar un departamento
app.put('/departamentos/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;

    if (!nombre) {
        return res.status(400).json({ error: 'El nombre es obligatorio' });
    }

    const sql = 'UPDATE Departamento SET nombre = ?, descripcion = ? WHERE id = ?';
    db.query(sql, [nombre, descripcion, id], (err, results) => {
        if (err) {
            console.error('Error al actualizar departamento:', err.message);
            return res.status(500).json({ error: 'Error al actualizar departamento' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Departamento no encontrado' });
        }

        res.json({ message: 'Departamento actualizado' });
    });
});

// Eliminar un departamento
app.delete('/departamentos/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Departamento WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Error al eliminar departamento:', err.message);
            return res.status(500).json({ error: 'Error al eliminar departamento' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Departamento no encontrado' });
        }

        res.json({ message: 'Departamento eliminado' });
    });
});


// ** RUTAS PARA USUARIO **

// Obtener todos los usuarios
app.get('/usuarios', (req, res) => {
    const sql = 'SELECT * FROM Usuario';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error al obtener usuarios:', err.message);
            return res.status(500).json({ error: 'Error al obtener usuarios' });
        }
        res.json(results);
    });
});

// Agregar un nuevo usuario
app.post('/usuarios', (req, res) => {
    const { rut, digito_verificador, nombre, apellido, email, telefono, tipo, cargo, departamento_id } = req.body;

    if (!rut || !digito_verificador || !nombre || !apellido || !email || !tipo) {
        return res.status(400).json({ error: 'Rut, dígito verificador, nombre, apellido, email y tipo son obligatorios' });
    }

    const sql = 'INSERT INTO Usuario (rut, digito_verificador, nombre, apellido, email, telefono, tipo, cargo, departamento_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [rut, digito_verificador, nombre, apellido, email, telefono, tipo, cargo, departamento_id], (err, results) => {
        if (err) {
            console.error('Error al agregar usuario:', err.message);
            return res.status(500).json({ error: 'Error al agregar usuario' });
        }
        res.json({ message: 'Usuario agregado', id: results.insertId });
    });
});

// Actualizar un usuario
app.put('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const { rut, digito_verificador, nombre, apellido, email, telefono, tipo, cargo, departamento_id } = req.body;

    if (!rut || !digito_verificador || !nombre || !apellido || !email || !tipo) {
        return res.status(400).json({ error: 'Rut, dígito verificador, nombre, apellido, email y tipo son obligatorios' });
    }

    const sql = 'UPDATE Usuario SET rut = ?, digito_verificador = ?, nombre = ?, apellido = ?, email = ?, telefono = ?, tipo = ?, cargo = ?, departamento_id = ? WHERE id = ?';
    db.query(sql, [rut, digito_verificador, nombre, apellido, email, telefono, tipo, cargo, departamento_id, id], (err, results) => {
        if (err) {
            console.error('Error al actualizar usuario:', err.message);
            return res.status(500).json({ error: 'Error al actualizar usuario' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.json({ message: 'Usuario actualizado' });
    });
});

// Eliminar un usuario
app.delete('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Usuario WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Error al eliminar usuario:', err.message);
            return res.status(500).json({ error: 'Error al eliminar usuario' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.json({ message: 'Usuario eliminado' });
    });
});


// ** RUTAS PARA INVENTARIO **

// Obtener todos los registros de inventario
app.get('/inventario', (req, res) => {
    const sql = 'SELECT * FROM Inventario';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error al obtener inventario:', err.message);
            return res.status(500).json({ error: 'Error al obtener inventario' });
        }
        res.json(results);
    });
});

// Agregar un registro al inventario
app.post('/inventario', (req, res) => {
    const { idProducto, cantidad, ubicacion } = req.body;

    if (!idProducto || !cantidad || !ubicacion) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const sql = 'INSERT INTO Inventario (idProducto, cantidad, ubicacion) VALUES (?, ?, ?)';
    db.query(sql, [idProducto, cantidad, ubicacion], (err, results) => {
        if (err) {
            console.error('Error al agregar inventario:', err.message);
            return res.status(500).json({ error: 'Error al agregar inventario' });
        }
        res.json({ message: 'Registro de inventario agregado', id: results.insertId });
    });
});

// Actualizar un registro de inventario
app.put('/inventario/:id', (req, res) => {
    const { id } = req.params;
    const { idProducto, cantidad, ubicacion } = req.body;

    if (!idProducto || !cantidad || !ubicacion) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const sql = 'UPDATE Inventario SET idProducto = ?, cantidad = ?, ubicacion = ? WHERE idInventario = ?';
    db.query(sql, [idProducto, cantidad, ubicacion, id], (err, results) => {
        if (err) {
            console.error('Error al actualizar inventario:', err.message);
            return res.status(500).json({ error: 'Error al actualizar inventario' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Registro de inventario no encontrado' });
        }

        res.json({ message: 'Registro de inventario actualizado' });
    });
});

// Eliminar un registro de inventario
app.delete('/inventario/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Inventario WHERE idInventario = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Error al eliminar inventario:', err.message);
            return res.status(500).json({ error: 'Error al eliminar inventario' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Registro de inventario no encontrado' });
        }

        res.json({ message: 'Registro de inventario eliminado' });
    });
});


// ** RUTAS PARA TONER **

// Obtener todos los toners
app.get('/toners', (req, res) => {
    const sql = 'SELECT * FROM Toner';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error al obtener toners:', err.message);
            return res.status(500).json({ error: 'Error al obtener toners' });
        }
        res.json(results);
    });
});

// Agregar un nuevo toner
app.post('/toners', (req, res) => {
    const { idProducto, marca, color, contenido, impresora } = req.body;

    if (!idProducto || !marca || !contenido || !impresora) {
        return res.status(400).json({ error: 'Todos los campos obligatorios deben estar completos' });
    }

    const sql = 'INSERT INTO Toner (idProducto, marca, color, contenido, impresora) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [idProducto, marca, color, contenido, impresora], (err, results) => {
        if (err) {
            console.error('Error al agregar toner:', err.message);
            return res.status(500).json({ error: 'Error al agregar toner' });
        }
        res.json({ message: 'Toner agregado', id: results.insertId });
    });
});

// Actualizar un toner
app.put('/toners/:id', (req, res) => {
    const { id } = req.params;
    const { idProducto, marca, color, contenido, impresora } = req.body;

    if (!idProducto || !marca || !contenido || !impresora) {
        return res.status(400).json({ error: 'Todos los campos obligatorios deben estar completos' });
    }

    const sql = 'UPDATE Toner SET idProducto = ?, marca = ?, color = ?, contenido = ?, impresora = ? WHERE idToner = ?';
    db.query(sql, [idProducto, marca, color, contenido, impresora, id], (err, results) => {
        if (err) {
            console.error('Error al actualizar toner:', err.message);
            return res.status(500).json({ error: 'Error al actualizar toner' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Toner no encontrado' });
        }

        res.json({ message: 'Toner actualizado' });
    });
});

// Eliminar un toner
app.delete('/toners/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Toner WHERE idToner = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Error al eliminar toner:', err.message);
            return res.status(500).json({ error: 'Error al eliminar toner' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Toner no encontrado' });
        }

        res.json({ message: 'Toner eliminado' });
    });
});



// ** RUTAS PARA PROYECTOR **

// Obtener todos los proyectores
app.get('/proyectores', (req, res) => {
    const sql = 'SELECT * FROM Proyector';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error al obtener proyectores:', err.message);
            return res.status(500).json({ error: 'Error al obtener proyectores' });
        }
        res.json(results);
    });
});

// Agregar un nuevo proyector
app.post('/proyectores', (req, res) => {
    const { idProducto, modelo, resolucion, luminosidad, tipoPantalla } = req.body;

    if (!idProducto || !modelo) {
        return res.status(400).json({ error: 'ID del producto y modelo son obligatorios' });
    }

    const sql = 'INSERT INTO Proyector (idProducto, modelo, resolucion, luminosidad, tipoPantalla) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [idProducto, modelo, resolucion, luminosidad, tipoPantalla], (err, results) => {
        if (err) {
            console.error('Error al agregar proyector:', err.message);
            return res.status(500).json({ error: 'Error al agregar proyector' });
        }
        res.json({ message: 'Proyector agregado', id: results.insertId });
    });
});

// Actualizar un proyector
app.put('/proyectores/:id', (req, res) => {
    const { id } = req.params;
    const { idProducto, modelo, resolucion, luminosidad, tipoPantalla } = req.body;

    if (!idProducto || !modelo) {
        return res.status(400).json({ error: 'ID del producto y modelo son obligatorios' });
    }

    const sql = 'UPDATE Proyector SET idProducto = ?, modelo = ?, resolucion = ?, luminosidad = ?, tipoPantalla = ? WHERE idProyector = ?';
    db.query(sql, [idProducto, modelo, resolucion, luminosidad, tipoPantalla, id], (err, results) => {
        if (err) {
            console.error('Error al actualizar proyector:', err.message);
            return res.status(500).json({ error: 'Error al actualizar proyector' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Proyector no encontrado' });
        }

        res.json({ message: 'Proyector actualizado' });
    });
});

// Eliminar un proyector
app.delete('/proyectores/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Proyector WHERE idProyector = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Error al eliminar proyector:', err.message);
            return res.status(500).json({ error: 'Error al eliminar proyector' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Proyector no encontrado' });
        }

        res.json({ message: 'Proyector eliminado' });
    });
});




// ** RUTAS PARA MANTENIMIENTO **

// Obtener todos los mantenimientos
app.get('/mantenimientos', (req, res) => {
    const sql = 'SELECT * FROM Mantenimiento';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error al obtener mantenimientos:', err.message);
            return res.status(500).json({ error: 'Error al obtener mantenimientos' });
        }
        res.json(results);
    });
});

// Agregar un nuevo mantenimiento
app.post('/mantenimientos', (req, res) => {
    const { idProyector, fecha, descripcion, tipoMantenimiento } = req.body;

    if (!idProyector || !fecha || !tipoMantenimiento) {
        return res.status(400).json({ error: 'ID del proyector, fecha y tipo de mantenimiento son obligatorios' });
    }

    const sql = 'INSERT INTO Mantenimiento (idProyector, fecha, descripcion, tipoMantenimiento) VALUES (?, ?, ?, ?)';
    db.query(sql, [idProyector, fecha, descripcion, tipoMantenimiento], (err, results) => {
        if (err) {
            console.error('Error al agregar mantenimiento:', err.message);
            return res.status(500).json({ error: 'Error al agregar mantenimiento' });
        }
        res.json({ message: 'Mantenimiento agregado', id: results.insertId });
    });
});

// Actualizar un mantenimiento
app.put('/mantenimientos/:id', (req, res) => {
    const { id } = req.params;
    const { idProyector, fecha, descripcion, tipoMantenimiento } = req.body;

    if (!idProyector || !fecha || !tipoMantenimiento) {
        return res.status(400).json({ error: 'ID del proyector, fecha y tipo de mantenimiento son obligatorios' });
    }

    const sql = 'UPDATE Mantenimiento SET idProyector = ?, fecha = ?, descripcion = ?, tipoMantenimiento = ? WHERE idMantenimiento = ?';
    db.query(sql, [idProyector, fecha, descripcion, tipoMantenimiento, id], (err, results) => {
        if (err) {
            console.error('Error al actualizar mantenimiento:', err.message);
            return res.status(500).json({ error: 'Error al actualizar mantenimiento' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Mantenimiento no encontrado' });
        }

        res.json({ message: 'Mantenimiento actualizado' });
    });
});

// Eliminar un mantenimiento
app.delete('/mantenimientos/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Mantenimiento WHERE idMantenimiento = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Error al eliminar mantenimiento:', err.message);
            return res.status(500).json({ error: 'Error al eliminar mantenimiento' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Mantenimiento no encontrado' });
        }

        res.json({ message: 'Mantenimiento eliminado' });
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
