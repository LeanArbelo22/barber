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
