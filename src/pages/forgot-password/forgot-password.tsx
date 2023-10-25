import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import AccountForm from "../../components/account-form/account-form";

function ForgotPassword() {
  return (
    <AccountForm
      title={"Восстановление пароля"}
      inputs={
        <>
          <Input
            value={""}
            placeholder={"Укажите e-mail"}
            onChange={() => console.log("asd")}
          />
          <Button htmlType="button">Восстановить</Button>
        </>
      }
      additional={
        <>
          <span className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?
            <a href="/login"> Войти</a>
          </span>
        </>
      }
    />
  );
}

export default ForgotPassword;
