import { useState } from "react";
import ClientForm from "../components/ClientForm";
import ClientList from "../components/ClientList";
import styles from "../styles/clientsPage.module.css";
import classNames from "classnames";

const ClientesPage = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h1>CLIENTES</h1>
        <button
          onClick={() => setMostrarFormulario((prev) => !prev)}
          className={classNames(styles.toggleButton, { [styles.cerrar]: mostrarFormulario})}
        >
          {mostrarFormulario ? "Cerrar" : "Nuevo"}
        </button>
      </div>

      <div
        className={classNames(styles.formWrapper, {
          // css modules genera un nombre de clase, para usar el valor real que genero se usan los corchetes [style.clase] en este caso si mostrar formulario es true se le asigna la clase .oculto al contenedor
          [styles.oculto]: !mostrarFormulario,
        })}
      >
        <ClientForm />
      </div>

      <ClientList />
    </div>
  );
};

export default ClientesPage;
