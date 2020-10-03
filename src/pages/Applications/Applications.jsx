import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import $ from "jquery";
import { useFormik } from "formik";
import CircularProgress from "@material-ui/core/CircularProgress";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import { MiniApplication } from "../../components/MiniApplication/MiniApplication";
import { Menu } from "../../components/Menu/Menu";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import IconButton from "@material-ui/core/IconButton";

import Modal from '@material-ui/core/Modal';

import "./Applications.css"

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

export function Applications(props) {
  let history = useHistory();
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [sortOption, setSortOption] = useState("new");
  const [applications, setApplications] = useState([]);

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
      `/ajax/get_application.php`,
      {
        target: "get-application-list",
      },
      function (data) {
        var response = $.parseJSON(data);
        console.log("Response = ", response);
        if (response.status == 0) {
          setApplications(response);
        }
        setPageLoading(false);
      }
    );
  }, []);

  useEffect(() => {
    // alert("Sorting...");
  }, [sortOption]);

  if (pageLoading) {
    return (
      <div className="loading_block">
        <h3 className="loading_header">DVFU.Food</h3>
        <CircularProgress className="circular_progress" />
      </div>
    );
  }

  const sortApplications = (event) => {
    setSortOption(event.target.value);
  };

  const openApplication = (app_id) => {
    alert("App id = ", app_id);
  }

  return (
    <div className="page">
      <Menu />
      <div className="applications-container">
        <FormControl>
          <Select
            value="new"
            onChange={sortApplications}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="new">Сначала новые</MenuItem>
            <MenuItem value="old">Сначала старые</MenuItem>
          </Select>
        </FormControl>
        <div className="applications">
          {applications.map((application, index) => (
            <MiniApplication application={application} key={index}/>
          ))}{" "}
        </div>
      </div>
      <IconButton>
        <AddCircleIcon style={{ color: "#ff5500" }} />
      </IconButton>
    </div>
  );
}
