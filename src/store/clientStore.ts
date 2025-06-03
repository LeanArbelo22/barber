// zustand sirve para manejar el estado de la aplicacion de manera global (para no estar pasando estados de componente en componente)
import { create } from "zustand";

// uuid sirve para crear ids unicos de forma aleatoria
import { v4 as uuidv4 } from "uuid";
import type { Cliente } from "../types";

import { clientes as dataClientes } from "../data";

// creamos la interfaz del estado Cliente que va a manejar la app (incluye la DECLARACION del listado de clientes y de las funciones de ABM), solamente le decimos que va a tener
interface ClientState {
  // arreglo de tipo Cliente en donde se van a guardar los clientes (esto se enviaria a la base de datos si hubiera una)
  clientes: Cliente[];

  // la funcion de agregar recibe un objeto de tipo Cliente pero omite el id porque lo creamos nosotros (no lo ingresa el usuario ni lo pasa el componente), Omit permite recibir un objeto de tipo cliente sin id (si no usara Omit, deberiamos mandar el id desde el componente, porque es obligatorio en el tipo Cliente)
  agregarCliente: (cliente: Omit<Cliente, "id">) => void;

  // para eliminar el cliente recibimos solamente su id
  eliminarCliente: (id: string) => void;

  // para editarlo se necesita el id y los datos a modificar, como no queremos editar todos los datos usamos Partial<Cliente> para decirle a ts que no necesitamos obligatoriamente todos los datos (Partial convierte los atributos de la interfaz en opcionales)
  editarCliente: (id: string, datos: Partial<Cliente>) => void;
}

// useClientStore es un hook (una funcion especial, busquen que es un hook de react), lo vamos a usar en los componentes para acceder al estado y modificarlo
export const useClientStore = create<ClientState>((set) => ({
  // este es el estado inicial (un listado de clientes inventados, si hubiera base de datos deberiamos cargarlos antes aca)
  clientes: dataClientes,

  // aca IMPLEMENTAMOS las funciones de ABM que se decalraron en la interfaz del estado
  agregarCliente: (cliente) =>
    set((state) => ({
      clientes: [...state.clientes, { ...cliente, id: uuidv4() }],
    })),
  eliminarCliente: (id) =>
    set((state) => ({
      clientes: state.clientes.filter((cliente) => cliente.id !== id),
    })),
  editarCliente: (id, datos) =>
    set((state) => ({
      clientes: state.clientes.map((cliente) =>
        cliente.id === id ? { ...cliente, ...datos } : cliente
      ),
    })),
}));

/* 
    en react, algo importante es que el estado es inmutable, si vos le haces un cambio directamente no lo va a detectar 
    y por ende no se va a actualizar en la pagina.
    esto lo menciono para justificar porque no hacemos un state.clientes.push(cliente) al array de clientes, al hacer eso
    se esta modificando (mutando) el estado, para poder modificarlo correctamente en realidad hay que reemplazarlo, lo que hacemos es basicamente crear un nuevo array con los datos ya existentes + los nuevos (una copia del array anterior de clientes + el cliente nuevo)

    esta linea de codigo se encarga de agregar un nuevo cliente al listado: 
    clientes: [...state.clientes, { ...cliente, id: uuidv4() }]

    lo que se esta usando se llama SPREAD OPERATOR (son los tres puntitos antes del nombre de las variables)

    [...state.clientes = copia todos los datos existentes en el array original de clientes en un nuevo array
    , { ...cliente, id: uuidv4() } = ademas de copiar los datos existentes en el array, agrega un nuevo cliente {}, trae toda la info del cliente desde el componente {...cliente}, excepto el id que lo estamos creando nosotros , id: uuidv4()}]

    en eliminar cliente no es necesario el spread porque la funcion filter devuelve un NUEVO array con los clientes que cumplen la condicion dada (en este caso, todos los clientes que no coincidan con el id dado, que es el que se quiere eliminar)

    en editar cliente hacemos un map del listado (recorremos cada cliente) buscando el que coincida con el id dado (a su vez, map devuelve un nuevo array)

    esta linea de codigo utiliza el operador ternario y el spread operator
    cliente.id === id ? { ...cliente, ...datos } : cliente

    el operador ternario es otra forma de hacer un IF
    es el equivalente a:

    if (cliente.id === id) {
      return {... cliente, ...datos }
    } else {
      return cliente
    }

    CONDICION ? TRUE : FALSE (basicamente)

    en este caso si el id del cliente coincide con el id del cliente que se busca modificar, entonces

    {...cliente = copiamos todos los datos del cliente original
    , ...datos} = pero sobreescribimos con los nuevos datos
*/
