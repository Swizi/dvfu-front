import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import "./Menu.css";
import IconButton from "@material-ui/core/IconButton";

export function Menu(props) {
  const toggleMenu = () => {
    document.querySelector(".burger").classList.toggle("burger_active");
    // menu.classList.toggle("menu_active");
    document.querySelector(".dropdown_list").classList.toggle("dropdown_active");
  };
  return (
    <div className="menu">
      <div className="menu_desktop">
        <ul className="menu_list">
          <li>
            <Link to="/Applications" className="menu_list-item">
              Заявки
            </Link>
          </li>
        </ul>
        <IconButton>
          <AccountCircleIcon />
        </IconButton>
      </div>
      <div className="menu_mobile">
        <div className="menu_mobile__header-block">
          <div class="burger" onClick={toggleMenu}>
            <span class="burger__line burger__line_first"></span>
            <span class="burger__line burger__line_second"></span>
            <span class="burger__line burger__line_third"></span>
            <span class="burger__line burger__line_fourth"></span>
          </div>
        </div>
        <ul className="dropdown_list">
          <li className="dropdown_list-item"><Link to="/" className="dropdown_list-item-text">Заявки</Link></li>
        </ul>
      </div>
    </div>
  );
}
