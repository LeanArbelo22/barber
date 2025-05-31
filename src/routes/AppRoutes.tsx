import { Routes, Route } from "react-router-dom";
import ClientsPage from "../pages/ClientsPage";

const AppRoutes = () => (
  <Routes>
    <Route path='/' element={<ClientsPage />} />
  </Routes>
);

export default AppRoutes;
