import type { Turno } from "../types";
import styles from "../styles/estadisticas.module.css";

type Props = {
  turnos: Turno[];
};

const ReporteEstadisticasGenerales = ({ turnos }: Props) => {
  const totalCobrado = turnos
    .filter((t) => t.estado === "realizado" && t.montoAbonado)
    .reduce((sum, t) => sum + (t.montoAbonado || 0), 0);

  const totalClientes = new Set(turnos.map((t) => t.cliente.dni)).size;

  const promedioPorCliente =
    totalClientes > 0 ? totalCobrado / totalClientes : 0;

  const turnosRealizadosConMonto = turnos.filter(
    (t) => t.estado === "realizado" && t.montoAbonado != null
  );

  const promedioPorTurno =
    turnosRealizadosConMonto.length > 0
      ? turnosRealizadosConMonto.reduce(
          (sum, t) => sum + (t.montoAbonado || 0),
          0
        ) / turnosRealizadosConMonto.length
      : 0;

  const totalTurnos = turnos.length;
  const totalRealizados = turnos.filter((t) => t.estado === "realizado").length;
  const totalCancelados = turnos.filter((t) => t.estado === "cancelado").length;
  const totalPendientes = turnos.filter((t) => t.estado === "pendiente").length;

  // Agrupación por cliente (dni)
  const agrupados = turnos.reduce<
    Record<
      string,
      {
        cliente: string;
        cantidad: number;
        totalGastado: number;
        cancelados: number;
      }
    >
  >((acc, t) => {
    const dni = t.cliente.dni;
    if (!acc[dni]) {
      acc[dni] = {
        cliente: `${t.cliente.nombre} ${t.cliente.apellido}`,
        cantidad: 0,
        totalGastado: 0,
        cancelados: 0,
      };
    }
    acc[dni].cantidad++;
    if (t.estado === "realizado" && t.montoAbonado) {
      acc[dni].totalGastado += t.montoAbonado;
    }
    if (t.estado === "cancelado") {
      acc[dni].cancelados++;
    }
    return acc;
  }, {});

  const destacados = Object.values(agrupados)
    .sort((a, b) => b.totalGastado - a.totalGastado)
    .slice(0, 5);

  const turnosRealizados = turnos.filter((t) => t.estado === "realizado");

  const frecuentes = turnosRealizados.reduce<
    Record<string, { cliente: string; cantidad: number }>
  >((acc, turno) => {
    const dni = turno.cliente.dni;
    if (!acc[dni]) {
      acc[dni] = {
        cliente: `${turno.cliente.nombre} ${turno.cliente.apellido}`,
        cantidad: 0,
      };
    }
    acc[dni].cantidad++;
    return acc;
  }, {});

  const topFrecuentes = Object.values(frecuentes)
    .sort((a, b) => b.cantidad - a.cantidad)
    .slice(0, 5);

  const canceladores = Object.values(agrupados)
    .sort((a, b) => b.cancelados - a.cancelados)
    .slice(0, 5);

  return (
    <div className={styles.estadisticasGrid} style={{ marginTop: "2rem" }}>
      <div className={styles.bloque}>
        <h2>📊 Estadísticas generales</h2>
        <ul>
          <li>
            <strong>Total cobrado: </strong> {`$ ${totalCobrado.toFixed(2)}`}
          </li>
          <li>
            <strong>Promedio gastado por cliente: </strong>
            {`$ ${promedioPorCliente.toFixed(2)}`}
          </li>
          <li>
            <strong>Promedio gastado por turno: </strong>
            {`$ ${promedioPorTurno.toFixed(2)}`}
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

      <div className={styles.bloque}>
        <h3>🏅 Clientes destacados (más gastaron)</h3>
        <ol>
          {destacados.map((c) => (
            <li key={c.cliente}>
              {c.cliente} - {`$ ${c.totalGastado.toFixed(2)}`}
            </li>
          ))}
        </ol>
      </div>
      <div className={styles.bloque}>
        <h3>📅 Clientes frecuentes (más turnos confirmados)</h3>
        <ol>
          {topFrecuentes.map((c) => (
            <li key={c.cliente}>
              {c.cliente} - {c.cantidad} turnos
            </li>
          ))}
        </ol>
      </div>
      <div className={styles.bloque}>
        <h3>❌ Clientes que más cancelan</h3>
        <ol>
          {canceladores.map((c) => (
            <li key={c.cliente}>
              {c.cliente} - {c.cancelados} cancelados
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default ReporteEstadisticasGenerales;
