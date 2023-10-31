import ModalStyles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import { type FC, ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

type Props = {
  title?: string;
  children: ReactNode;
  onClose: () => void;
};

export const Modal: FC<Props> = ({ title, children, onClose }) => {
  useEffect(() => {
    function onKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", onKeydown);
    return () => document.removeEventListener("keydown", onKeydown);
  }, [onClose]);

  return (
    <>
      {createPortal(
        <ModalOverlay
          onClick={onClose}
          children={
            <div className={ModalStyles.modal}>
              <div className={ModalStyles.title}>
                <span className="text text_type_main-large">{title}</span>
                <div className={ModalStyles.close}>
                  <CloseIcon type={"primary"} onClick={onClose} />
                </div>
              </div>
              <div className={ModalStyles.content}>{children}</div>
            </div>
          }
        ></ModalOverlay>,
        document.getElementById("modals") as HTMLElement,
      )}
    </>
  );
};
