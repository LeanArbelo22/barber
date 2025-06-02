import { useState } from "react";
import ReporteFiltros from "../components/ReporteFiltros";
import ReporteTabla from "../components/ReporteTabla";
import { useTurnoStore } from "../store/turnoStore";
import type { EstadoTurno, Turno } from "../types";
import ReporteEstadisticasGenerales from "../components/ReporteEstadisticasGenerales";
import ReporteEstadisticasCliente from "../components/ReporteEstadisticasCliente";

const EstadisticasPage = () => {
  const todosLosTurnos = useTurnoStore((state) => state.turnos);

  const [dni, setDni] = useState("");
  const [estado, setEstado] = useState<EstadoTurno | "todos">("todos");
  const [turnosFiltrados, setTurnosFiltrados] =
    useState<Turno[]>(todosLosTurnos);

  const aplicarFiltros = () => {
    let resultado = todosLosTurnos;

    if (dni.trim()) {
      resultado = resultado.filter((t) => t.cliente.dni === dni.trim());
    }

    if (estado !== "todos") {
      resultado = resultado.filter((t) => t.estado === estado);
    }

    setTurnosFiltrados(resultado);
  };

  return (
    <div className='container'>
      <h1>Estadísticas y Reportes</h1>

      <ReporteFiltros
        dni={dni}
        setDni={setDni}
        estado={estado}
        setEstado={setEstado}
        onBuscar={aplicarFiltros}
      />

      <ReporteTabla turnos={turnosFiltrados} />

      <h3>Generales</h3>
      <ReporteEstadisticasGenerales turnos={todosLosTurnos} />

      {dni.trim() && (
        <>
          <h3>Cliente</h3>
          <ReporteEstadisticasCliente turnos={turnosFiltrados} />
        </>
      )}
    </div>
  );
};

export default EstadisticasPage;
