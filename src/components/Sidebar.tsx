import { NavLink } from "react-router-dom";
import styles from "../styles/sidebar.module.css";

function Sidebar() {
  return (
    <nav className={styles.sidebar}>
      <h2 className={styles.logo}>Barberia Porteña</h2>
      <ul className={styles.navList}>
        <li>
          <NavLink
            to='/clientes'
            className={({ isActive }) => (isActive ? styles.active : undefined)}
          >
            Clientes
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/turnos'
            className={({ isActive }) => (isActive ? styles.active : undefined)}
          >
            Turnos
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/estadisticas'
            className={({ isActive }) => (isActive ? styles.active : undefined)}
          >
            Estadísticas
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
