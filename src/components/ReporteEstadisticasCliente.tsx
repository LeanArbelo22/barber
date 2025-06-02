import type { Turno } from "../types";
import styles from "../styles/estadisticas.module.css";

type Props = {
  turnos: Turno[]; // solo los turnos del cliente filtrado
};

// * en la pag de estadisticas, se muestran las estadisticas de un cliente individual solo si se filtro el mismo por dni (las estadisticas calculadas se hacen sobre lo que se ve en la tabla, si ademas de filtrar por dni, se filtra por estado, las estadsiticas pueden cambiar)
function ReporteEstadisticasCliente({ turnos }: Props) {
  if (turnos.length === 0) return null;

  const clienteNombre = `${turnos[0].cliente.nombre} ${turnos[0].cliente.apellido}`;

  const totalCobrado = turnos
    .filter((t) => t.estado === "realizado") // de todos los turnos, filtra los que están realizados (abonados)
    .reduce((sum, t) => sum + t.montoAbonado!, 0); // * reduce es similar a hacer un bucle for e ir sumando un valor en una variable, sum acumula los montos abonados por turno del cliente. Como montoAbonado es opcional en el tipo Turno, ts no sabe si el valor va a ser undefined o no, para evitar que marque error hay dos opc: (t.montoAbonado || 0) o t.montoAbonado!, el primero le dice que si es undefined use el 0 para sumarlo, el segundo le dice a ts que estamoss seguros de que ese valor no va a ser undefined (para que el turno este en estado realizado tiene que estar abonado por lo que no seria undefined). El 0 al final es el valor inicial de sum

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
}

export default ReporteEstadisticasCliente;
