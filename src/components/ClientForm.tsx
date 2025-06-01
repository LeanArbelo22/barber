import { useClientStore } from "../store/clientStore";
import toast from "react-hot-toast";
import styles from "../styles/form.module.css";
import btnStyles from "../styles/button.module.css";
import Form from "./Form";
import { useClientForm } from "../hooks/useClientForm";

const ClientForm = () => {
  // * traemos la funcion de agregar cliente desde el clientStore
  const agregarCliente = useClientStore((state) => state.agregarCliente);
  const { form, handleChange, resetForm, validar } = useClientForm();

  // * handleSubmit se encarga de cargar los datos ingresados en en el ESTADO GLOBAL de la app (que previamente cargamos en el estado form)
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // evita el comportamiento por defecto al enviar un formulario

    // * usamos la validacion de telefono / email
    if (!validar()) {
      toast.error("Correo o telefono invalido");
      return;
    }

    // * si supera la validación agrega el cliente al estado global
    agregarCliente(form);
    toast.success("Cliente creado correctamente");
    resetForm();
  };

  return (
    <Form
      title='Agregar un nuevo cliente'
      onSubmit={handleSubmit}
      onChange={handleChange}
      value={form}
      className={styles.formContainer}
    >
      <button type='submit' className={btnStyles.button}>
        Agregar
      </button>
    </Form>
  );
};

export default ClientForm;
