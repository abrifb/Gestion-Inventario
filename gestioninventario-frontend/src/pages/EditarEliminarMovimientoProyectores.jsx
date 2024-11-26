import React, { useState } from "react";
import "../styles/EditarEliminarMovimientoProyectores.css";

const EditarEliminarMovimientoProyectores = () => {
  const [movimientos, setMovimientos] = useState([
    { fecha: "2024-11-20", tipo: "Préstamo", cantidad: 2 },
    { fecha: "2024-11-21", tipo: "Ingreso", cantidad: 5 },
    { fecha: "2024-11-22", tipo: "Mantenimiento", cantidad: 1 },
  ]);

  const handleEdit = (index) => {
    const updatedMovimientos = [...movimientos];
    updatedMovimientos[index].isEditable = !updatedMovimientos[index].isEditable;
    setMovimientos(updatedMovimientos);
  };

  const handleSave = (index, field, value) => {
    const updatedMovimientos = [...movimientos];
    updatedMovimientos[index][field] = value;
    setMovimientos(updatedMovimientos);
  };

  const handleDelete = (index) => {
    const updatedMovimientos = movimientos.filter((_, i) => i !== index);
    setMovimientos(updatedMovimientos);
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-info text-white text-center">
          <h3>Editar/Eliminar Movimiento de Proyectores</h3>
        </div>
        <div className="card-body">
          <table className="table table-bordered table-hover">
            <thead className="table-info">
              <tr>
                <th>Fecha</th>
                <th>Tipo</th>
                <th>Cantidad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {movimientos.map((movimiento, index) => (
                <tr key={index}>
                  <td>
                    {movimiento.isEditable ? (
                      <input
                        type="date"
                        value={movimiento.fecha}
                        onChange={(e) =>
                          handleSave(index, "fecha", e.target.value)
                        }
                      />
                    ) : (
                      movimiento.fecha
                    )}
                  </td>
                  <td>
                    {movimiento.isEditable ? (
                      <input
                        type="text"
                        value={movimiento.tipo}
                        onChange={(e) =>
                          handleSave(index, "tipo", e.target.value)
                        }
                      />
                    ) : (
                      movimiento.tipo
                    )}
                  </td>
                  <td>
                    {movimiento.isEditable ? (
                      <input
                        type="number"
                        value={movimiento.cantidad}
                        onChange={(e) =>
                          handleSave(index, "cantidad", e.target.value)
                        }
                      />
                    ) : (
                      movimiento.cantidad
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(index)}
                    >
                      {movimiento.isEditable ? "Guardar" : "Editar"}
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(index)}
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

export default EditarEliminarMovimientoProyectores;
