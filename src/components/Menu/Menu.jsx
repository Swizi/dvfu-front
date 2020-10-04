import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import "./Menu.css";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export function Menu(props) {
  let history = useHistory();
  const toggleMenu = () => {
    document.querySelector(".burger").classList.toggle("burger_active");
    document
      .querySelector(".dropdown_list")
      .classList.toggle("dropdown_active");
  };

  const goToPersonalAccount = () => {
    history.push("/PersonalAccount");
  }
  return (
    <div className="menu">
      <div className="menu_desktop">
        <ul className="menu_list">
          <li>
            <Link to="/Applications" className="menu_list-item">
              Заявки
            </Link>
          </li>
          <li>
            <a href="https://t.me/Swizi0" target="_blank" className="menu_list-item">
              Тех. поддержка
            </a>
          </li>
        </ul>
        <div onClick={goToPersonalAccount} className="menu__user">
          <span className="menu__user_login">
            {localStorage.getItem("login")}
          </span>
          <AccountCircleIcon className="menu__user-icon"/>
        </div>
      </div>
      <div className="menu_mobile">
        <div className="menu_mobile__header-block">
          <IconButton onClick={() => history.goBack()}>
            <ArrowBackIcon style={{color: "#fff"}}/>
          </IconButton>
          <div class="burger" onClick={toggleMenu}>
            <span class="burger__line burger__line_first"></span>
            <span class="burger__line burger__line_second"></span>
            <span class="burger__line burger__line_third"></span>
            <span class="burger__line burger__line_fourth"></span>
          </div>
        </div>
        <ul className="dropdown_list">
          <li className="dropdown_list-item">
            <Link to="/Applications" className="dropdown_list-item-text">
              Заявки
            </Link>
          </li>
          <li className="dropdown_list-item">
            <Link to="/PersonalAccount" className="dropdown_list-item-text">
              Личный кабинет
            </Link>
          </li>
          <li className="dropdown_list-item">
            <a href="https://t.me/Swizi0" target="_blank" className="dropdown_list-item-text">
              Тех. Поддержка
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
