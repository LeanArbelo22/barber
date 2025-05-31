import { useState } from "react";
import { useClientStore } from "../store/clientStore";
import Modal from "./Modal";
import type { Cliente } from "../types";
import toast from "react-hot-toast";
import modalStyles from "../styles/modal.module.css";
import styles from "../styles/ClientsList.module.css";

import Form from "./Form";

const ClientList = () => {
  const clientes = useClientStore((state) => state.clientes);
  //const eliminarCliente = useClientStore((state) => state.eliminarCliente);
  const editarCliente = useClientStore((state) => state.editarCliente);

  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
  const [editForm, setEditForm] = useState<Omit<Cliente, "id"> | null>(null);
  const [historialCliente, setHistorialCliente] = useState<Cliente | null>(
    null
  );

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editForm) {
      setEditForm({ ...editForm, [name]: value });
    }
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedCliente && editForm) {
      const confirmar = window.confirm("¿Confirmas los cambios?");
      if (confirmar) {
        editarCliente(selectedCliente.id, editForm);
        toast.success("Cliente actualizado");
        setSelectedCliente(null);
      }
    }
  };

  return (
    <div>
      <h2>Listado</h2>
      {clientes.length === 0 ? (
        <p>No hay clientes registrados.</p>
      ) : (
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
                  <button onClick={() => alert("Ver info")}>👁️</button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      setSelectedCliente(cliente);
                      setEditForm({ ...cliente });
                    }}
                  >
                    ✏️
                  </button>
                </td>
                <td>
                  <button onClick={() => setHistorialCliente(cliente)}>
                    📜
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      const confirmacion = window.confirm(
                        `¿Seguro que queres deshabilitar a ${cliente.nombre}? Ya no podra agendar un nuevo turno`
                      );
                      if (confirmacion) {
                        /* eliminarCliente(cliente.id); */
                        toast.success("Cliente deshabilitado");
                      }
                    }}
                  >
                    🚫
                  </button>
                </td>
                <td>
                  <button onClick={() => toast.success("Turno nuevo")}>
                    🗓️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal de edición */}
      {selectedCliente && editForm && (
        <Modal onClose={() => setSelectedCliente(null)}>
          <Form
            title='Editar cliente'
            onSubmit={handleEditSubmit}
            value={editForm}
            onChange={handleEditChange}
            className={modalStyles.formContainer}
          >
            <div className={modalStyles.btnGroup}>
              <button type='submit' className={modalStyles.button}>
                Guardar Cambios
              </button>
              <button
                type='button'
                onClick={() => setSelectedCliente(null)}
                className={`${modalStyles.button} ${modalStyles.secondary}`}
              >
                Cancelar
              </button>
            </div>
          </Form>
        </Modal>
      )}

      {/* Modal de historial */}
      {historialCliente && (
        <Modal onClose={() => setHistorialCliente(null)}>
          <h3>Historial de {historialCliente.nombre}</h3>
          <p>📅 Turnos: ...</p>
          <p>💰 Pagos: ...</p>
        </Modal>
      )}
    </div>
  );
};

export default ClientList;
