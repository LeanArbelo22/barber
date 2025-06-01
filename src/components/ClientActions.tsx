import type { Cliente } from "../types";

type Props = {
  cliente: Cliente;
  onVer: (cliente: Cliente) => void;
  onEditar: (cliente: Cliente) => void;
  onHistorial: (cliente: Cliente) => void;
  onDeshabilitar: (cliente: Cliente) => void;
  onNuevoTurno: (cliente: Cliente) => void;
};

// * botones del listado de clientes y sus acciones
function ClientActions({
  cliente,
  onVer,
  onEditar,
  onHistorial,
  onDeshabilitar,
  onNuevoTurno,
}: Props) {
  return (
    <>
      <td>
        <button onClick={() => onVer(cliente)}>👁️</button>
      </td>
      <td>
        <button onClick={() => onEditar(cliente)}>✏️</button>
      </td>
      <td>
        <button onClick={() => onHistorial(cliente)}>📜</button>
      </td>
      <td>
        <button onClick={() => onDeshabilitar(cliente)}>🚫</button>
      </td>
      <td>
        <button onClick={() => onNuevoTurno(cliente)}>🗓️</button>
      </td>
    </>
  );
}

export default ClientActions;
