// aca empieza la app
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/globals.css";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// react-router-dom es un enrutador de react, permite la navegacion entre rutas de una app web, todos los componentes dentro del browserRouter pueden crear y usar las rutas
// continua en App.tsx ...
