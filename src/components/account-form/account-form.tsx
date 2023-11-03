import styles from "./account-form.module.css";
import { ReactNode, FC } from "react";

type Props = {
  title?: string;
  inputs: ReactNode;
  additional?: ReactNode;
  onSubmit: () => void;
};

export const AccountForm: FC<Props> = ({
  title,
  inputs,
  additional,
  onSubmit,
}) => {
  return (
    <div className={styles.root}>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        {title && (
          <span className="text text_type_main-medium m-2">{title}</span>
        )}
        {inputs}
      </form>
      {additional && (
        <div>
          <div className={styles.additional}>{additional}</div>
        </div>
      )}
    </div>
  );
};
