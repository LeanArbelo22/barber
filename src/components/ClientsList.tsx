import { useState } from "react";
import { useClientStore } from "../store/clientStore";
import Modal from "./Modal";
import type { Cliente } from "../types";
import toast from "react-hot-toast";
import styles from "../styles/clientList.module.css";
import buttonStyles from "../styles/button.module.css";
import ClientEdit from "./ClientEdit";
import ClientActions from "./ClientActions";
import ClientView from "./ClientView";
import { useTurnoStore } from "../store/turnoStore";
import { useNavigate } from "react-router-dom";

// * listado de clientes con botones de accion
function ClientsList() {
  // estado global clientes
  const clientes = useClientStore((state) => state.clientes);
  // aca deberiamos traer la funcion de deshabilitar (no desarrollada)
  // ! const eliminarCliente = useClientStore((state) => state.eliminarCliente);

  // estado global de turnos, se usa para pasar el cliente seleccionado al componente de turnos desde el listado de clientes
  const turnoStore = useTurnoStore();
  const navigate = useNavigate(); // para navegar a /turnos cuando hacen click en nuevo turno

  // * estados necesarios para abrir los modales de las acciones del listado (apuntar las acciones al cliente seleccionado)
  const [selectedClient, setSelectedClient] = useState<Cliente | null>(null);
  const [editForm, setEditForm] = useState<Omit<Cliente, "id"> | null>(null);
  const [historial, setHistorial] = useState<Cliente | null>(null);
  const [viewClient, setViewClient] = useState<Cliente | null>(null);

  // logica del buscador
  const [dataBuscador, setDataBuscador] = useState("");
  const [resultados, setResultados] = useState<Cliente[]>(clientes);

  // para que no discrimine acentos, minusculas o mayusculas
  const normalizar = (texto: string) =>
    texto
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  const buscar = () => {
    const texto = normalizar(dataBuscador.trim()); // normalizamos el texto ingresado por el usuario

    // filtramos segun dni, nombre o apellido
    const filtrados = clientes.filter(
      (c) =>
        c.dni.includes(texto) ||
        c.nombre.toLowerCase().includes(texto) ||
        c.apellido.toLowerCase().includes(texto)
    );

    setResultados(filtrados);
  };

  const onChangeBuscador = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataBuscador(e.target.value);
  };

  const limpiarFiltro = () => {
    setDataBuscador("");
    setResultados(clientes);
  };

  if (clientes.length === 0) {
    return (
      <div>
        <h4>No hay clientes registrados.</h4>
      </div>
    );
  }

  return (
    <div>
      <h2>Listado</h2>
      <div className={styles.filters}>
        <input
          type='text'
          placeholder='Buscar por DNI, nombre o apellido'
          value={dataBuscador}
          onChange={onChangeBuscador}
        />
        <button onClick={buscar}>Buscar</button>
        <button className={buttonStyles.danger} onClick={limpiarFiltro}>
          Borrar
        </button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th colSpan={2}>Cliente</th>
            <th colSpan={5}>Acciones</th>
          </tr>
          <tr>
            <th>DNI</th>
            <th>Nombre</th>
            <th>Ver</th>
            <th>Editar</th>
            <th>Historial</th>
            <th>Deshabilitar</th>
            <th>Nuevo Turno</th>
          </tr>
        </thead>
        <tbody>
          {resultados.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.dni}</td>
              <td>
                {cliente.nombre} {cliente.apellido}
              </td>
              <ClientActions
                cliente={cliente}
                onVer={setViewClient}
                onEditar={(cliente) => {
                  setSelectedClient(cliente);
                  setEditForm({ ...cliente });
                }}
                onHistorial={setHistorial}
                onDeshabilitar={(cliente) => {
                  const confirmacion = window.confirm(
                    `¿Seguro que querés deshabilitar a ${cliente.nombre}?`
                  );
                  if (confirmacion) {
                    toast.success("Cliente deshabilitado");
                    // eliminarCliente(cliente.id);
                  }
                }}
                onNuevoTurno={() => {
                  turnoStore.setClienteSeleccionado(cliente);
                  navigate("/turnos");
                }}
              />
            </tr>
          ))}
        </tbody>
      </table>

      {/* modal ver cliente */}
      {viewClient && (
        <ClientView cliente={viewClient} onClose={() => setViewClient(null)} />
      )}

      {/* modal editar */}
      {selectedClient && editForm && (
        <ClientEdit client={selectedClient} setClient={setSelectedClient} />
      )}

      {/* modal historial (falta crear componente e implementar logica por separado) */}
      {historial && (
        <Modal onClose={() => setHistorial(null)}>
          <h3>Historial de {historial?.nombre}</h3>
          <p>📅 Turnos: ...</p>
          <p>💰 Pagos: ...</p>
        </Modal>
      )}
    </div>
  );
}

export default ClientsList;
