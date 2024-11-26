import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React, { useState } from "react";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
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

  const handleLogin = async (username, password) => {
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombreUsuario: username,
          contrasena: password,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.error);
        return;
      }

      const data = await response.json();
      console.log("Usuario autenticado:", data.usuario);
      setIsAuthenticated(true); // Cambiamos el estado a autenticado si el login es exitoso
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Error al conectar con el servidor");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false); // Cambiamos el estado a no autenticado al cerrar sesión
  };

  return (
    <Router>
      <Routes>
        {/* Ruta principal: Login o redirección al Dashboard */}
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
          element={
            isAuthenticated ? (
              <Dashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        {/* Ruta para Ceder Tonner */}
        <Route
          path="/ceder-tonner"
          element={
            isAuthenticated ? (
              <CederTonner />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        {/* Ruta para Ingresar Tonner */}
        <Route
          path="/ingresar-tonner"
          element={
            isAuthenticated ? (
              <IngresarTonner /> // Nuevo componente "Ingresar Tonner"
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/editar-tonner"
          element={
            isAuthenticated ? <EditarMovimiento /> : <Navigate to="/" />
          }
        />
        <Route
          path="/prestar-proyector"
          element={isAuthenticated ? <PrestarProyector /> : <Navigate to="/" />}
        />
        <Route
          path="/ingresar-proyector"
          element={isAuthenticated ? <IngresarProyector /> : <Navigate to="/" />}
        />
        {/* Redirección para rutas no existentes */}
        <Route path="*" element={<Navigate to="/" />} 
        />
        <Route
          path="/mantenimiento-proyector"
          element={isAuthenticated ? <MantenimientoProyector /> : <Navigate to="/" />}
        />
        <Route
          path="/editar-movimiento-proyector"
          element={
            isAuthenticated ? (
              <EditarEliminarMovimientoProyectores />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/administrar-usuarios"
          element={
            isAuthenticated ? (
              <AdministrarUsuarios />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/reportes"
          element={isAuthenticated ? 
          <Reportes /> : <Navigate to="/" />}
      />
        <Route
          path="/proveedores"
          element={
            isAuthenticated ? (
              <Proveedores />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
