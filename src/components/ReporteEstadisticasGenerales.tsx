import type { Turno } from "../types";
import styles from "../styles/estadisticas.module.css";

type Props = {
  turnos: Turno[];
};

type ClienteAgrupado = {
  cliente: string;
  cantidad: number;
  totalGastado: number;
  cancelados: number;
};

type ClienteFrecuente = {
  cliente: string;
  cantidad: number;
};

// * seccion de estadisticas generales (siempre aparecen en la pag de estadisticas y no se modifican al filtrar la tabla)
function ReporteEstadisticasGenerales({ turnos }: Props) {
  // la explicacion de la funcion esta en ReporteEstadisticasCliente
  const totalCobrado = turnos
    .filter((t) => t.estado === "realizado")
    .reduce((sum, t) => sum + t.montoAbonado!, 0);

  // * Set es una estructura de datos similar a una lista pero no permite elementos repetidos, como al cargar clientes no validamos que el dni no se repita (todavia) y como no todos los clientes registrados tienen un turno, creamos un Set con cada dni unico que haya registrado (sin duplicados) de clientes que hayan solicitdo un turno al menos una vez, y el .size de un set es como el .lenght de un array
  const totalClientes = new Set(turnos.map((t) => t.cliente.dni)).size;

  const promedioPorCliente =
    totalClientes > 0 ? totalCobrado / totalClientes : 0;

  const turnosRealizados = turnos.filter((t) => t.estado === "realizado");

  // suma el total recaudado por todos los turnos de todos los clientes y lo divide en la cantidad de turnos
  const promedioPorTurno =
    turnosRealizados.length > 0
      ? turnosRealizados.reduce((sum, t) => sum + t.montoAbonado!, 0) /
        turnosRealizados.length
      : 0;

  const totalTurnos = turnos.length;
  const totalRealizados = turnosRealizados.length;
  const totalCancelados = turnos.filter((t) => t.estado === "cancelado").length;
  const totalPendientes = turnos.filter((t) => t.estado === "pendiente").length;

  // agrupar turnos por cliente (dni)
  const agrupados: Record<string, ClienteAgrupado> = {}; // objeto con claves string y valores del tipo ClienteAgrupado

  turnos.forEach((turno) => {
    const dni = turno.cliente.dni;

    // si el cliente no esta en el objeto, lo agrega
    if (!agrupados[dni]) {
      agrupados[dni] = {
        cliente: `${turno.cliente.nombre} ${turno.cliente.apellido}`,
        cantidad: 0,
        totalGastado: 0,
        cancelados: 0,
      };
    }

    // aumenta la cantidad de turnos
    agrupados[dni].cantidad++;

    // si fue realizado, suma el monto abonado
    if (turno.estado === "realizado") {
      agrupados[dni].totalGastado += turno.montoAbonado!;
    }

    // si fue cancelado, aumenta el contador de cancelados
    if (turno.estado === "cancelado") {
      agrupados[dni].cancelados++;
    }
  });

  // clientes que mas gastaron en la barberia
  const destacados = Object.values(agrupados) // crea un array solo de los valores del objeto (no las claves)
    .sort((a, b) => b.totalGastado - a.totalGastado) // ordena de mayor a menor según cuanto gasto
    .slice(0, 5); // toma los primeros 5

  // contamos la cantidad de turnos realizados por cada cliente
  const frecuentes: Record<string, ClienteFrecuente> = {};

  turnosRealizados.forEach((turno) => {
    const dni = turno.cliente.dni;

    if (!frecuentes[dni]) {
      frecuentes[dni] = {
        cliente: `${turno.cliente.nombre} ${turno.cliente.apellido}`,
        cantidad: 0,
      };
    }

    frecuentes[dni].cantidad++;
  });

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
            <strong>Total de ventas: </strong> {`$ ${totalCobrado.toFixed(2)}`}
          </li>
          <li>
            <strong>Promedio venta por cliente: </strong>
            {`$ ${promedioPorCliente.toFixed(2)}`}
          </li>
          <li>
            <strong>Promedio venta por turno: </strong>
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
        <h3>🏅 Clientes destacados (mayor cantidad de ventas)</h3>
        <ol>
          {destacados.map((c) => (
            <li key={c.cliente}>
              {c.cliente} - {`$ ${c.totalGastado.toFixed(2)}`}
            </li>
          ))}
        </ol>
      </div>
      <div className={styles.bloque}>
        <h3>📅 Clientes frecuentes (mayor cantidad de turnos realizados)</h3>
        <ol>
          {topFrecuentes.map((c) => (
            <li key={c.cliente}>
              {c.cliente} - {c.cantidad} turnos
            </li>
          ))}
        </ol>
      </div>
      <div className={styles.bloque}>
        <h3>❌ Clientes con mayor cantidad de turnos cancelados</h3>
        <ol>
          {canceladores.map(
            (c) =>
              c.cancelados !== 0 && (
                <li key={c.cliente}>
                  {c.cliente} - {c.cancelados} cancelados
                </li>
              )
          )}
        </ol>
      </div>
    </div>
  );
}

export default ReporteEstadisticasGenerales;
