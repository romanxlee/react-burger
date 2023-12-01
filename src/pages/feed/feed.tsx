import styles from "./feed.module.css";
import { OrderCard } from "../../components";

export const Feed = () => {
  return (
    <div className={styles.feed}>
      <div>
        <h1 className="text text_type_main-large">Лента заказов</h1>
        <div>
          <div>
            <OrderCard />
          </div>
        </div>
      </div>
    </div>
  );
};
