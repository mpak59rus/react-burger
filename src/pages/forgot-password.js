import React, { useEffect } from "react";
import {
  EmailInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Header } from "../components/app-header/app-header";
import { Link, useHistory } from "react-router-dom";

export const ForgotPassword = () => {
  const [emailValue, setEmailValue] = React.useState("");
  const onChangeEmail = (e) => {
    setEmailValue(e.target.value);
  };
  const history = useHistory();

  const onClick = () => {
    history.replace({ pathname: "/reset-password" });
  };

  return (
    <>
      <Header />
      <section className="input__box">
        <div className="authorization__box">
          <h1 className="mb-6 text text_type_main-medium ">
            Восстановление пароля
          </h1>
          <Input
            type="email"
            onChange={onChangeEmail}
            value={emailValue}
            name={"email"}
            placeholder="Укажите e-mail"
          />
          <Button onClick={onClick}>Восстановить</Button>
          <div className="mt-20 input__text-line">
            <p className="text text_type_main-default">Вспомнили пароль?</p>
            <Link
              className="text text_type_main-default input__link"
              to="/login"
            >
              Войти
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
