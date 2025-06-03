import { create } from "zustand";
import type { Cliente, Turno } from "../types";
import { turnos as dataTurnos } from "../data";

interface TurnoState {
  // * si hacen click en "nuevo turno" desde los botones de accion del listado de clientes, se guarda la info del cliente seleccionado para pasarlo como estado a la pagina de turnos (y no tener que cargar de nuevo la info del cliete)
  clienteSeleccionado: Cliente | null;
  setClienteSeleccionado: (cliente: Cliente | null) => void;
  // * turnos agendados
  turnos: Turno[];
  agregarTurno: (nuevo: Turno) => void;
  actualizarTurno: (id: string, cambios: Partial<Turno>) => void;
  obtenerTurnosPorHorario: (fecha: string, hora: string) => Turno[];
}

export const useTurnoStore = create<TurnoState>((set, get) => ({
  clienteSeleccionado: null,
  setClienteSeleccionado: (cliente) => set({ clienteSeleccionado: cliente }),

  turnos: dataTurnos,

  agregarTurno: (nuevo) =>
    set((state) => ({
      turnos: [...state.turnos, nuevo],
    })),

  actualizarTurno: (id, cambios) =>
    set((state) => ({
      turnos: state.turnos.map((turno) =>
        turno.id === id ? { ...turno, ...cambios } : turno
      ),
    })),

  obtenerTurnosPorHorario: (fecha, hora) =>
    get().turnos.filter(
      (turno) => turno.fecha === fecha && turno.hora === hora
    ),
}));
