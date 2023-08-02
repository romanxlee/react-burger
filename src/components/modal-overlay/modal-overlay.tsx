import { type FC, ReactNode } from "react";
import ModalOverlayStyles from "./modal-overlay.module.css";

type Props = {
  content: ReactNode;
  show: boolean;
};

const ModalOverlay: FC<Props> = ({ content, show }) => {
  return (
    <div
      className={`${ModalOverlayStyles.overlay} ${
        !show && ModalOverlayStyles.overlay_hidden
      }`}
    >
      {content}
    </div>
  );
};

export default ModalOverlay;
