import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';

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

export function PersonalAccount(props) {
  let history = useHistory();
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

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
    onSubmit: (values) => {
      setLoading(true);
      console.log(values);
      $.post(
        `/ajax/login.php`,
        {
          target: "logination",
          login: values.login,
          password: values.password,
        },
        function (data) {
          var response = $.parseJSON(data);
          console.log(response);
          // if (response.status == 0) {
          // setRedirect(true);
          // } else if (response.status == 3){
          // setError(true);
          // setRedirect(false);
          // setErrorText('Логин уже занят!');
          // } else {
          // setError(true);
          // setRedirect(false);
          // setErrorText('');
          // }
          // setLoadingAlert(false);
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
        setPageLoading(false);
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
      <Button color="secondary" onClick={logout}>
        Выйти
      </Button>
    </div>
  );
}
