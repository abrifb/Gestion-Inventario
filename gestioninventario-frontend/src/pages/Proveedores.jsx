import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Proveedores.css';

const Proveedores = () => {
    const [proveedores, setProveedores] = useState([]);
    const [form, setForm] = useState({
        idProveedor: null,
        nombre: '',
        direccion: '',
        comuna: '',
        region: '',
        telefono: '',
        email: ''
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        obtenerProveedores();
    }, []);

    const obtenerProveedores = () => {
        axios.get('http://localhost:3000/proveedores')
            .then(response => setProveedores(response.data))
            .catch(error => console.error('Error al obtener proveedores:', error));
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEditing) {
            axios.put(`http://localhost:3000/proveedores/${form.idProveedor}`, form)
                .then(() => {
                    alert('Proveedor actualizado');
                    obtenerProveedores();
                    resetForm();
                })
                .catch(error => console.error('Error al actualizar proveedor:', error));
        } else {
            axios.post('http://localhost:3000/proveedores', form)
                .then(() => {
                    alert('Proveedor agregado');
                    obtenerProveedores();
                    resetForm();
                })
                .catch(error => console.error('Error al agregar proveedor:', error));
        }
    };

    const handleEdit = (proveedor) => {
        setForm(proveedor);
        setIsEditing(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este proveedor?')) {
            axios.delete(`http://localhost:3000/proveedores/${id}`)
                .then(() => {
                    alert('Proveedor eliminado');
                    obtenerProveedores();
                })
                .catch(error => console.error('Error al eliminar proveedor:', error));
        }
    };

    const resetForm = () => {
        setForm({
            idProveedor: null,
            nombre: '',
            direccion: '',
            comuna: '',
            region: '',
            telefono: '',
            email: ''
        });
        setIsEditing(false);
    };

    return (
        <div className="proveedores-container">
            <h1>Gestión de Proveedores</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="direccion"
                    placeholder="Dirección"
                    value={form.direccion}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="comuna"
                    placeholder="Comuna"
                    value={form.comuna}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="region"
                    placeholder="Región"
                    value={form.region}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="telefono"
                    placeholder="Teléfono"
                    value={form.telefono}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
                <button type="submit">{isEditing ? 'Actualizar' : 'Agregar'}</button>
                {isEditing && <button type="button" onClick={resetForm}>Cancelar</button>}
            </form>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Dirección</th>
                        <th>Comuna</th>
                        <th>Región</th>
                        <th>Teléfono</th>
                        <th>Email</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {proveedores.map(proveedor => (
                        <tr key={proveedor.idProveedor}>
                            <td>{proveedor.idProveedor}</td>
                            <td>{proveedor.nombre}</td>
                            <td>{proveedor.direccion}</td>
                            <td>{proveedor.comuna}</td>
                            <td>{proveedor.region}</td>
                            <td>{proveedor.telefono}</td>
                            <td>{proveedor.email}</td>
                            <td>
                                <button onClick={() => handleEdit(proveedor)}>Editar</button>
                                <button onClick={() => handleDelete(proveedor.idProveedor)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Proveedores;
