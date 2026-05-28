import { useState } from "react";

import {
  overlay,
  modal,
  modalTitle,
  modalDescription,
  buttonWrapper,
  button,
} from "../Modal.css";

const BasicModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className={button} onClick={() => setIsOpen(true)}>
        Basic 모달 열기
      </button>

      {isOpen && (
        <div className={overlay}>
          <div className={modal}>
            <h1 className={modalTitle}>Basic</h1>

            <p className={modalDescription}>
              하나의 컴포넌트 내부에서 상태와 UI를 모두 관리하는 방식
            </p>

            <div className={buttonWrapper}>
              <button className={button} onClick={() => setIsOpen(false)}>
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BasicModal;
