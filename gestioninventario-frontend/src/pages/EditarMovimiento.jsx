import React, { useState } from "react";
import "../styles/EditarMovimiento.css";

const EditarMovimiento = () => {
  const [movimientos, setMovimientos] = useState([
    { fecha: "2024-11-01", tipo: "Entrada", cantidad: 15 },
    { fecha: "2024-11-10", tipo: "Salida", cantidad: 5 },
    { fecha: "2024-11-15", tipo: "Mantenimiento", cantidad: 2 },
  ]);

  const [form, setForm] = useState({
    fecha: "",
    tipo: "",
    cantidad: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const agregarMovimiento = () => {
    if (form.fecha && form.tipo && form.cantidad) {
      setMovimientos((prevMovimientos) => [...prevMovimientos, form]);
      setForm({ fecha: "", tipo: "", cantidad: "" });
    } else {
      alert("Por favor, complete todos los campos.");
    }
  };

  const eliminarMovimiento = (index) => {
    const nuevosMovimientos = movimientos.filter((_, i) => i !== index);
    setMovimientos(nuevosMovimientos);
  };

  const editarMovimiento = (index) => {
    const movimientoSeleccionado = movimientos[index];
    setForm(movimientoSeleccionado);

    const nuevosMovimientos = movimientos.filter((_, i) => i !== index);
    setMovimientos(nuevosMovimientos);
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-danger text-white text-center">
          <h3>Editar/Eliminar Movimientos</h3>
        </div>
        <div className="card-body">
          <form id="movimientosForm">
            <div className="mb-3">
              <label htmlFor="fecha" className="form-label">
                Fecha
              </label>
              <input
                type="date"
                className="form-control"
                id="fecha"
                value={form.fecha}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="tipo" className="form-label">
                Tipo de Movimiento
              </label>
              <input
                type="text"
                className="form-control"
                id="tipo"
                placeholder="Ej. Entrada, Salida, Mantenimiento"
                value={form.tipo}
                onChange={handleInputChange}
                maxLength="50"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="cantidad" className="form-label">
                Cantidad
              </label>
              <input
                type="number"
                className="form-control"
                id="cantidad"
                placeholder="Ingrese la cantidad"
                value={form.cantidad}
                onChange={handleInputChange}
                min="1"
                required
              />
            </div>
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-secondary me-2"
                onClick={() => setForm({ fecha: "", tipo: "", cantidad: "" })}
              >
                Limpiar
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={agregarMovimiento}
              >
                Guardar Movimiento
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="mt-4">
        <h4>Movimientos Existentes</h4>
        <table className="table table-bordered table-hover">
          <thead className="table-danger">
            <tr>
              <th>Fecha</th>
              <th>Tipo</th>
              <th>Cantidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody id="listaMovimientos">
            {movimientos.map((movimiento, index) => (
              <tr key={index}>
                <td>{movimiento.fecha}</td>
                <td>{movimiento.tipo}</td>
                <td>{movimiento.cantidad}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => editarMovimiento(index)}
                  >
                    Editar
                  </button>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EditarMovimiento;
