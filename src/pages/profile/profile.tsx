import {
  Input,
  Button as YaButton,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { AccountForm, ProfileOrders } from "../../components";
import { useAppSelector, useAppDispatch } from "../../hooks";
import {
  currentUser,
  logoutUser,
  userUpdate,
} from "../../services/slices/authSlice";
import { Link, useMatch } from "react-router-dom";

import styles from "./profile.module.css";
import { ChangeEvent, useEffect, useState } from "react";
import { User } from "../../types";

export const Profile = () => {
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const user = useAppSelector(currentUser);
  const [userInput, setUserInput] = useState(user as User);

  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogout = async () => {
    await dispatch(logoutUser());
  };

  useEffect(() => {
    setButtonsVisible(
      user!.name !== userInput.name ||
        user!.email !== userInput.email ||
        (!!userInput.password && userInput.password !== ""),
    );
  }, [user, userInput]);

  return (
    <div className={styles.root}>
      <div className={styles.links}>
        <Link
          to="/profile"
          className={`${useMatch("/profile") && styles.linkCurrent} ${
            styles.link
          } text text_type_main-default pt-5 pb-5`}
        >
          Профиль
        </Link>
        <Link
          to="/profile/orders"
          className={`${
            useMatch("/profile/orders") && styles.linkCurrent
          } text text_type_main-default text_color_inactive pt-5 pb-5 ${
            styles.link
          }`}
        >
          История заказов
        </Link>
        <button
          className={`${styles.button} text text_type_main-default text_color_inactive pt-5 pb-5`}
          onClick={() => handleLogout()}
        >
          Выход
        </button>

        <span className="text text_type_main-small text_color_inactive mt-20">
          В этом разделе вы можете{" "}
          {useMatch("/profile")
            ? "изменить свои персональные данные"
            : "просмотреть свою историю заказов"}
        </span>
      </div>
      {useMatch("/profile") ? (
        <AccountForm
          onSubmit={async () => {
            await dispatch(userUpdate(userInput));
          }}
          inputs={
            <>
              <Input
                value={userInput.name}
                icon="EditIcon"
                placeholder={"Имя"}
                name="name"
                onChange={(e) => handleChange(e)}
              />
              <Input
                value={userInput.email}
                placeholder={"E-mail"}
                icon="EditIcon"
                name="email"
                onChange={(e) => handleChange(e)}
              />
              <Input
                value={userInput.password || ""}
                placeholder={"Пароль"}
                icon="EditIcon"
                name="password"
                onChange={(e) => handleChange(e)}
              />
              {buttonsVisible && (
                <div className={styles.buttons}>
                  <button
                    className={`${styles.button} text text_type_main-default text_color_accent`}
                    onClick={() => setUserInput(user as User)}
                  >
                    Отмена
                  </button>
                  <YaButton htmlType="submit" type="primary">
                    Сохранить
                  </YaButton>
                </div>
              )}
            </>
          }
        />
      ) : (
        <ProfileOrders />
      )}
      <div />
    </div>
  );
};
