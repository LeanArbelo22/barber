import { useClientStore } from "../store/clientStore";
import Modal from "./Modal";
import type { Cliente } from "../types";
import toast from "react-hot-toast";
import modalStyles from "../styles/modal.module.css";
import Form from "./Form";

type Props = {
  client: Cliente;
  setClient: (client: Cliente | null) => void;
  form: Omit<Cliente, "id">;
  setForm: (form: Omit<Cliente, "id"> | null) => void;
};

function ClientEdit({client, setClient, form, setForm} : Props) {
  const editarCliente = useClientStore((state) => state.editarCliente);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (form) {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (client && form) {
      const confirmar = window.confirm("¿Confirmas los cambios?");
      if (confirmar) {
        editarCliente(client.id, form);
        toast.success("Cliente actualizado");
        setClient(null);
      }
    }
  };

  return (
    <Modal onClose={() => setClient(null)}>
      <Form
        title='Editar cliente'
        onSubmit={handleSubmit}
        value={form}
        onChange={handleChange}
        className={modalStyles.formContainer}
      >
        <div className={modalStyles.btnGroup}>
          <button type='submit' className={modalStyles.button}>
            Guardar Cambios
          </button>
          <button
            type='button'
            onClick={() => setClient(null)}
            className={`${modalStyles.button} ${modalStyles.secondary}`}
          >
            Cancelar
          </button>
        </div>
      </Form>
    </Modal>
  );
}

export default ClientEdit;
