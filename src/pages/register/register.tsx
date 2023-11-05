import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { AccountForm } from "../../components";
import { useAppDispatch } from "../../hooks";
import { registerUser } from "../../services/slices/authSlice";
import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";

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
    await dispatch(registerUser(userInput));
  };

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
            <Link to="/login"> Войти</Link>
          </span>
        </>
      }
    />
  );
};
