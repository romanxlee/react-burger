import ModalStyles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { useState, type FC } from "react";

type Props = {
  show: boolean;
};

const Modal: FC<Props> = ({ show }) => {
  const [isVisible, setIsVisible] = useState(show);
  return (
    <ModalOverlay
      show={isVisible}
      content={
        <div className={ModalStyles.modal}>
          <div className={ModalStyles.close}>
            <CloseIcon type={"primary"} onClick={() => setIsVisible(false)} />
          </div>
        </div>
      }
    ></ModalOverlay>
  );
};

export default Modal;
