import type { Turno } from "../types";
import styles from "../styles/estadisticas.module.css";

type Props = {
  turnos: Turno[]; // solo los turnos del cliente filtrado
};

const ReporteEstadisticasCliente = ({ turnos }: Props) => {
  if (turnos.length === 0) return null;

  const clienteNombre = `${turnos[0].cliente.nombre} ${turnos[0].cliente.apellido}`;

  const totalCobrado = turnos
    .filter((t) => t.estado === "realizado" && t.montoAbonado)
    .reduce((sum, t) => sum + (t.montoAbonado || 0), 0);

  const totalTurnos = turnos.length;
  const totalRealizados = turnos.filter((t) => t.estado === "realizado").length;
  const totalCancelados = turnos.filter((t) => t.estado === "cancelado").length;
  const totalPendientes = turnos.filter((t) => t.estado === "pendiente").length;

  const promedioGasto =
    totalRealizados > 0 ? totalCobrado / totalRealizados : 0;

  return (
    <div className={styles.bloque} style={{ marginTop: "2rem" }}>
      <h2>📌 Estadísticas de: {clienteNombre}</h2>
      <ul>
        <li>
          <strong>Total cobrado:</strong> ${totalCobrado.toFixed(2)}
        </li>
        <li>
          <strong>Promedio gastado:</strong> ${promedioGasto.toFixed(2)}
        </li>
        <li>
          <strong>Total de turnos:</strong> {totalTurnos}
        </li>
        <li>
          <strong>Turnos realizados:</strong> {totalRealizados}
        </li>
        <li>
          <strong>Turnos cancelados:</strong> {totalCancelados}
        </li>
        <li>
          <strong>Turnos pendientes:</strong> {totalPendientes}
        </li>
      </ul>
    </div>
  );
};

export default ReporteEstadisticasCliente;
