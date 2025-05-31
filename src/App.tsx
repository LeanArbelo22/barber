import AppRoutes from "./routes/AppRoutes";

// Libreria de notificaciones
import { Toaster } from "react-hot-toast"; 

function App() {
  return (
    <>
      <AppRoutes />
      <Toaster position='top-center' />
    </>
  );
}

export default App;

// continua en routes/AppRoutes.tsx ...
