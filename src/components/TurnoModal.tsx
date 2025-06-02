import { useState } from "react";
import { useTurnoStore } from "../store/turnoStore";
import Modal from "./Modal";
import type { Cliente, Turno } from "../types";
import styles from "../styles/modal.module.css";
import buttonStyles from "../styles/button.module.css";
import toast from "react-hot-toast";
import { useClientStore } from "../store/clientStore";

type Props = {
  fecha: string;
  hora: string;
  onClose: () => void;
  turnoExistente?: Turno | null;
};

function TurnoModal({ fecha, hora, onClose, turnoExistente = null }: Props) {
  const clientePreseleccionado = useTurnoStore(
    (state) => state.clienteSeleccionado
  );
  const agregarTurno = useTurnoStore((state) => state.agregarTurno);
  const actualizarTurno = useTurnoStore((state) => state.actualizarTurno);
  const clientes = useClientStore((state) => state.clientes);

  const [clienteManual, setClienteManual] = useState<Cliente | null>(null);
  const [dni, setDni] = useState("");

  const [monto, setMonto] = useState("");
  const [servicio, setServicio] = useState(turnoExistente?.servicio || "");
  const [notas, setNotas] = useState(turnoExistente?.notas || "");

  const cliente =
    turnoExistente?.cliente || clientePreseleccionado || clienteManual;

  const buscarCliente = () => {
    const cliente = clientes.filter((cliente) => cliente.dni === dni)[0];

    if (cliente) {
      setClienteManual(cliente);
    } else {
      toast.error("Cliente no encontrado");
    }
  };

  const guardarNuevoTurno = () => {
    if (!cliente) {
      toast.error("Debe seleccionar un cliente");
      return;
    }

    const nuevoTurno: Turno = {
      id: crypto.randomUUID(),
      cliente,
      fecha,
      hora,
      servicio,
      notas,
      estado: "pendiente",
    };

    agregarTurno(nuevoTurno);
    toast.success("Turno agendado");
    onClose();
  };

  const marcarComoRealizado = () => {
    const montoNum = parseFloat(monto);
    if (isNaN(montoNum)) {
      toast.error("Monto inválido");
      return;
    }

    if (turnoExistente) {
      actualizarTurno(turnoExistente.id, {
        montoAbonado: montoNum,
        estado: "realizado",
      });
      toast.success("Realizado");
      onClose();
    }
  };

  const cancelarTurno = () => {
    if (turnoExistente) {
      actualizarTurno(turnoExistente.id, { estado: "cancelado" });
      toast.success("Cancelado");
      onClose();
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className={styles.formContainer}>
        <h2>{turnoExistente ? "Actualizar Turno" : "Nuevo Turno"}</h2>
        <p>
          <strong>Fecha:</strong> {fecha} | <strong>Hora:</strong> {hora}
        </p>

        {!cliente && (
          <>
            <label>
              Ingresar DNI:
              <input
                type='text'
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                className={styles.input}
              />
            </label>
            <button className={buttonStyles.button} onClick={buscarCliente}>
              Buscar
            </button>
          </>
        )}

        {cliente && (
          <p>
            <strong>Cliente:</strong> {cliente.nombre} {cliente.apellido} (
            {cliente.dni})
          </p>
        )}

        <label>
          Servicio:
          <input
            type='text'
            value={servicio}
            onChange={(e) => setServicio(e.target.value)}
            className={styles.input}
          />
        </label>

        <label>
          Notas:
          <input
            type='text'
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
            className={styles.input}
          />
        </label>

        {turnoExistente && (
          <label>
            Monto abonado:
            <input
              type='number'
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              className={styles.input}
            />
          </label>
        )}

        <div className={styles.btnGroup}>
          {!turnoExistente && (
            <button className={buttonStyles.button} onClick={guardarNuevoTurno}>
              Guardar turno
            </button>
          )}
          {turnoExistente && (
            <>
              <button
                className={buttonStyles.button}
                onClick={marcarComoRealizado}
              >
                Completar
              </button>
              <button
                className={`${buttonStyles.button} ${buttonStyles.cancelado}`}
                onClick={cancelarTurno}
              >
                Cancelar turno
              </button>
            </>
          )}
          <button
            className={`${buttonStyles.button} ${buttonStyles.secondary}`}
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default TurnoModal;
