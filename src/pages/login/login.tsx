import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import AccountForm from "../../components/account-form/account-form";

function Login() {
  return (
    <AccountForm
      title={"Вход"}
      inputs={
        <>
          <Input
            value={""}
            placeholder={"E-mail"}
            onChange={() => console.log("asd")}
          />
          <Input
            value={""}
            placeholder={"Пароль"}
            icon={"ShowIcon"}
            onChange={() => console.log("asd")}
          />
          <Button htmlType="button">Войти</Button>
        </>
      }
      additional={
        <>
          <span className="text text_type_main-default text_color_inactive">
            Вы — новый пользователь?
            <a href="/register"> Зарегистрироваться</a>
          </span>
          <span className="text text_type_main-default text_color_inactive">
            Забыли пароль?
            <a href="/forgot-password"> Восстановить пароль</a>
          </span>
        </>
      }
    />
  );
}

export default Login;
