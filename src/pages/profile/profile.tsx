import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import AccountForm from "../../components/account-form/account-form";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { currentUser, logoutUser } from "../../services/slices/authSlice";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { deleteCookie, getCookie } from "../../utils/cookie";

import styles from "./profile.module.css";

export const Profile = () => {
  const user = useAppSelector(currentUser);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    const token = getCookie("token");
    token && (await dispatch(logoutUser(token)));
    deleteCookie("token");
    navigate("/login", { replace: true });
  };

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
              value={user?.name || ""}
              icon="EditIcon"
              placeholder={"Имя"}
              onChange={() => console.log("asd")}
            />
            <Input
              value={user?.email || ""}
              placeholder={"E-mail"}
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
