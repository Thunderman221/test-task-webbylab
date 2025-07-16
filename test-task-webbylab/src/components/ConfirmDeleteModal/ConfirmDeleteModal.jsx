import s from "./ConfirmDeleteModal.module.css";

const ConfirmDeleteModal = ({ onCancel, onConfirm, isLoading }) => {
  return (
    <div className={s.overlay}>
      <div className={s.modal}>
        <h3>Confirm Delete</h3>
        <p>Are you sure you want to delete this movie?</p>
        <div className={s.actions}>
          <button onClick={onConfirm} disabled={isLoading} className={s.delete}>
            {isLoading ? "Deleting..." : "Delete"}
          </button>
          <button onClick={onCancel} disabled={isLoading} className={s.cancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
