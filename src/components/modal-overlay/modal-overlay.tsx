import { type FC, ReactNode, MouseEventHandler } from "react";
import ModalOverlayStyles from "./modal-overlay.module.css";

type Props = {
  content: ReactNode;
  show: boolean;
  onClick: MouseEventHandler;
};

const ModalOverlay: FC<Props> = ({ content, show, onClick }) => {
  return (
    <>
      {show && (
        <div className={ModalOverlayStyles.overlay} onClick={onClick}>
          {content}
        </div>
      )}
    </>
  );
};

export default ModalOverlay;
