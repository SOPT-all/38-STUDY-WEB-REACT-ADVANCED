import { useContext } from "react";

import ModalContext from "./ModalContext";

import { overlay, modal } from "../Modal.css";

const ModalContent = ({ children }) => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("ModalContent must be used within Modal");
  }

  if (!context.isOpen) {
    return null;
  }

  return (
    <div className={overlay}>
      <div className={modal}>{children}</div>
    </div>
  );
};

export default ModalContent;
