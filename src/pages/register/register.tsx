import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import AccountForm from "../../components/account-form/account-form";
import { useAppDispatch } from "../../hooks";
import { registerUser } from "../../services/slices/authSlice";
import { ChangeEvent, useState } from "react";

function Register() {
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
    console.log(user);
    await dispatch(registerUser(user));
  };

  return (
    <AccountForm
      title={"Регистрация"}
      inputs={
        <>
          <Input
            value={user.name}
            placeholder={"Имя"}
            name="name"
            onChange={(e) => handleChange(e)}
          />
          <Input
            value={user.email}
            placeholder={"E-mail"}
            type="email"
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
            Зарегистрироваться
          </Button>
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
}

export default Register;
