import React, { useState, useEffect } from "react";
import "../styles/AdministrarUsuarios.css";

const AdministrarUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch("http://localhost:3000/usuarios");
        if (!response.ok) {
          throw new Error("Error al cargar usuarios");
        }
        const data = await response.json();
        setUsuarios(data);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };

    fetchUsuarios();
  }, []);

  const handleEdit = (index) => {
    setEditingIndex(index === editingIndex ? null : index);
  };

  const handleSave = async (index) => {
    const usuarioEditado = usuarios[index];
    try {
      const response = await fetch(`http://localhost:3000/usuarios/${usuarioEditado.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuarioEditado),
      });

      if (!response.ok) {
        throw new Error("Error al guardar cambios");
      }
      setEditingIndex(null);
    } catch (error) {
      console.error("Error al guardar usuario:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/usuarios/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar usuario");
      }

      setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  const handleChange = (index, field, value) => {
    const updatedUsuarios = [...usuarios];
    updatedUsuarios[index][field] = value;
    setUsuarios(updatedUsuarios);
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-info text-white text-center">
          <h3>Administrar Usuarios</h3>
        </div>
        <div className="card-body">
          <table className="table table-bordered table-hover">
            <thead className="table-info">
              <tr>
                <th>Nombre</th>
                <th>Teléfono</th>
                <th>Email</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario, index) => (
                <tr key={usuario.id}>
                  <td>
                    {editingIndex === index ? (
                      <input
                        type="text"
                        value={usuario.nombre}
                        onChange={(e) =>
                          handleChange(index, "nombre", e.target.value)
                        }
                      />
                    ) : (
                      usuario.nombre
                    )}
                  </td>
                  <td>
                    {editingIndex === index ? (
                      <input
                        type="text"
                        value={usuario.telefono}
                        onChange={(e) =>
                          handleChange(index, "telefono", e.target.value)
                        }
                      />
                    ) : (
                      usuario.telefono
                    )}
                  </td>
                  <td>
                    {editingIndex === index ? (
                      <input
                        type="text"
                        value={usuario.email}
                        onChange={(e) =>
                          handleChange(index, "email", e.target.value)
                        }
                      />
                    ) : (
                      usuario.email
                    )}
                  </td>
                  <td>
                    {editingIndex === index ? (
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => handleSave(index)}
                      >
                        Guardar
                      </button>
                    ) : (
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEdit(index)}
                      >
                        Editar
                      </button>
                    )}
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(usuario.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdministrarUsuarios;
