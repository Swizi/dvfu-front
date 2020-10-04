import React, {useState, useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import "./MiniApplication.css";
import Button from '@material-ui/core/Button';

export function MiniApplication(props) {

    return <div className="mini_application">
        <div className="mini_app__header-block">
            <h3 className="mini_app__title">{props.application.title}</h3>
            <span className="mini_app__price">Цена: {props.application.price}</span>
        </div>
        <Button onClick={() => props.openApplication(props.application.id)} variant="contained" color="primary"
            className="mini_app__button">Посмотреть</Button>
    </div>;
}
