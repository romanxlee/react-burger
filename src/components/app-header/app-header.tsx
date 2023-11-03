import AppHeaderStyles from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const AppHeader = () => {
  const location = useLocation();
  return (
    <header className={`${AppHeaderStyles.header} p-4`}>
      <div
        className={`${AppHeaderStyles.container} ${AppHeaderStyles.flexBasis}`}
      >
        <Link to="/" className={AppHeaderStyles.link}>
          <BurgerIcon
            type={location.pathname === "/" ? "primary" : "secondary"}
          />
          <span
            className={`${
              location.pathname === "/"
                ? "text_color_primary"
                : "text_color_inactive"
            } text text_type_main-default m-2`}
          >
            Конструктор
          </span>
        </Link>
        <Link to="/profile/orders" className={AppHeaderStyles.link}>
          <ListIcon
            type={
              location.pathname === "/profile/orders" ? "primary" : "secondary"
            }
          />
          <span
            className={`${
              location.pathname === "/profile/orders"
                ? "text_color_primary"
                : "text_color_inactive"
            } text text_type_main-default m-2`}
          >
            Лента заказов
          </span>
        </Link>
      </div>
      <Link
        to="/"
        className={`${AppHeaderStyles.link} ${AppHeaderStyles.flexBasis} ${AppHeaderStyles.logo}`}
      >
        <Logo />
      </Link>
      <Link
        to="/profile"
        className={`${AppHeaderStyles.link} ${AppHeaderStyles.flexBasis} ${AppHeaderStyles.lastLink}`}
      >
        <ProfileIcon
          type={location.pathname === "/profile" ? "primary" : "secondary"}
        />
        <span
          className={`${
            location.pathname === "/profile"
              ? "text_color_primary"
              : "text_color_inactive"
          } text text_type_main-default m-2`}
        >
          Личный кабинет
        </span>
      </Link>
    </header>
  );
};

export default AppHeader;
