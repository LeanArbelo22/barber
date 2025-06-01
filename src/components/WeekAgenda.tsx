import { useState } from "react";
import styles from "../styles/agenda.module.css";
import TurnoModal from "./TurnoModal";

const dias = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];
const horarios = [
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
];

function WeekAgenda() {
  const [turnoSeleccionado, setTurnoSeleccionado] = useState<{
    fecha: string;
    hora: string;
  } | null>(null);

  const horarioInhabilitado = (hora: string) => {
    const horasBloqueadas = [
      "14:00",
      "14:30",
      "15:00",
      "15:30",
      "16:00",
      "16:30",
    ];
    return horasBloqueadas.includes(hora);
  };

  return (
    <div className={styles.grid}>
      <div className={styles.headerRow}>
        <div className={styles.timeCell}></div>
        {dias.map((dia) => (
          <div key={dia} className={styles.dayHeader}>
            {dia}
          </div>
        ))}
      </div>

      {horarios.map((hora) => (
        <div key={hora} className={styles.row}>
          <div className={styles.timeCell}>{hora}</div>
          {dias.map((dia) => {
            const deshabilitada = horarioInhabilitado(hora);

            return (
              <div
                key={dia + hora}
                className={`${styles.cell} ${
                  deshabilitada ? styles.disabled : ""
                }`}
                onClick={
                  deshabilitada
                    ? undefined
                    : () => setTurnoSeleccionado({ fecha: dia, hora })
                }
              />
            );
          })}
        </div>
      ))}

      {turnoSeleccionado && (
        <TurnoModal
          fecha={turnoSeleccionado.fecha}
          hora={turnoSeleccionado.hora}
          onClose={() => setTurnoSeleccionado(null)}
        />
      )}
    </div>
  );
}

export default WeekAgenda;
