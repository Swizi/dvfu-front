import React, {useState, useEffect} from "react";
import "./Registration.css";
import {Link, useHistory} from "react-router-dom";

import $ from "jquery";
import {useFormik, Formik} from "formik";
import CircularProgress from "@material-ui/core/CircularProgress";

import {ToastProvider, useToasts} from "react-toast-notifications";

const validate = (values) => {
    const errors = {};

    if (!/^[a-zA-Z0-9-_]{5,15}$/g.test(values.login)) {
        errors.login = "Логин меньше 16 и больше 4 символов";
    }

    if (!/^[а-яА-Яa-zA-Z]{2,}$/g.test(values.first_name)) {
        errors.first_name = "Неправильное имя";
    }

    if (!/^[а-яА-Яa-zA-Z]{2,}$/g.test(values.last_name)) {
        errors.last_name = "Неправильная фамилия";
    }

    if (!/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/g.test(values.telephone_number)) {
        errors.telephone_number = "Неправильный номер телефона";
    }

    if (values.password1.length <= 3) {
        errors.password1 = "Пароль больше 3 символов";
    }

    if (values.password1 != values.password2) {
        errors.password2 = "Пароли не совпадают";
    }

    return errors;
};

export function Registration(props) {
    let history = useHistory();

    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(false);

    const {addToast} = useToasts();

    useEffect(() => {
        $.post(`/ajax/check_auth.php`, {
            target: "checking"
        }, function (data) {
            var response = $.parseJSON(data);
            if (response.status == 0) {
                history.push("/Applications");
            }
            setPageLoading(false);
        });
    }, []);

    const formik = useFormik({
        initialValues: {
            login: "",
            first_name: "",
            last_name: "",
            telephone_number: "",
            sm_link: "",
            password1: "",
            password2: ""
        },
        validate,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: (values) => {
            setLoading(true);
            console.log(values);
            $.post(`/ajax/register.php`, {
                target: "registration",
                login: values.login,
                fname: values.first_name,
                lname: values.last_name,
                tel: values.telephone_number,
                password: values.password1,
                smlink: values.sm_link
            }, function (data) {
                var response = $.parseJSON(data);
                console.log(response);
                console.log(response.status);
                if (response.status == 0) {
                    history.push("/Applications");
                } else if (response.status == 3) {
                    addToast("Логин уже занят", {appearance: "error"});
                } else {
                    addToast("Ошибка регистрации", {appearance: "error"});
                }
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
            });
        }
    });

    if (pageLoading) {
        return (
            <div className="loading_block">
                <h3 className="loading_header">DVFU.Food</h3>
                <CircularProgress className="circular_progress"/>
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
                <form method="POST"
                    onSubmit={
                        formik.handleSubmit
                    }
                    autoComplete="on"
                    className="modal_form">
                    <h2 className="moda l_form__header-text">Регистрация</h2>
                    {
                    loading && <CircularProgress className="circular_progress"
                        style={
                            {margin: "10px 0 10px 0"}
                        }/>
                }
                    {" "}
                    {/* <label className="modal_form__label" for="login">Логин</label> */}
                    <input required id="login" name="login" type="text" placeholder="Логин" className="modal_form__input-text"
                        onChange={
                            formik.handleChange
                        }
                        value={
                            formik.values.login
                        }
                        style={
                            {
                                border: formik.errors.login ? "2px solid red" : "none"
                            }
                    }></input>
                    {
                    formik.errors.login && (
                        <span className="error_text">
                            {
                            formik.errors.login
                        }</span>
                    )
                }
                    {/* <label className="modal_form__label" for="first_name">Имя</label> */}
                    <input required id="first_name" name="first_name" type="text" placeholder="Имя" className="modal_form__input-text"
                        onChange={
                            formik.handleChange
                        }
                        value={
                            formik.values.first_name
                        }
                        style={
                            {
                                border: formik.errors.first_name ? "2px solid red" : "none"
                            }
                    }></input>
                    {
                    formik.errors.first_name && (
                        <span className="error_text">
                            {
                            formik.errors.first_name
                        }</span>
                    )
                }
                    {/* <label className="modal_form__label" for="last_name">Фамилия</label> */}
                    <input required id="last_name" name="last_name" type="text" placeholder="Фамилия" className="modal_form__input-text"
                        onChange={
                            formik.handleChange
                        }
                        value={
                            formik.values.last_name
                        }
                        style={
                            {
                                border: formik.errors.last_name ? "2px solid red" : "none"
                            }
                    }></input>
                    {
                    formik.errors.last_name && (
                        <span className="error_text">
                            {
                            formik.errors.last_name
                        }</span>
                    )
                }
                    {/* <label className="modal_form__label" for="telephone_number">Телефонный номер</label> */}
                    <input required id="telephone_number" name="telephone_number" type="text" placeholder="Телефонный номер" className="modal_form__input-text"
                        onChange={
                            formik.handleChange
                        }
                        value={
                            formik.values.telephone_number
                        }
                        style={
                            {
                                border: formik.errors.telephone_number ? "2px solid red" : "none"
                            }
                    }></input>
                    {
                    formik.errors.telephone_number && (
                        <span className="error_text">
                            {
                            formik.errors.telephone_number
                        }</span>
                    )
                }
                    <input required id="sm_link" name="sm_link" type="text" placeholder="Социальная сеть" className="modal_form__input-text"
                        onChange={
                            formik.handleChange
                        }
                        value={
                            formik.values.sm_link
                        }
                        style={
                            {
                                border: formik.errors.sm_link ? "2px solid red" : "none"
                            }
                    }></input>
                    {
                    formik.errors.sm_link && (
                        <span className="error_text">
                            {
                            formik.errors.sm_link
                        }</span>
                    )
                }
                    <input required id="password1" name="password1" type="password" placeholder="Пароль" className="modal_form__input-text"
                        onChange={
                            formik.handleChange
                        }
                        value={
                            formik.values.password1
                        }
                        style={
                            {
                                border: formik.errors.password1 ? "2px solid red" : "none"
                            }
                    }></input>
                    {
                    formik.errors.password1 && (
                        <span className="error_text">
                            {
                            formik.errors.password1
                        }</span>
                    )
                }
                    <input required id="password2" name="password2" type="password" placeholder="Пароль ещё раз" className="modal_form__input-text"
                        onChange={
                            formik.handleChange
                        }
                        value={
                            formik.values.password2
                        }
                        style={
                            {
                                border: formik.errors.password2 ? "2px solid red" : "none"
                            }
                    }></input>
                    {
                    formik.errors.password2 && (
                        <span className="error_text">
                            {
                            formik.errors.password2
                        }</span>
                    )
                }
                    <input type="submit" value="Зарегистрироваться" class="modal_form__submit"></input>
                    <div className="form_bottom">
                        <Link to="/Login" className="modal_form_bottom__link">
                            Войти
                        </Link>
                    </div>
                </form>
        </div>
    );
}
