import React, { useState, useEffect } from "react";
import "../styles/CederTonner.css";

const CederTonner = () => {
  const [tonners, setTonners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTonners = async () => {
      try {
        const response = await fetch("http://localhost:3000/toners");
        if (!response.ok) {
          throw new Error("Error al cargar tóneres");
        }
        const data = await response.json();
        setTonners(data);
      } catch (error) {
        console.error("Error al obtener tóneres:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTonners();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const newTonner = {
      marca: formData.get("marca"),
      color: formData.get("color"),
      contenido: parseInt(formData.get("contenido"), 10),
      impresora: formData.get("impresora"),
    };

    try {
      const response = await fetch("http://localhost:3000/toners", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTonner),
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.error);
        return;
      }

      const savedTonner = await response.json();
      setTonners((prevTonners) => [...prevTonners, savedTonner]);
      e.target.reset();
    } catch (error) {
      console.error("Error al agregar tóner:", error);
      alert("Error al conectar con el servidor");
    }
  };

  if (loading) {
    return <p>Cargando tóneres...</p>;
  }

  return (
    <div className="container">
      <div className="card shadow">
        <div className="card-header text-center">
          <h3>Registro de Movimiento - Ceder Tonner</h3>
        </div>
        <div className="card-body">
          <form id="cederTonnerForm" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="marca" className="form-label">
                Marca:
              </label>
              <input
                type="text"
                id="marca"
                name="marca"
                className="form-control"
                placeholder="Ej: HP"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="color" className="form-label">
                Color:
              </label>
              <input
                type="text"
                id="color"
                name="color"
                className="form-control"
                placeholder="Ej: Negro"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="contenido" className="form-label">
                Contenido (ml):
              </label>
              <input
                type="number"
                id="contenido"
                name="contenido"
                className="form-control"
                placeholder="Ej: 250"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="impresora" className="form-label">
                Impresora:
              </label>
              <input
                type="text"
                id="impresora"
                name="impresora"
                className="form-control"
                placeholder="Ej: LaserJet 1200"
                required
              />
            </div>
            <button type="submit" className="btn btn-success w-100">
              Ceder
            </button>
          </form>
        </div>
      </div>

      <div className="row justify-content-center mt-5 tonner-list">
        <div className="col-md-10">
          <h3 className="text-center">Tóneres Disponibles</h3>
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>Marca</th>
                <th>Color</th>
                <th>Cantidad</th>
                <th>Impresora</th>
              </tr>
            </thead>
            <tbody>
              {tonners.map((tonner) => (
                <tr key={tonner.idToner}>
                  <td>{tonner.marca}</td>
                  <td>{tonner.color}</td>
                  <td>{tonner.contenido}</td>
                  <td>{tonner.impresora}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CederTonner;
