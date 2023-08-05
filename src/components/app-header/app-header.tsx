import AppHeaderStyles from './app-header.module.css'
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const AppHeader = () => {
    return (
        <header className={`${AppHeaderStyles.header} p-4`}>
            <div className={`${AppHeaderStyles.container} ${AppHeaderStyles.flexBasis}`}>
                <a href="/" className={AppHeaderStyles.link}>
                    <BurgerIcon type="primary"/>
                    <span className="text text_type_main-default m-2">Конструктор</span>
                </a>
                <a href="/" className={AppHeaderStyles.link}>
                    <ListIcon type="secondary" />
                    <span className="text text_type_main-default text_color_inactive m-2">Лента заказов</span>
                </a>
            </div>
            <a href="/" className={`${AppHeaderStyles.link} ${AppHeaderStyles.flexBasis} ${AppHeaderStyles.logo}`}>
                <Logo />
            </a>
            <a href="/" className={`${AppHeaderStyles.link} ${AppHeaderStyles.flexBasis} ${AppHeaderStyles.lastLink}`}>
                <ProfileIcon type="secondary" />
                <span className="text text_type_main-default text_color_inactive m-2">Личный кабинет</span>
            </a>
        </header>
    )
}

export default AppHeader