import { useClientStore } from "../store/clientStore";
import Modal from "./Modal";
import type { Cliente } from "../types";
import toast from "react-hot-toast";
import styles from "../styles/modal.module.css";
import btnStyles from "../styles/button.module.css";
import Form from "./Form";
import { useClientForm } from "../hooks/useClientForm";

type Props = {
  client: Cliente;
  setClient: (client: Cliente | null) => void;
};

// * formulario modal de editar cliente
function ClientEdit({client, setClient} : Props) {
  // funcion de editar cliente en estado global de la app
  const editarCliente = useClientStore((state) => state.editarCliente);
  // hook
  const { form, handleChange } = useClientForm(client);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const confirmar = window.confirm("Confirmas los cambios?");
    if (confirmar) {
      editarCliente(client.id, form);
      toast.success("Cliente actualizado");
      setClient(null);
    }
  };

  return (
    <Modal onClose={() => setClient(null)}>
      <Form
        title='Editar cliente'
        onSubmit={handleSubmit}
        value={form}
        onChange={handleChange}
        className={styles.formContainer}
      >
        <div className={styles.btnGroup}>
          <button type='submit' className={btnStyles.button}>
            Guardar Cambios
          </button>
          <button
            type='button'
            onClick={() => setClient(null)}
            className={`${btnStyles.button} ${btnStyles.secondary}`}
          >
            Cancelar
          </button>
        </div>
      </Form>
    </Modal>
  );
}

export default ClientEdit;
