import styles from "../styles/modal.module.css";

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

function Modal({ children, onClose }: Props) {
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          ✖
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
