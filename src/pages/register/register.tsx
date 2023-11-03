import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { AccountForm } from "../../components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { registerUser, currentUser } from "../../services/slices/authSlice";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [type, setType] = useState<"email" | "password" | "text" | undefined>(
    "password",
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(currentUser);

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
    const res = (await dispatch(registerUser(userInput))) as {
      payload: { success: boolean };
    };
    if (res.payload.success) navigate("/login");
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <AccountForm
      title={"Регистрация"}
      onSubmit={onSubmit}
      inputs={
        <>
          <Input
            value={userInput.name}
            placeholder={"Имя"}
            name="name"
            onChange={(e) => handleChange(e)}
          />
          <Input
            value={userInput.email}
            placeholder={"E-mail"}
            type="email"
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
          <Button htmlType="submit">Зарегистрироваться</Button>
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
};
