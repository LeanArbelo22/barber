import type { Turno } from "../types";
import styles from "../styles/estadisticas.module.css";

type Props = {
  turnos: Turno[];
};

// * tabla con todos los turnos, en todos los estados, con detalle de fecha, cliente y monto 
function ReporteTabla({ turnos }: Props) {
  if (turnos.length === 0) {
    return <p>No se encontraron turnos</p>;
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Hora</th>
          <th>Cliente</th>
          <th>Estado</th>
          <th>Monto</th>
        </tr>
      </thead>
      <tbody>
        {turnos.map((turno) => (
          <tr key={turno.id}>
            <td>{turno.fecha}</td>
            <td>{turno.hora}</td>
            <td>
              {turno.cliente.nombre} {turno.cliente.apellido}
            </td>
            <td className={styles[turno.estado]}>
              {turno.estado.toUpperCase()}
            </td>
            <td>
              {turno.estado === "realizado" && turno.montoAbonado != null
                ? `$ ${turno.montoAbonado.toFixed(2)}`
                : "-"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ReporteTabla;
