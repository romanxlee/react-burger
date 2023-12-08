import AppHeaderStyles from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useMatch } from "react-router-dom";

const AppHeader = () => {
  return (
    <header
      className={`${AppHeaderStyles.header} ${!useMatch("/") && "mb-30"} p-4`}
    >
      <div
        className={`${AppHeaderStyles.container} ${AppHeaderStyles.flexBasis}`}
      >
        <Link to="/" className={AppHeaderStyles.link}>
          <BurgerIcon type={useMatch("/") ? "primary" : "secondary"} />
          <span
            className={`${
              useMatch("/") ? "text_color_primary" : "text_color_inactive"
            } text text_type_main-default m-2`}
          >
            Конструктор
          </span>
        </Link>
        <Link to="/feed" className={AppHeaderStyles.link}>
          <ListIcon type={useMatch("/feed") ? "primary" : "secondary"} />
          <span
            className={`${
              useMatch("/feed") ? "text_color_primary" : "text_color_inactive"
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
        <ProfileIcon type={useMatch("/profile") ? "primary" : "secondary"} />
        <span
          className={`${
            useMatch("/profile") ? "text_color_primary" : "text_color_inactive"
          } text text_type_main-default m-2`}
        >
          Личный кабинет
        </span>
      </Link>
    </header>
  );
};

export default AppHeader;
