import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { AccountForm } from "../../components";
import { useState } from "react";
import { passwordForgot } from "../../services/api";
import { Link, useNavigate, useLocation } from "react-router-dom";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async () => {
    const res = await passwordForgot(email);
    if (res.success) navigate("/reset-password", { state: { from: location } });
  };

  return (
    <AccountForm
      title={"Восстановление пароля"}
      onSubmit={handleSubmit}
      inputs={
        <>
          <Input
            value={email}
            placeholder={"Укажите e-mail"}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            htmlType="submit"
            // simple email validation
            disabled={!/^\S+@\S+\.\S+$/.test(email)}
          >
            Восстановить
          </Button>
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
