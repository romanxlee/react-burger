import styles from "./order-card.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export const OrderCard = () => {
  return (
    <div className={styles.card}>
      <div className={styles.cardSection}>
        <span className="text text_type_digits-default text_type_main-small">
          #034535
        </span>
        <span className="text text_type_main-small text_color_inactive">
          Сегодня, 16:20
        </span>
      </div>
      <span className="text text_type_main-small">
        Death Star Starship Main бургер
      </span>
      <div className={styles.cardSection}>
        <span className="text text_type_digits-default">480</span>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );
};
