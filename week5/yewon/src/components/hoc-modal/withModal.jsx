import { useState } from "react";

const withModal = (Component) => {
  return (props) => {
    const [isOpen, setIsOpen] =
      useState(false);

    const openModal = () =>
      setIsOpen(true);

    const closeModal = () =>
      setIsOpen(false);

    return (
      <Component
        {...props}
        isOpen={isOpen}
        openModal={openModal}
        closeModal={closeModal}
      />
    );
  };
};

export default withModal;
