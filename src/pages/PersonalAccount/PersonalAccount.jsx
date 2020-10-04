import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";

import $ from "jquery";
import { useFormik } from "formik";
import CircularProgress from "@material-ui/core/CircularProgress";

import { Menu } from "../../components/Menu/Menu";

import "./PersonalAccount.css"

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

export function PersonalAccount(props) {
  let history = useHistory();
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [user, setUser] = useState({
    login: "",
    first_name: "",
    last_name: "",
    tel: 0,
    sm_link: "",
    code: "",
  });

  useEffect(() => {
    $.post(
      `/ajax/check_auth.php`,
      {
        target: "checking",
      },
      function (data) {
        var response = $.parseJSON(data);
        if (response.status !== 0) {
          history.push("/");
        }
      }
    );
    $.post(
        `/ajax/user.php`,
        {
          target: "get-user",
        },
        function (data) {
          var response = $.parseJSON(data);
          if (response.status == 0) {
            setUser({
              login: response.login,
              first_name: response.fname,
              last_name: response.lname,
              tel: response.tel,
              sm_link: response.sm_link,
              code: response.verification_code,
            });
            setPageLoading(false);
          }
        }
      );
  }, []);

  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    validate,
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
          setLoading(false);
        }
      );
    },
  });

  const logout = async () => {
    setPageLoading(true);
    await $.post(
      `/ajax/logout.php`,
      {
        target: "logout",
      },
      function (data) {
        var response = $.parseJSON(data);
        if (response.status == 0) {
          history.push("/");
        }
      }
    );
  };

  if (pageLoading) {
    return (
      <div className="loading_block">
        <h3 className="loading_header">DVFU.Food</h3>
        <CircularProgress className="circular_progress" />
      </div>
    );
  }

  return (
    <div className="page">
      <Menu />
      <div style={{marginTop: "20px"}}>
        <div className="settings">
          <h3 class="settings_header-text">Личные настройки</h3>
          <div className="settings_data">
            <span class="settings_left-data">Логин:</span>
            <span class="settings_right-data">{user.login}</span>
          </div>
          <div className="settings_data">
            <span class="settings_left-data">Имя:</span>
            <span class="settings_right-data">{user.first_name}</span>
          </div>
          <div className="settings_data">
            <span class="settings_left-data">Фамилия:</span>
            <span class="settings_right-data">{user.last_name}</span>
          </div>
          <div className="settings_data">
            <span class="settings_left-data">Номер телефона:</span>
            <span class="settings_right-data">{user.tel}</span>
          </div>
          <div className="settings_data">
            <span class="settings_left-data">Соц. сеть:</span>
            <span class="settings_right-data">{user.sm_link}</span>
          </div>
          <Button color="secondary" onClick={logout} style={{marginTop: "15px"}}>
          Выйти
        </Button>
        </div>
        <div className="settings">
          <h3 class="settings_header-text">Настройки бота</h3>
          <div className="settings_data">
            <span class="settings_left-data">Код аутентификации:</span>
            <span class="settings_right-data">{user.code}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
