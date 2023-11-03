import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { AccountForm } from "../../components";
import { useState } from "react";
import { passwordReset } from "../../services/api";
import { useNavigate, useLocation, Navigate, Link } from "react-router-dom";

export const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleSubmit = async () => {
    const res = await passwordReset(password, token);
    if (res.success) navigate("/login");
  };

  if (!state) {
    return <Navigate to="/" replace />;
  }

  return (
    <AccountForm
      title={"Восстановление пароля"}
      onSubmit={handleSubmit}
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
          <Button htmlType="submit">Сохранить</Button>
        </>
      }
      additional={
        <>
          <span className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?
            <Link to="/login"> Войти</Link>
          </span>
        </>
      }
    />
  );
};
