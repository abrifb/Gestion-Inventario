import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./App.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import IngresarTonner from "./pages/IngresarTonner"; // Componente de ingreso de tóner (Añadido)
import Proveedores from "./pages/Proveedores";


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

  // Ruta protegida: Solo accesible si el usuario está autenticado
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
        {/* Ruta de ingreso de tóner */}
        <Route
          path="/ingresar-tonner"
          element={<ProtectedRoute element={<IngresarTonner />} />} // Ruta protegida para ingresar tóner
        />
        {/* Ruta de PROVEEDORES */}
        <Route
          path="/proveedores"
          element={<ProtectedRoute element={<Proveedores />} />} // Ruta protegida para ingresar tóner
        />
        
      </Routes>
    </Router>
  );
};

export default App;
