import { useState } from "react";
import ClientForm from "../components/ClientForm";
import ClientsList from "../components/ClientsList";
import styles from "../styles/clientsPage.module.css";
import btnStyles from "../styles/button.module.css";

const ClientsPage = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h1>CLIENTES</h1>
        <button
          onClick={() => setMostrarFormulario((prev) => !prev)}
          className={`${btnStyles.button} ${
            mostrarFormulario && btnStyles.danger
          }`}
        >
          {mostrarFormulario ? "Cerrar" : "Nuevo"}
        </button>
      </div>

      <div
        className={`${styles.formWrapper} ${
          !mostrarFormulario && styles.oculto
        }`}
      >
        <ClientForm />
      </div>

      <ClientsList />
    </div>
  );
};

export default ClientsPage;
