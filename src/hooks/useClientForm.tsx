import { useState } from "react";
import type { Cliente } from "../types";

// hice el hook para no repetir logica en los componentes ClientForm y ClientEdit
export function useClientForm(initial?: Omit<Cliente, "id">) {
  // * creamos el estado form que va a tener un objeto con toda la info ingresada en el formulario (luego la usamos para cargar en el array de clientes)
  const [form, setForm] = useState<Omit<Cliente, "id">>(
    initial ?? {
      nombre: "",
      apellido: "",
      dni: "",
      telefono: "",
      email: "",
      notas: "",
    }
  );

  // * handleChange detecta la info ingresada en el formulario y la carga en el ESTADO DE FORM (no en el global)
  // * React.ChangeEvent<HTMLInputElement> es el TIPO de dato de un evento onChange de React
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // * los inputs entre sus atributos tienen un name (lo ponemos en el "html") y un value (el valor ingresado por el usuario)
    const { name, value } = e.target;

    /*
     * para entender mejor esta linea vean el archivo de store/clientStore donde explico el spread operator
     * (prev) es el valor previo del estado
     * { ...prev, [name]: value } traemos los valores previos y actualizamos campo por campo
     * [name]: value es una propiedad dinamica, basicamente "pone como clave del objeto el valor de name y asignale el value" */
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // * borra todos los campos del formulario
  const resetForm = () => {
    setForm({
      nombre: "",
      apellido: "",
      dni: "",
      telefono: "",
      email: "",
      notas: "",
    });
  };

  // * para validar que los datos de correo y telefono sean validos, ademas de usar los types "email" y "tel" en los inputs, usamos expresiones regulares (regex), que es como una formula que verifica si la info ingresada cumple ciertos requisitos o un patron, los regex se escriben: /patron/
  const validar = () => {
    const emailRegex = /\S+@\S+\.\S+/; // algo@algo.algo
    const telRegex = /^[0-9]{6,15}$/; // solo numeros y que tenga entre 6 y 15 digitos
    return emailRegex.test(form.email) && telRegex.test(form.telefono); // true o false
  };

  return { form, setForm, handleChange, resetForm, validar };
}
