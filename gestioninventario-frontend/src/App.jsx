import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./styles/Login.css"; // Ruta correcta para los estilos globales
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CederTonner from "./pages/CederTonner";
import IngresarTonner from "./pages/IngresarTonner";
import EditarMovimiento from "./pages/EditarMovimiento";
import PrestarProyector from "./pages/PrestarProyector";
import IngresarProyector from "./pages/IngresarProyector";
import MantenimientoProyector from "./pages/MantenimientoProyector";
import EditarEliminarMovimientoProyectores from "./pages/EditarEliminarMovimientoProyectores";
import AdministrarUsuarios from "./pages/AdministrarUsuarios";
import Proveedores from "./pages/Proveedores";
import Reportes from "./pages/Reportes";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verifica el token en el localStorage al cargar la aplicación
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = async (data) => {
    setIsAuthenticated(true); // Cambiar estado a autenticado
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Eliminar token del localStorage
    setIsAuthenticated(false); // Cambiar estado a no autenticado
  };

  const ProtectedRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/" />;
  };

  return (
    <Router>
      <Routes>
        {/* Ruta principal */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />

        {/* Ruta del Dashboard */}
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<Dashboard onLogout={handleLogout} />} />}
        />

        {/* Rutas relacionadas con Tonner */}
        <Route
          path="/ceder-tonner"
          element={<ProtectedRoute element={<CederTonner />} />}
        />
        <Route
          path="/ingresar-tonner"
          element={<ProtectedRoute element={<IngresarTonner />} />}
        />
        <Route
          path="/editar-tonner"
          element={<ProtectedRoute element={<EditarMovimiento />} />}
        />

        {/* Rutas relacionadas con Proyector */}
        <Route
          path="/prestar-proyector"
          element={<ProtectedRoute element={<PrestarProyector />} />}
        />
        <Route
          path="/ingresar-proyector"
          element={<ProtectedRoute element={<IngresarProyector />} />}
        />
        <Route
          path="/mantenimiento-proyector"
          element={<ProtectedRoute element={<MantenimientoProyector />} />}
        />
        <Route
          path="/editar-movimiento-proyector"
          element={<ProtectedRoute element={<EditarEliminarMovimientoProyectores />} />}
        />

        {/* Rutas de Administración */}
        <Route
          path="/administrar-usuarios"
          element={<ProtectedRoute element={<AdministrarUsuarios />} />}
        />
        <Route
          path="/proveedores"
          element={<ProtectedRoute element={<Proveedores />} />}
        />
        <Route
          path="/reportes"
          element={<ProtectedRoute element={<Reportes />} />}
        />

        {/* Redirección global para rutas no existentes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
