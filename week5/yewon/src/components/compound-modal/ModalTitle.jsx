import { modalTitle } from "../Modal.css";

const ModalTitle = ({ children }) => {
  return <h1 className={modalTitle}>{children}</h1>;
};

export default ModalTitle;
