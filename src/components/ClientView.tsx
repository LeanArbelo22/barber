import type { Cliente } from "../types";
import Modal from "./Modal";
import styles from "../styles/modal.module.css";

type Props = {
  cliente: Cliente;
  onClose: () => void;
};

// * modal para ver la info de cliente (sin opcion a de editarlo)
function ClientView({ cliente, onClose }: Props) {
  return (
    <Modal onClose={onClose}>
      <div className={styles.formContainer}>
        <h2>Información del Cliente</h2>
        <p>
          <strong>Nombre:</strong> {cliente.nombre}
        </p>
        <p>
          <strong>Apellido:</strong> {cliente.apellido}
        </p>
        <p>
          <strong>DNI:</strong> {cliente.dni}
        </p>
        <p>
          <strong>Teléfono:</strong> {cliente.telefono}
        </p>
        <p>
          <strong>Email:</strong> {cliente.email}
        </p>
        {cliente.notas && (
          <p>
            <strong>Notas:</strong> {cliente.notas}
          </p>
        )}
        <div className={styles.btnGroup}>
          <button onClick={onClose} className={styles.button}>
            Cerrar
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ClientView;
