import { useState } from "react";
import WeekAgenda from "../components/WeekAgenda";
import styles from "../styles/agenda.module.css";
import { useTurnoStore } from "../store/turnoStore";

function TurnosPage() {
  const [vista, setVista] = useState<"semana" | "mes">("semana");
  const clienteDesdeStore = useTurnoStore((state) => state.clienteSeleccionado);
  const borrarClienteDesdeStore = useTurnoStore(
    (state) => state.setClienteSeleccionado
  );

  return (
    <div>
      <div className={styles.header}>
        <h1>Turnos</h1>

        {clienteDesdeStore?.nombre ? (
          <div className={styles.infoContainer}>
            <p>
              Agendar turno de{" "}
              <span>
                {clienteDesdeStore.nombre} {clienteDesdeStore.apellido}
              </span>
            </p>
            <button onClick={() => borrarClienteDesdeStore(null)}>❌</button>
          </div>
        ) : (
          ""
        )}

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
          <p className={styles.placeholder}>FALTA IMPLEMENTAR</p>
        )}
      </div>
    </div>
  );
}

export default TurnosPage;
