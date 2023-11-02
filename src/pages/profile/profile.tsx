import {
  Input,
  Button as YaButton,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { AccountForm } from "../../components";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { currentUser, logoutUser } from "../../services/slices/authSlice";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { deleteCookie, getCookie } from "../../utils/cookie";
import { updateUser } from "../../services/api/user";

import styles from "./profile.module.css";
import { ChangeEvent, useEffect, useState } from "react";
import { User } from "../../types";

export const Profile = () => {
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const user = useAppSelector(currentUser);
  const [userInput, setUserInput] = useState(user as User);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogout = async () => {
    const token = getCookie("token");
    token && (await dispatch(logoutUser(token)));
    deleteCookie("token");
    navigate("/login", { replace: true });
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
          className={`${
            location.pathname === "/profile" && styles.linkCurrent
          } ${styles.link} text text_type_main-default pt-5 pb-5`}
        >
          Профиль
        </Link>
        <Link
          to="/profile/orders"
          className={`${
            location.pathname === "/profile/orders" && styles.linkCurrent
          } text text_type_main-default text_color_inactive pt-5 pb-5 ${
            styles.link
          }`}
        >
          История заказов
        </Link>
        <span
          className="text text_type_main-default text_color_inactive pt-5 pb-5"
          onClick={() => handleLogout()}
        >
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
                <YaButton
                  htmlType="button"
                  type="primary"
                  onClick={() => updateUser(userInput)}
                >
                  Сохранить
                </YaButton>
              </div>
            )}
          </>
        }
      />
      <div />
    </div>
  );
};
