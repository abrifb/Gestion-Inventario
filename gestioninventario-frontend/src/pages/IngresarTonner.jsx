import React, { useState } from "react";
import "../styles/IngresarTonner.css";

const IngresarTonner = () => {
  const [tonners, setTonners] = useState([]);

  const handleAddTonner = (e) => {
    e.preventDefault();

    const nombre = e.target.nombre.value;
    const descripcion = e.target.descripcion.value;
    const precio = parseFloat(e.target.precio.value).toFixed(2);
    const stock = parseInt(e.target.stock.value, 10);
    const fechaIngreso = e.target.fechaIngreso.value;

    if (!nombre || !descripcion || !precio || !stock || !fechaIngreso) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    setTonners([
      ...tonners,
      { nombre, descripcion, precio, stock, fechaIngreso },
    ]);

    e.target.reset();
  };

  return (
    <div className="container mt-5 ingresar-tonner-container">
      <div className="card shadow">
        <div className="card-header bg-success text-white text-center">
          <h3>Ingreso de Tóner al Inventario</h3>
        </div>
        <div className="card-body">
          <form id="ingresoForm" onSubmit={handleAddTonner}>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">
                Nombre del Tóner
              </label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                name="nombre"
                placeholder="Ingrese el nombre del tóner"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="descripcion" className="form-label">
                Descripción
              </label>
              <textarea
                className="form-control"
                id="descripcion"
                name="descripcion"
                rows="3"
                placeholder="Ingrese una descripción del tóner"
                required
              ></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="precio" className="form-label">
                Precio
              </label>
              <input
                type="number"
                className="form-control"
                id="precio"
                name="precio"
                placeholder="Ingrese el precio del tóner"
                step="0.01"
                min="0"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="stock" className="form-label">
                Stock Actual
              </label>
              <input
                type="number"
                className="form-control"
                id="stock"
                name="stock"
                placeholder="Ingrese la cantidad en stock"
                min="0"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="fechaIngreso" className="form-label">
                Fecha de Ingreso
              </label>
              <input
                type="date"
                className="form-control"
                id="fechaIngreso"
                name="fechaIngreso"
                required
              />
            </div>

            <div className="d-flex justify-content-end">
              <button type="reset" className="btn btn-secondary me-2">
                Limpiar
              </button>
              <button type="submit" className="btn btn-success">
                Ingresar al Inventario
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="mt-4">
        <h4>Lista de Ingresos</h4>
        <table className="table table-bordered table-hover">
          <thead className="table-success">
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Fecha de Ingreso</th>
            </tr>
          </thead>
          <tbody>
            {tonners.map((tonner, index) => (
              <tr key={index}>
                <td>{tonner.nombre}</td>
                <td>{tonner.descripcion}</td>
                <td>${tonner.precio}</td>
                <td>{tonner.stock}</td>
                <td>{tonner.fechaIngreso}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IngresarTonner;
