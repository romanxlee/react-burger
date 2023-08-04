import { type FC, ReactNode, MouseEventHandler, MouseEvent } from "react";
import ModalOverlayStyles from "./modal-overlay.module.css";

type Props = {
  content: ReactNode;
  show: boolean;
  onClick: MouseEventHandler;
};

const ModalOverlay: FC<Props> = ({ content, show, onClick }) => {
  if (!show) return null;

  const onContainerClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <div
      className={ModalOverlayStyles.overlay}
      onClick={(event) => onClick(event)}
    >
      <div onClick={onContainerClick}>{content}</div>
    </div>
  );
};

export default ModalOverlay;
