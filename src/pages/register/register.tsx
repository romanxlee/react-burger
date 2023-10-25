import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import AccountForm from "../../components/account-form/account-form";

function Register() {
  return (
    <AccountForm
      title={"Регистрация"}
      inputs={
        <>
          <Input
            value={""}
            placeholder={"Имя"}
            onChange={() => console.log("asd")}
          />
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
          <Button htmlType="button">Зарегистрироваться</Button>
        </>
      }
      additional={
        <>
          <span className="text text_type_main-default text_color_inactive">
            Уже зарегистрированы?
            <a href="/login"> Войти</a>
          </span>
        </>
      }
    />
  );
}

export default Register;
