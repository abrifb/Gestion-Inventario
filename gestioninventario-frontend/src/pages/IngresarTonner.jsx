import React, { useState } from "react";
import "../styles/IngresarTonner.css";

const IngresarTonner = () => {
  const [tonners, setTonners] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleAddTonner = async (e) => {
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

    // Crear objeto para enviar al backend
    const nuevoToner = {
      marca: nombre,
      contenido: descripcion,
      impresora: "Genérica", // Puedes adaptarlo según tus necesidades
      rut: "12345678-9", // Cambia por un valor dinámico si es necesario
      stock, // Puedes eliminar esta línea si no es relevante para el backend
    };

    try {
      // Solicitud POST al backend
      const response = await fetch("http://localhost:3000/toners", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoToner),
      });

      if (!response.ok) {
        const error = await response.json();
        setErrorMessage(error.error || "Error al agregar el tóner");
        return;
      }

      const data = await response.json();
      setTonners([...tonners, { nombre, descripcion, precio, stock, fechaIngreso }]);
      setSuccessMessage("Tóner agregado correctamente");
      e.target.reset(); // Limpiar formulario
    } catch (error) {
      console.error("Error al agregar tóner:", error);
      setErrorMessage("Error al conectar con el servidor.");
    }
  };

  return (
    <div className="container mt-5 ingresar-tonner-container">
      <div className="card shadow">
        <div className="card-header bg-success text-white text-center">
          <h3>Ingreso de Tóner al Inventario</h3>
        </div>
        <div className="card-body">
          {/* Mensajes de éxito o error */}
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          {successMessage && <p className="text-success">{successMessage}</p>}

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
