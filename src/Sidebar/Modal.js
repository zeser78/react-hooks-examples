import React from "react";
import { useGlobalContext } from "./context";

const Modal = () => {
  const { isModalOpen, closeModal } = useGlobalContext();
  return (
    <div className={`${isModalOpen ? "show-modal" : ""}`}>
      {/* // modal-overlay show-modal */}
      <div className="modal-container">
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
