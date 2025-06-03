import { v4 as uuidv4 } from "uuid";
import type { Cliente, Turno } from "./types";

// datos falsos precargados en la app
export const clientes: Cliente[] = [
  {
    id: uuidv4(),
    nombre: "Leandro",
    apellido: "Arbelo",
    dni: "39123456",
    telefono: "3515123456",
    email: "leandro@gmail.com",
  },
  {
    id: uuidv4(),
    nombre: "Nicolas",
    apellido: "Avila",
    dni: "38654321",
    telefono: "3514654321",
    email: "nicolas@gmail.com",
  },
  {
    id: uuidv4(),
    nombre: "Lazaro",
    apellido: "Gonzalez",
    dni: "40123456",
    telefono: "3516754321",
    email: "lazaro@gmail.com",
  },
  {
    id: uuidv4(),
    nombre: "Pedro",
    apellido: "Cordon",
    dni: "40654321",
    telefono: "351332211",
    email: "pedro@gmail.com",
  },
];

export const turnos: Turno[] = [
  {
    id: "1",
    cliente: clientes[0],
    fecha: "2025-06-03",
    hora: "10:00",
    estado: "realizado",
    montoAbonado: 10000,
  },
  {
    id: "2",
    cliente: clientes[1],
    fecha: "2025-06-04",
    hora: "10:30",
    estado: "realizado",
    montoAbonado: 10000,
  },
  {
    id: "1",
    cliente: clientes[2],
    fecha: "2025-06-06",
    hora: "19:00",
    estado: "pendiente",
  },
  {
    id: "1",
    cliente: clientes[2],
    fecha: "2025-06-06",
    hora: "17:00",
    estado: "cancelado",
  },
  {
    id: "1",
    cliente: clientes[3],
    fecha: "2025-06-05",
    hora: "18:00",
    estado: "realizado",
    montoAbonado: 10000,
  },
  {
    id: "1",
    cliente: clientes[1],
    fecha: "2025-06-08",
    hora: "19:00",
    estado: "pendiente",
  },
  {
    id: "1",
    cliente: clientes[3],
    fecha: "2025-06-07",
    hora: "10:00",
    estado: "cancelado",
  },
];
