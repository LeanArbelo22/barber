import { useState } from "react";
import styles from "../styles/agenda.module.css";
import { useTurnoStore } from "../store/turnoStore";
import TurnoModal from "./TurnoModal";
import { format } from "date-fns";
import type { Turno } from "../types";

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
  "14:00", // no se trabaja
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30", // no se trabaja
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
];

const horarioInhabilitado = (hora: string) =>
  ["14:00", "14:30", "15:00", "15:30", "16:00", "16:30"].includes(hora);

const fechaPorDia = (index: number) => {
  const hoy = new Date();
  const lunes = new Date(hoy.setDate(hoy.getDate() - hoy.getDay() + 1));
  const dia = new Date(lunes);
  dia.setDate(lunes.getDate() + index);
  return format(dia, "yyyy-MM-dd");
};

const WeekAgenda = () => {
  const obtenerTurnos = useTurnoStore((state) => state.obtenerTurnosPorHorario);
  const [modalInfo, setModalInfo] = useState<{
    fecha: string;
    hora: string;
    turnoExistente?: Turno;
  } | null>(null);

  return (
    <>
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
            {dias.map((_, diaIndex) => {
              const fecha = fechaPorDia(diaIndex);
              const turnos = obtenerTurnos(fecha, hora);
              const deshabilitada = horarioInhabilitado(hora);
              const hayEspacio = turnos.length < 2;

              return (
                <div
                  key={fecha + hora}
                  className={`${styles.cell} ${
                    deshabilitada ? styles.disabled : ""
                  }`}
                >
                  {turnos.map((turno) => (
                    <div
                      key={turno.id}
                      className={
                        turno.estado === "realizado"
                          ? styles.realizado
                          : turno.estado === "cancelado"
                          ? styles.cancelado
                          : styles.pendiente
                      }
                      onClick={() =>
                        setModalInfo({
                          fecha,
                          hora,
                          turnoExistente: turno,
                        })
                      }
                    >
                      {turno.cliente.nombre}
                    </div>
                  ))}

                  {hayEspacio && !deshabilitada && (
                    <div
                      className={styles.agendarOtro}
                      onClick={() =>
                        setModalInfo({
                          fecha,
                          hora,
                          turnoExistente: undefined,
                        })
                      }
                    >
                      +
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {modalInfo && (
        <TurnoModal
          fecha={modalInfo.fecha}
          hora={modalInfo.hora}
          turnoExistente={modalInfo.turnoExistente}
          onClose={() => setModalInfo(null)}
        />
      )}
    </>
  );
};

export default WeekAgenda;
