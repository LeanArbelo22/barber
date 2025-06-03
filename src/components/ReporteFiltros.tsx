import type { EstadoTurno } from "../types";
import styles from "../styles/estadisticas.module.css";
import buttonStyles from "../styles/button.module.css";

type Props = {
  dni: string;
  setDni: (dni: string) => void;
  estado: EstadoTurno | "todos";
  setEstado: (estado: EstadoTurno | "todos") => void;
  onBuscar: () => void;
  onBorrar: () => void;
};

// * barra de busqueda y filtrado
function ReporteFiltros({
  dni,
  setDni,
  estado,
  setEstado,
  onBuscar,
  onBorrar,
}: Props) {
  const borrarTodo = () => {
    onBorrar();
    setDni("");
    setEstado("todos");
  };

  return (
    <div className={styles.filtersContainer}>
      <input
        type='text'
        placeholder='Buscar por DNI'
        value={dni}
        onChange={(e) => setDni(e.target.value)}
      />

      <select
        value={estado}
        onChange={(e) => setEstado(e.target.value as EstadoTurno | "todos")}
      >
        <option value='todos'>Todos</option>
        <option value='pendiente'>Pendientes</option>
        <option value='realizado'>Realizados</option>
        <option value='cancelado'>Cancelados</option>
      </select>

      <button onClick={onBuscar}>Buscar</button>
      <button className={buttonStyles.danger} onClick={borrarTodo}>
        Borrar
      </button>
    </div>
  );
}

export default ReporteFiltros;
