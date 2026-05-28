import Modal from "./Modal";
import ModalTrigger from "./ModalTrigger";
import ModalContent from "./ModalContent";
import ModalTitle from "./ModalTitle";
import ModalDescription from "./ModalDescription";
import ModalClose from "./ModalClose";

const CompoundModal = () => {
  return (
    <Modal>
      <ModalTrigger>Compound 모달 열기</ModalTrigger>

      <ModalContent>
        <ModalTitle>Compound</ModalTitle>

        <ModalDescription>Context로 상태를 공유하는 방식</ModalDescription>

        <ModalClose>닫기</ModalClose>
      </ModalContent>
    </Modal>
  );
};

export default CompoundModal;
