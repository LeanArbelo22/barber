import { useState } from "react";
import { useClientStore } from "../store/clientStore";
import Modal from "./Modal";
import type { Cliente } from "../types";
import toast from "react-hot-toast";
import styles from "../styles/ClientsList.module.css";
import ClientEdit from "./ClientEdit";

const ClientList = () => {
  const clientes = useClientStore((state) => state.clientes);
  // ! const eliminarCliente = useClientStore((state) => state.eliminarCliente); FALTA DESHABILITAR

  // * estados necesarios para abrir los modales de las acciones del listado (apuntar las acciones al cliente seleccionado)
  const [selectedClient, setSelectedClient] = useState<Cliente | null>(null);
  const [editForm, setEditForm] = useState<Omit<Cliente, "id"> | null>(null);
  const [historial, setHistorial] = useState<Cliente | null>(null);

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
              <td>
                <button>👁️</button> {/* falta implementar */}
              </td>
              <td>
                <button
                  onClick={() => {
                    setSelectedClient(cliente);
                    setEditForm({ ...cliente });
                  }}
                >
                  ✏️
                </button>
              </td>
              <td>
                <button onClick={() => setHistorial(cliente)}>📜</button>
              </td>
              <td>
                <button
                  onClick={() => {
                    const confirmacion = window.confirm(
                      `¿Seguro que queres deshabilitar a ${cliente.nombre}? Ya no podra agendar un nuevo turno`
                    );
                    if (confirmacion) {
                      // ! eliminarCliente(cliente.id); falta implementar logica de deshabilitar
                      toast.success("Cliente deshabilitado");
                    }
                  }}
                >
                  🚫
                </button>
              </td>
              <td>
                <button onClick={() => toast.success("Turno nuevo")}>🗓️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* modal editar */}
      {selectedClient && editForm && (
        <ClientEdit
          client={selectedClient}
          setClient={setSelectedClient}
          form={editForm}
          setForm={setEditForm}
        />
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

export default ClientList;
