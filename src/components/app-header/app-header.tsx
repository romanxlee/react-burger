import AppHeaderStyles from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

const AppHeader = () => {
  return (
    <header className={`${AppHeaderStyles.header} p-4`}>
      <div
        className={`${AppHeaderStyles.container} ${AppHeaderStyles.flexBasis}`}
      >
        <Link to="/" className={AppHeaderStyles.link}>
          <BurgerIcon type="primary" />
          <span className="text text_type_main-default m-2">Конструктор</span>
        </Link>
        <Link to="/" className={AppHeaderStyles.link}>
          <ListIcon type="secondary" />
          <span className="text text_type_main-default text_color_inactive m-2">
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
        <ProfileIcon type="secondary" />
        <span className="text text_type_main-default text_color_inactive m-2">
          Личный кабинет
        </span>
      </Link>
    </header>
  );
};

export default AppHeader;
