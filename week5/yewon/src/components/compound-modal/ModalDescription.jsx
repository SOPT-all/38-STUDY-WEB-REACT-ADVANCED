import { modalDescription } from "../Modal.css";

const ModalDescription = ({ children }) => {
  return <p className={modalDescription}>{children}</p>;
};

export default ModalDescription;
