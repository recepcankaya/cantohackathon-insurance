import styles from "@/styles/Modal.module.css";
import ReactDOM from "react-dom";

export default function Modal({ open, children, onClose }) {
  if (!open) return null;

  return ReactDOM.createPortal(
    <>
      <div className={styles.overlay}></div>
      <div className={styles.modal}>
        <button onClick={onClose} className={styles.closeButton}>
          X
        </button>
        {children}
      </div>
    </>,
    document.getElementById("portal-root")
  );
}
