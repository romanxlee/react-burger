import { OrderInfo as Info } from "../../components";
import styles from "./order-info.module.css";

export const OrderInfo = () => {
  return (
    <div className={styles.root}>
      <Info />
    </div>
  );
};
