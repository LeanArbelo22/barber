import Sidebar from "./components/Sidebar";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import ClientsPage from "./pages/ClientsPage";
import TurnosPage from "./pages/TurnosPage";
import EstadisticasPage from "./pages/EstadisticasPage";

function App() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div className='app-container'>
        {/* acá van las rutas */}
        <Routes>
          <Route path='/clientes' element={<ClientsPage />} />
          <Route path='/turnos' element={<TurnosPage />} />
          <Route path='/estadisticas' element={<EstadisticasPage />} />
        </Routes>
      </div>
      <Toaster position='top-center' />
    </div>
  );
}

export default App;
