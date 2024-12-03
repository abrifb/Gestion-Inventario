import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/EditarMovimiento.css";

const EditarMovimiento = ({ rutUsuario }) => {
  const [toners, setToners] = useState([]); // Lista de tóners registrados
  const [editingRow, setEditingRow] = useState(null); // Fila que se está editando

  useEffect(() => {
    obtenerToners();
  }, []);

  const obtenerToners = async () => {
    try {
      const response = await axios.get("http://localhost:3000/toners");
      setToners(response.data);
    } catch (error) {
      console.error("Error al obtener tóneres:", error);
    }
  };

  const handleEditRow = (idToner) => {
    setEditingRow(idToner);
  };

  const handleInputChange = (e, idToner, field) => {
    const { value } = e.target;
    setToners((prevToners) =>
      prevToners.map((toner) =>
        toner.idToner === idToner ? { ...toner, [field]: value } : toner
      )
    );
  };

  const handleSaveRow = async (toner) => {
    const { idToner, marca, color, contenido, impresora, proveedor } = toner;

    if (!marca || !contenido || !impresora || !proveedor) {
      alert("Por favor, complete todos los campos requeridos.");
      return;
    }

    try {
      await axios.put(`http://localhost:3000/toners/${idToner}`, {
        marca,
        color,
        contenido,
        impresora,
        rut: toner.rut, // Rut del proveedor
      });
      alert("Tóner actualizado correctamente.");
      setEditingRow(null); // Salir del modo de edición
      obtenerToners(); // Actualizar la tabla
    } catch (error) {
      console.error("Error al modificar tóner:", error);
      alert("Error al modificar el tóner.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-danger text-white text-center">
          <h3>Editar Tóner</h3>
        </div>
        <div className="card-body">
          <h4>Tóneres Registrados</h4>
          <table className="table table-bordered table-hover">
            <thead className="table-info">
              <tr>
                <th>ID</th>
                <th>Marca</th>
                <th>Color</th>
                <th>Contenido</th>
                <th>Impresora</th>
                <th>Proveedor</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {toners.map((toner) => (
                <tr key={toner.idToner}>
                  <td>{toner.idToner}</td>
                  <td>
                    {editingRow === toner.idToner ? (
                      <input
                        type="text"
                        value={toner.marca}
                        onChange={(e) => handleInputChange(e, toner.idToner, "marca")}
                      />
                    ) : (
                      toner.marca
                    )}
                  </td>
                  <td>
                    {editingRow === toner.idToner ? (
                      <input
                        type="text"
                        value={toner.color || ""}
                        onChange={(e) => handleInputChange(e, toner.idToner, "color")}
                      />
                    ) : (
                      toner.color || "N/A"
                    )}
                  </td>
                  <td>
                    {editingRow === toner.idToner ? (
                      <input
                        type="number"
                        value={toner.contenido}
                        onChange={(e) => handleInputChange(e, toner.idToner, "contenido")}
                      />
                    ) : (
                      toner.contenido
                    )}
                  </td>
                  <td>
                    {editingRow === toner.idToner ? (
                      <input
                        type="text"
                        value={toner.impresora}
                        onChange={(e) => handleInputChange(e, toner.idToner, "impresora")}
                      />
                    ) : (
                      toner.impresora
                    )}
                  </td>
                  <td>
                    {editingRow === toner.idToner ? (
                      <input
                        type="text"
                        value={toner.proveedor || ""}
                        disabled // Solo lectura, asumimos que se usa `rut` en el backend
                      />
                    ) : (
                      toner.proveedor || "N/A"
                    )}
                  </td>
                  <td>
                    {editingRow === toner.idToner ? (
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handleSaveRow(toner)}
                      >
                        Guardar
                      </button>
                    ) : (
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => handleEditRow(toner.idToner)}
                      >
                        Editar
                      </button>
                    )}
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

export default EditarMovimiento;
