import React, { useState, useEffect } from "react";

const AdministrarUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    rut: "",
    digito_verificador: "",
    nombre: "",
    apellido: "",
    email: "",
    contrasena: "",
    telefono: "",
    cargo: "",
    departamento: 0, // 0 = Soporte por defecto
  });
  const [error, setError] = useState(null);

  // Obtener lista de usuarios al cargar el componente
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch("http://localhost:3000/usuarios");
        if (!response.ok) throw new Error("Error al cargar usuarios");
        const data = await response.json();
        setUsuarios(data);
      } catch (err) {
        console.error("Error al obtener usuarios:", err);
        setError("Error al cargar la lista de usuarios");
      }
    };

    fetchUsuarios();
  }, []);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;

    setNuevoUsuario({
      ...nuevoUsuario,
      [name]: name === "rut" ? parseInt(value, 10) || "" : value, // Convertir RUT a número
    });
  };

  // Agregar un nuevo usuario
  const handleAddUsuario = async () => {
    setError(null);

    // Validar campos obligatorios
    if (
      !nuevoUsuario.rut ||
      !nuevoUsuario.digito_verificador ||
      !nuevoUsuario.nombre ||
      !nuevoUsuario.apellido ||
      !nuevoUsuario.email ||
      !nuevoUsuario.contrasena
    ) {
      setError("Todos los campos obligatorios deben estar completos.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoUsuario),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const usuarioCreado = await response.json();
      setUsuarios([...usuarios, usuarioCreado]);
      setNuevoUsuario({
        rut: "",
        digito_verificador: "",
        nombre: "",
        apellido: "",
        email: "",
        contrasena: "",
        telefono: "",
        cargo: "",
        departamento: 0,
      });
    } catch (err) {
      console.error("Error al agregar usuario:", err);
      setError(err.message || "Error al agregar usuario");
    }
  };

  // Eliminar un usuario
  const handleDeleteUsuario = async (rut) => {
    try {
      const response = await fetch(`http://localhost:3000/usuarios/${rut}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Error al eliminar usuario");

      setUsuarios(usuarios.filter((usuario) => usuario.rut !== rut));
    } catch (err) {
      console.error("Error al eliminar usuario:", err);
      setError("Error al eliminar usuario");
    }
  };

  return (
    <div className="container">
      <h2 className="text-center mt-4">Administrar Usuarios</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* Formulario para agregar usuarios */}
      <div className="card mt-4">
        <div className="card-header bg-primary text-white">
          <h4>Agregar Nuevo Usuario</h4>
        </div>
        <div className="card-body">
          <form>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label>RUT</label>
                <input
                  type="number" // Cambiado a number
                  name="rut"
                  className="form-control"
                  value={nuevoUsuario.rut}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label>Dígito Verificador</label>
                <input
                  type="text"
                  name="digito_verificador"
                  className="form-control"
                  value={nuevoUsuario.digito_verificador}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label>Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  className="form-control"
                  value={nuevoUsuario.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label>Apellido</label>
                <input
                  type="text"
                  name="apellido"
                  className="form-control"
                  value={nuevoUsuario.apellido}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={nuevoUsuario.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label>Contraseña</label>
                <input
                  type="password"
                  name="contrasena"
                  className="form-control"
                  value={nuevoUsuario.contrasena}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label>Teléfono</label>
                <input
                  type="text"
                  name="telefono"
                  className="form-control"
                  value={nuevoUsuario.telefono}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4 mb-3">
                <label>Cargo</label>
                <input
                  type="text"
                  name="cargo"
                  className="form-control"
                  value={nuevoUsuario.cargo}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4 mb-3">
                <label>Departamento</label>
                <select
                  name="departamento"
                  className="form-control"
                  value={nuevoUsuario.departamento}
                  onChange={handleChange}
                >
                  <option value={0}>Soporte</option>
                  <option value={1}>Administrador</option>
                </select>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleAddUsuario}
            >
              Agregar Usuario
            </button>
          </form>
        </div>
      </div>

      {/* Lista de usuarios */}
      <div className="card mt-4">
        <div className="card-header bg-primary text-white">
          <h4>Lista de Usuarios</h4>
        </div>
        <div className="card-body">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>RUT</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Cargo</th>
                <th>Departamento</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.rut}>
                  <td>{usuario.rut}</td>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.apellido}</td>
                  <td>{usuario.email}</td>
                  <td>{usuario.telefono || "N/A"}</td>
                  <td>{usuario.cargo || "N/A"}</td>
                  <td>{usuario.departamento === 1 ? "Administrador" : "Soporte"}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteUsuario(usuario.rut)}
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
