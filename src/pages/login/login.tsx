import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import AccountForm from "../../components/account-form/account-form";
import { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { loginUser, currentUser } from "../../services/slices/authSlice";
import { useNavigate } from "react-router-dom";

function Login() {
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
      inputs={
        <>
          <Input
            value={userInput.email}
            placeholder={"E-mail"}
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <Input
            value={userInput.password}
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
