import styles from "../styles/form.module.css";
import type { Cliente } from "../types";

type Props = {
  className?: string;
  title: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  value: Omit<Cliente, "id">;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
};

function Form({
  className,
  title,
  onSubmit,
  value,
  onChange,
  children,
}: Props) {
  return (
    <form onSubmit={onSubmit} className={className}>
      <h2>{title}</h2>
      <div className={styles.inlineGroup}>
        <input
          name='nombre'
          value={value.nombre}
          onChange={onChange}
          placeholder='Nombre *'
          required
          className={styles.input}
        />
        <input
          name='apellido'
          value={value.apellido}
          onChange={onChange}
          placeholder='Apellido *'
          required
          className={styles.input}
        />
      </div>
      <input
        name='dni'
        value={value.dni}
        onChange={onChange}
        placeholder='DNI *'
        required
        className={styles.input}
      />
      <input
        name='telefono'
        type='tel'
        value={value.telefono}
        onChange={onChange}
        placeholder='Telefono *'
        required
        className={styles.input}
      />
      <input
        name='email'
        type='email'
        value={value.email}
        onChange={onChange}
        placeholder='Correo electronico *'
        required
        className={styles.input}
      />
      <input
        name='notas'
        value={value.notas}
        onChange={onChange}
        placeholder='Notas (opcional)'
        className={styles.input}
      />
      {children} {/* aca van los botones */}
    </form>
  );
}

export default Form;
