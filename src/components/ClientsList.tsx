import { useState } from "react";
import { useClientStore } from "../store/clientStore";
import Modal from "./Modal";
import type { Cliente } from "../types";
import toast from "react-hot-toast";
import styles from "../styles/clientList.module.css";
import ClientEdit from "./ClientEdit";
import ClientActions from "./ClientActions";
import ClientView from "./ClientView";

const ClientsList = () => {
  const clientes = useClientStore((state) => state.clientes);
  // ! const eliminarCliente = useClientStore((state) => state.eliminarCliente); FALTA FUNCION DESHABILITAR

  // * estados necesarios para abrir los modales de las acciones del listado (apuntar las acciones al cliente seleccionado)
  const [selectedClient, setSelectedClient] = useState<Cliente | null>(null);
  const [editForm, setEditForm] = useState<Omit<Cliente, "id"> | null>(null);
  const [historial, setHistorial] = useState<Cliente | null>(null);
  const [viewClient, setViewClient] = useState<Cliente | null>(null);

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
          {clientes.map((cliente) => (
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
                onNuevoTurno={(cliente) =>
                  toast.success(`Turno nuevo para ${cliente.nombre}`)
                }
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
};

export default ClientsList;
