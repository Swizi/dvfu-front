import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { ToastProvider, useToasts } from "react-toast-notifications";

import $ from "jquery";
import { useFormik } from "formik";
import CircularProgress from "@material-ui/core/CircularProgress";

const validate = (values) => {
  const errors = {};

  if (!/^[a-zA-Z0-9-_]{5,15}$/g.test(values.login)) {
    errors.login = "Логин меньше 16 и больше 4 символов";
  }

  if (values.password.length <= 3) {
    errors.password = "Пароль больше 3 символов";
  }

  return errors;
};

export function Login(props) {
  let history = useHistory();
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const { addToast } = useToasts();

  useEffect(() => {
    $.post(
      `/ajax/check_auth.php`,
      {
        target: "checking",
      },
      function (data) {
        var response = $.parseJSON(data);
        if (response.status == 0) {
          history.push("/Applications");
        }
        setPageLoading(false);
      }
    );
  }, []);

  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    validate,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      setLoading(true);
      $.post(
        `/ajax/login.php`,
        {
          target: "logination",
          login: values.login,
          password: values.password,
        },
        function (data) {
          var response = $.parseJSON(data);
          if (response.status == 0) {
            localStorage.setItem("login", values.login);
            history.push("/Applications");
          } else {
            addToast("Ошибка входа", { appearance: "error" });
          }
          setLoading(false);
        }
      );
    },
  });

  if (pageLoading) {
    return (
      <div className="loading_block">
        <h3 className="loading_header">DVFU.Food</h3>
        <CircularProgress className="circular_progress" />
      </div>
    );
  }

  return (
    <div className="modal">
      <div className="modal_header-container">
        <div className="modal_header-block">
          <h2 className="modal_header-text">DVFU.Food</h2>
          <span className="modal_header-subtext">
            Экономь ресурсы для важного
          </span>
        </div>
      </div>
      <form
        method="POST"
        onSubmit={formik.handleSubmit}
        autoComplete="on"
        className="modal_form"
      >
        <h2 className="modal_form__header-text">Логинация</h2>
        {loading && (
          <CircularProgress
            className="circular_progress"
            style={{ margin: "10px 0 10px 0" }}
          />
        )}
        <input
          required
          id="login"
          name="login"
          type="text"
          placeholder="Логин"
          className="modal_form__input-text"
          onChange={formik.handleChange}
          value={formik.values.login}
          style={{ border: formik.errors.login ? "2px solid red" : "none" }}
        ></input>
        {formik.errors.login && (
          <span className="error_text">{formik.errors.login}</span>
        )}
        <input
          required
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          className="modal_form__input-text"
          onChange={formik.handleChange}
          value={formik.values.password}
          style={{
            border: formik.errors.password ? "2px solid red" : "none",
          }}
        ></input>
        {formik.errors.password && (
          <span className="error_text">{formik.errors.password}</span>
        )}
        <input type="submit" value="Войти" class="modal_form__submit"></input>
        <div className="form_bottom">
          <Link to="/Registration" className="modal_form_bottom__link">
            Зарегистрироваться
          </Link>
          <Link to="/ResetPassword" className="modal_form_bottom__link">
            Забыли пароль
          </Link>
        </div>
      </form>
    </div>
  );
}
