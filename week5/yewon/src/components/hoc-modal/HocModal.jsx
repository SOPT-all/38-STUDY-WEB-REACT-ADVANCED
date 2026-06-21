import {
  overlay,
  modal,
  modalTitle,
  modalDescription,
  buttonWrapper,
  button,
} from "../Modal.css";

const HocModal = ({ isOpen, openModal, closeModal }) => {
  return (
    <>
      <button className={button} onClick={openModal}>
        HOC 모달 열기
      </button>

      {isOpen && (
        <div className={overlay}>
          <div className={modal}>
            <h1 className={modalTitle}>HOC</h1>

            <p className={modalDescription}>상태를 props로 주입받는 방식</p>

            <div className={buttonWrapper}>
              <button className={button} onClick={closeModal}>
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HocModal;
