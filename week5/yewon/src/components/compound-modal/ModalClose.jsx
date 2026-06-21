import { useContext } from "react";

import ModalContext from "./ModalContext";

import { buttonWrapper, button } from "../Modal.css";

const ModalClose = ({ children }) => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("ModalClose must be used within Modal");
  }

  return (
    <div className={buttonWrapper}>
      <button className={button} onClick={() => context.setIsOpen(false)}>
        {children}
      </button>
    </div>
  );
};

export default ModalClose;
