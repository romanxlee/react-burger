import ModalStyles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { useState, type FC, ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

type Props = {
  show: boolean;
  title?: string;
  content: ReactNode;
};

const Modal: FC<Props> = ({ show, title, content }) => {
  const [isVisible, setIsVisible] = useState(show);
  useEffect(() => {
    setIsVisible(show);
  }, [show]);
  return (
    <>
      {createPortal(
        <ModalOverlay
          show={isVisible}
          onClick={() => setIsVisible(false)}
          content={
            <div className={ModalStyles.modal}>
              <div className={ModalStyles.title}>
                <span className="text text_type_main-large">{title}</span>
                <div className={ModalStyles.close}>
                  <CloseIcon
                    type={"primary"}
                    onClick={() => setIsVisible(false)}
                  />
                </div>
              </div>
              <div className={ModalStyles.content}>{content}</div>
            </div>
          }
        ></ModalOverlay>,
        document.getElementById("app") as HTMLElement,
      )}
    </>
  );
};

export default Modal;
