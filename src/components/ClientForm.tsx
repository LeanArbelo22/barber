import { useState } from "react";
import { useClientStore } from "../store/clientStore";
import toast from "react-hot-toast";
import styles from "../styles/form.module.css";
import btnStyles from "../styles/button.module.css";
import Form from "./Form";

const ClientForm = () => {
  // * traemos la funcion de agregar cliente desde el clientStore
  const agregarCliente = useClientStore((state) => state.agregarCliente);

  // * creamos el estado form que va a tener un objeto con toda la info ingresada en el formulario (luego la usamos para cargar en el array de clientes)
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    telefono: "",
    email: "",
    notas: "",
  });

  // * handleChange detecta la info ingresada en el formulario y la carga en el ESTADO DE FORM (no en el global)
  // * React.ChangeEvent<HTMLInputElement> es el TIPO de dato de un evento onChange de React
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // * los inputs entre sus atributos tienen un name (lo ponemos en el "html") y un value (el valor ingresado por el usuario)
    const { name, value } = event.target;

    /*
     * para entender mejor esta linea vean el archivo de store/clientStore donde explico el spread operator
     * (prev) es el valor previo del estado
     * { ...prev, [name]: value } traemos los valores previos y actualizamos campo por campo
     * [name]: value es una propiedad dinamica, basicamente "pone como clave del objeto el valor de name y asignale el value" */
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // * para validar que los datos de correo y telefono sean validos, ademas de usar los types "email" y "tel" en los inputs, usamos expresiones regulares (regex), que es como una formula que verifica si la info ingresada cumple ciertos requisitos o un patron, los regex se escriben: /patron/
  const validarFormulario = () => {
    const emailRegex = /\S+@\S+\.\S+/; // algo@algo.algo
    const telRegex = /^[0-9]{6,15}$/; // solo numeros y que tenga entre 6 y 15 digitos
    return emailRegex.test(form.email) && telRegex.test(form.telefono); // true o false
  };

  // * handleSubmit se encarga de cargar los datos ingresados en en el ESTADO GLOBAL de la app (que previamente cargamos en el estado form)
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // evita el comportamiento por defecto al enviar un formulario

    // * usamos la validacion de telefono / email
    if (!validarFormulario()) {
      toast.error("Correo o telefono invalido");
      return;
    }

    // * si supera la validación agrega el cliente al estado global
    agregarCliente(form);
    toast.success("Cliente creado correctamente");

    // * borra todos los campos del formulario
    setForm({
      nombre: "",
      apellido: "",
      dni: "",
      telefono: "",
      email: "",
      notas: "",
    });
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
