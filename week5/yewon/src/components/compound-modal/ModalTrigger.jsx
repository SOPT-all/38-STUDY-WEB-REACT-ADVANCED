import { useContext } from "react";

import ModalContext from "./ModalContext";

import { button } from "../Modal.css";

const ModalTrigger = ({ children }) => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("ModalTrigger must be used within Modal");
  }

  return (
    <button className={button} onClick={() => context.setIsOpen(true)}>
      {children}
    </button>
  );
};

export default ModalTrigger;
