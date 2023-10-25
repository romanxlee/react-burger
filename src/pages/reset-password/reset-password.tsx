import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import AccountForm from "../../components/account-form/account-form";

function ResetPassword() {
  return (
    <AccountForm
      title={"Восстановление пароля"}
      inputs={
        <>
          <Input
            value={""}
            placeholder={"Введите новый пароль"}
            onChange={() => console.log("asd")}
          />
          <Input
            value={""}
            placeholder={"Введите код из письма"}
            onChange={() => console.log("asd")}
          />
          <Button htmlType="button">Сохранить</Button>
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

export default ResetPassword;
