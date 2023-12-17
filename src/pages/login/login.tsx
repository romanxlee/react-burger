import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { AccountForm } from "../../components";
import { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { loginUser, currentUser } from "../../services/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [type, setType] = useState<"email" | "password" | "text" | undefined>(
    "password",
  );

  const dispatch = useAppDispatch();
  const user = useAppSelector(currentUser);

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const togglePassword = () => {
    setType(type === "password" ? undefined : "password");
  };

  const onSubmit = async () => {
    await dispatch(loginUser(userInput));
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <AccountForm
      title={"Вход"}
      onSubmit={onSubmit}
      inputs={
        <>
          <Input
            value={userInput.email}
            placeholder={"E-mail"}
            name="email"
            onChange={handleChange}
            data-testid="login-email"
          />
          <Input
            value={userInput.password}
            placeholder={"Пароль"}
            icon={type === "password" ? "ShowIcon" : "HideIcon"}
            type={type}
            name="password"
            onChange={handleChange}
            onIconClick={() => togglePassword()}
            data-testid="login-password"
          />
          <Button htmlType="submit" data-testid="login-submit">
            Войти
          </Button>
        </>
      }
      additional={
        <>
          <span className="text text_type_main-default text_color_inactive">
            Вы — новый пользователь?
            <Link to="/register"> Зарегистрироваться</Link>
          </span>
          <span className="text text_type_main-default text_color_inactive">
            Забыли пароль?
            <Link to="/forgot-password"> Восстановить пароль</Link>
          </span>
        </>
      }
    />
  );
};
