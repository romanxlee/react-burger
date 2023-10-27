import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import AccountForm from "../../components/account-form/account-form";
import { ChangeEvent, useState } from "react";
import { useAppDispatch } from "../../hooks";
import { loginUser } from "../../services/slices/authSlice";

function Login() {
  const [user, setUser] = useState({ email: "", password: "", name: "" });
  const [type, setType] = useState<"email" | "password" | "text" | undefined>(
    "password",
  );
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const togglePassword = () => {
    setType(type === "password" ? undefined : "password");
  };

  const onSubmit = async () => {
    await dispatch(loginUser(user));
  };

  return (
    <AccountForm
      title={"Вход"}
      inputs={
        <>
          <Input
            value={user.email}
            placeholder={"E-mail"}
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <Input
            value={user.password}
            placeholder={"Пароль"}
            icon={type === "password" ? "ShowIcon" : "HideIcon"}
            type={type}
            name="password"
            onChange={(e) => handleChange(e)}
            onIconClick={() => togglePassword()}
          />
          <Button htmlType="button" onClick={() => onSubmit()}>
            Войти
          </Button>
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
