import { useState } from "react";
import { useTurnoStore } from "../store/turnoStore";
import Modal from "./Modal";
import type { Cliente } from "../types";
import styles from "../styles/modal.module.css";
import buttonStyles from "../styles/button.module.css";
import toast from "react-hot-toast";

type Props = {
  fecha: string;
  hora: string;
  onClose: () => void;
};

const TurnoModal = ({ fecha, hora, onClose }: Props) => {
  const cliente = useTurnoStore((state) => state.clienteSeleccionado);
  const [dni, setDni] = useState("");
  const [clienteManual, setClienteManual] = useState<Cliente | null>(null);

  const [monto, setMonto] = useState("");
  const [servicio, setServicio] = useState("");
  const [notas, setNotas] = useState("");

  // Simulación de búsqueda por DNI (más adelante se hace real)
  const buscarCliente = () => {
    if (dni === "12345678") {
      setClienteManual({
        id: "1",
        nombre: "Cliente",
        apellido: "Simulado",
        dni,
        telefono: "3510000000",
        email: "cliente@ejemplo.com",
        notas: "",
      });
    } else {
      toast.error("Cliente no encontrado");
    }
  };

  const handleGuardar = () => {
    const clienteFinal = cliente || clienteManual;
    if (!clienteFinal) {
      toast.error("Debe ingresar un cliente válido");
      return;
    }

    const montoParsed = parseFloat(monto);
    if (isNaN(montoParsed)) {
      toast.error("Monto inválido");
      return;
    }

    // Simulación de guardado
    console.log("Turno guardado:", {
      id: crypto.randomUUID(),
      cliente: clienteFinal,
      fecha,
      hora,
      montoAbonado: montoParsed,
      servicio,
      notas,
    });

    toast.success("Turno agendado");
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <div className={styles.formContainer}>
        <h2>Nuevo Turno</h2>
        <p>
          <strong>Fecha:</strong> {fecha}
        </p>
        <p>
          <strong>Hora:</strong> {hora}
        </p>

        {cliente ? (
          <p>
            <strong>Cliente:</strong> {cliente.nombre} {cliente.apellido} (
            {cliente.dni})
          </p>
        ) : (
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

            {clienteManual && (
              <p>
                <strong>Cliente:</strong> {clienteManual.nombre}{" "}
                {clienteManual.apellido}
              </p>
            )}
          </>
        )}

        <label>
          Monto abonado:
          <input
            type='number'
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            className={styles.input}
          />
        </label>

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

        <div className={styles.btnGroup}>
          <button className={buttonStyles.button} onClick={handleGuardar}>
            Guardar turno
          </button>
          <button
            className={`${buttonStyles.button} ${buttonStyles.secondary}`}
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default TurnoModal;
