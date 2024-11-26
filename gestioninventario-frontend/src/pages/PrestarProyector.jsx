import React, { useState } from "react";
import "../styles/PrestarProyector.css";

const PrestarProyector = () => {
  const [proyectores, setProyectores] = useState([
    {
      modelo: "BenQ TK850",
      resolucion: "3840x2160",
      luminosidad: "3000 lúmenes",
      tipoPantalla: "DLP",
    },
    {
      modelo: "Epson EH-TW7100",
      resolucion: "1920x1080",
      luminosidad: "3200 lúmenes",
      tipoPantalla: "LCD",
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const nuevoProyector = {
      modelo: formData.get("modelo"),
      resolucion: formData.get("resolucion"),
      luminosidad: formData.get("luminosidad"),
      tipoPantalla: formData.get("tipoPantalla"),
    };

    if (
      nuevoProyector.modelo &&
      nuevoProyector.resolucion &&
      nuevoProyector.luminosidad &&
      nuevoProyector.tipoPantalla
    ) {
      setProyectores((prevProyectores) => [...prevProyectores, nuevoProyector]);
      e.target.reset();
    } else {
      alert("Por favor, complete todos los campos.");
    }
  };

  const devolverProyector = (index) => {
    setProyectores((prevProyectores) =>
      prevProyectores.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-warning text-white text-center">
          <h3>Prestar Proyector</h3>
        </div>
        <div className="card-body">
          <form id="prestarProyectorForm" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="modelo" className="form-label">
                Modelo
              </label>
              <input
                type="text"
                className="form-control"
                id="modelo"
                name="modelo"
                placeholder="Ingrese el modelo del proyector"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="resolucion" className="form-label">
                Resolución
              </label>
              <input
                type="text"
                className="form-control"
                id="resolucion"
                name="resolucion"
                placeholder="Ej. 1920x1080"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="luminosidad" className="form-label">
                Luminosidad
              </label>
              <input
                type="text"
                className="form-control"
                id="luminosidad"
                name="luminosidad"
                placeholder="Ej. 3000 lúmenes"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="tipoPantalla" className="form-label">
                Tipo de Pantalla
              </label>
              <input
                type="text"
                className="form-control"
                id="tipoPantalla"
                name="tipoPantalla"
                placeholder="Ej. LCD, DLP"
                required
              />
            </div>
            <div className="d-flex justify-content-end">
              <button type="reset" className="btn btn-secondary me-2">
                Limpiar
              </button>
              <button type="submit" className="btn btn-primary">
                Prestar
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="mt-4">
        <h4>Proyectores Prestados</h4>
        <table className="table table-bordered table-hover">
          <thead className="table-warning">
            <tr>
              <th>Modelo</th>
              <th>Resolución</th>
              <th>Luminosidad</th>
              <th>Tipo de Pantalla</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {proyectores.map((proyector, index) => (
              <tr key={index}>
                <td>{proyector.modelo}</td>
                <td>{proyector.resolucion}</td>
                <td>{proyector.luminosidad}</td>
                <td>{proyector.tipoPantalla}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => devolverProyector(index)}
                  >
                    Devolver
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

export default PrestarProyector;
