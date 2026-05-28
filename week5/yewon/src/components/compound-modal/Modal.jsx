import { useState } from "react";

import ModalContext from "./ModalContext";

const Modal = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default Modal;
