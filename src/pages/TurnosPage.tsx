import { useState } from "react";
import WeekAgenda from "../components/WeekAgenda";
import styles from "../styles/agenda.module.css";
import { useTurnoStore } from "../store/turnoStore";

function TurnosPage() {
  const [vista, setVista] = useState<"semana" | "mes">("semana");
  const clienteDesdeStore = useTurnoStore((state) => state.clienteSeleccionado);

  return (
    <div>
      <div className={styles.header}>
        <h1>Turnos</h1>
        <p>
          {clienteDesdeStore?.nombre
            ? `Agendar turno de ${clienteDesdeStore.nombre} ${clienteDesdeStore.apellido}`
            : ""}
        </p>
        <div className={styles.viewSelector}>
          <button
            onClick={() => setVista("semana")}
            className={vista === "semana" ? styles.active : ""}
          >
            Semana
          </button>
          <button
            onClick={() => setVista("mes")}
            className={vista === "mes" ? styles.active : ""}
          >
            Mes
          </button>
        </div>
      </div>

      <div className={styles.agendaContainer}>
        {vista === "semana" ? (
          <WeekAgenda />
        ) : (
          <p className={styles.placeholder}>Vista mensual próximamente...</p>
        )}
      </div>
    </div>
  );
}

export default TurnosPage;
