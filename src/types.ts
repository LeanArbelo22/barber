// Tipos globales

// interfaz de Cliente (similar a una clase, solo que se declaran los atributos y el tipo de dato), todo excepto notas son requeridos (obligatorios), los opcionales llevan el signo de pregunta despues del nombre del atributo (notas?)
export interface Cliente {
  id: string;
  nombre: string;
  apellido: string;
  dni: string;
  telefono: string;
  email: string;
  notas?: string;
}

export interface Turno {
  id: string;
  cliente: Cliente;
  fecha: string; // "2024-06-05"
  hora: string; // "13:30"
  servicio?: string; // opcional, si hay diferentes serviciso
  notas?: string;
  realizado?: boolean; // para marcar si el turno se concreto
  montoAbonado: number; // total efectivamente pagado por el cliente
}
