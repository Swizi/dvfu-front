import React, {useState, useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import "./MiniApplication.css";

export function MiniApplication(props) {

    return <div className="mini_application">
        <div className="mini_app__header-block">
            <h3 className="mini_app__title">{props.application.title}</h3>
            <span className="mini_app__price">{props.application.price}</span>
        </div>
        <button onClick={() => props.openApplication(props.application.id)}
            className="mini_app__button">Посмотреть</button>
    </div>;
}
