import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Proveedores from './pages/Proveedores'; // Importa el componente Proveedores

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta para la página de Proveedores */}
        <Route path="/proveedores" element={<Proveedores />} />

        {/* Ruta principal */}
        <Route
          path="/"
          element={
            <>
              <div>
                <a href="https://vite.dev" target="_blank">
                  <img src="/vite.svg" className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                  <img
                    src="/react.svg"
                    className="logo react"
                    alt="React logo"
                  />
                </a>
              </div>
              <h1>Vite + React</h1>
              <div className="card">
                <p>Bienvenido a la aplicación de gestión de inventario</p>
              </div>
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
