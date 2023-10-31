import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import AccountForm from "../../components/account-form/account-form";
import { useState } from "react";
import { passwordReset } from "../../services/api";
import { useNavigate } from "react-router-dom";

export const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const res = await passwordReset(password, token);
    if (res.success) navigate("/login");
  };

  return (
    <AccountForm
      title={"Восстановление пароля"}
      inputs={
        <>
          <Input
            value={password}
            placeholder={"Введите новый пароль"}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            value={token}
            placeholder={"Введите код из письма"}
            onChange={(e) => setToken(e.target.value)}
          />
          <Button htmlType="button" onClick={handleSubmit}>
            Сохранить
          </Button>
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
};
