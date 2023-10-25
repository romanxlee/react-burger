import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import AccountForm from "../../components/account-form/account-form";

import styles from "./profile.module.css";

const Profile = () => {
  return (
    <div className={styles.root}>
      <div className={styles.links}>
        <span className="text text_type_main-default pt-5 pb-5">Профиль</span>
        <span className="text text_type_main-default text_color_inactive pt-5 pb-5">
          История заказов
        </span>
        <span className="text text_type_main-default text_color_inactive pt-5 pb-5">
          Выход
        </span>

        <span className="text text_type_main-small text_color_inactive mt-20">
          В этом разделе вы можете изменить свои персональные данные
        </span>
      </div>
      <AccountForm
        inputs={
          <>
            <Input
              value={""}
              icon="EditIcon"
              placeholder={"Имя"}
              onChange={() => console.log("asd")}
            />
            <Input
              value={""}
              placeholder={"Логин"}
              icon="EditIcon"
              onChange={() => console.log("asd")}
            />
            <Input
              value={""}
              placeholder={"Пароль"}
              icon="EditIcon"
              onChange={() => console.log("asd")}
            />
          </>
        }
      />
      <div />
    </div>
  );
};

export default Profile;
