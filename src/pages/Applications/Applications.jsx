import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

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

import Button from "@material-ui/core/Button";

import Modal from "@material-ui/core/Modal";

import { ToastProvider, useToasts } from "react-toast-notifications";

import "./Applications.css";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    maxWidth: 355,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const validate = (values) => {
  const errors = {};

  if (!/^[0-9]+$/g.test(values.price) && values.price !== "") {
    errors.price = "Введите число";
  }

  return errors;
};

export function Applications(props) {
  const classes = useStyles();
  const { addToast } = useToasts();
  let history = useHistory();
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [sortOption, setSortOption] = useState("new");
  const [applications, setApplications] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openAppModal, setAppOpenModal] = useState(false);
  const [activeApp, setActiveApp] = useState({});
  const [loadingApplications, setLoadingApplications] = useState(false);
  const [user, setUser] = useState({
    login: "",
    first_name: "",
    last_name: "",
    tel: 0,
    sm_link: "",
    code: "",
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      price: "",
      description: "",
    },
    validate,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      setLoading(true);
      $.post(
        `/ajax/manage_application.php`,
        {
          target: "create-application",
          title: values.title,
          price: values.price,
          description: values.description,
        },
        function (data) {
          var response = $.parseJSON(data);
          if (response.status == 0) {
            setOpenModal(false);
            addToast("Заявка успешно создана", {
              appearance: "success",
              autoDismiss: true,
            });
            let newApp = {
              title: values.title,
              price: values.price
            }
            setApplications([...applications, newApp]);
          } else {
            addToast("Ошибка при создании заявки", {
              appearance: "error",
              autoDismiss: true,
            });
          }
          setLoading(false);
        }
      );
    },
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
      `/ajax/get_application.php`,
      {
        target: "get-application-list",
      },
      function (data) {
        var response = $.parseJSON(data);
        let ex_array = [];
        for (var key in response) {
          if (key !== "status") {
            ex_array.push(response[key]);
          }
        }
        setApplications(ex_array);
        setPageLoading(false);
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
        }
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
    setLoading(true);
    setActiveApp({});
    setAppOpenModal(true);
    $.post(
      `/ajax/get_application.php`,
      {
        target: "get-application",
        application_id: app_id,
      },
      function (data) {
        var response = $.parseJSON(data);
        if (response.status == 0) {
          setActiveApp(response);
          setLoading(false);
        } else {
          setAppOpenModal(false);
        }
      }
    );
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleAppCloseModal = () => {
    setAppOpenModal(false);
  };

  const deleteApp = (app_id) => {
    setLoading(true);
    $.post(
      `/ajax/manage_application.php`,
      {
        target: "delete-application",
        application_id: app_id,
      },
      function (data) {
        var response = $.parseJSON(data);
        if (response.status == 0) {
          setAppOpenModal(false);
          setLoading(false);
        } else {
          alert("Error");
        }
      }
    );
    setLoadingApplications(true);
    $.post(
      `/ajax/get_application.php`,
      {
        target: "get-application-list",
      },
      function (data) {
        var response = $.parseJSON(data);
        let ex_array = [];
        for (var key in response) {
          if (key !== "status") {
            ex_array.push(response[key]);
          }
        }
        setApplications(ex_array);
        setLoadingApplications(false);
      }
    );
  };

  const acceptApp = (app_id) => {
    setLoading(true);
    $.post(
      `/ajax/accept_application.php`,
      {
        target: "accept-application",
        application_id: app_id,
      },
      function (data) {
        var response = $.parseJSON(data);
        if (response.status == 0) {
          setAppOpenModal(false);
          setLoading(false);
          addToast("Заявка принята", {
            appearance: "success",
            autoDismiss: true,
          });
        } else {
          alert("Error");
        }
      }
    );
  };

  return (
    <div className="page">
      <Menu login={user.login} />
      <div className="applications-container">
        <FormControl>
          <Select
            value={sortOption}
            onChange={sortApplications}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="new">Сначала новые</MenuItem>
            <MenuItem value="old">Сначала старые</MenuItem>
          </Select>
        </FormControl>
        <div className="applications">
          {!loadingApplications &&
            applications.map((application, index) => (
              application &&
              <MiniApplication
                application={application}
                key={index}
                openApplication={openApplication}
              />
            ))}{" "}
          {loadingApplications && (
            <CircularProgress
              className="circular_progress"
              style={{ margin: "10px 0 10px 0" }}
            />
          )}
        </div>
      </div>
      <IconButton onClick={handleOpenModal} className="add_app">
        <AddCircleIcon style={{ color: "#ff5500", fontSize: "48px" }} />
      </IconButton>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          className={classes.paper}
        >
          <h2 id="simple-modal-title">Создание заявки</h2>
          {loading && (
            <CircularProgress
              className="circular_progress"
              style={{ margin: "10px 0 10px 0" }}
            />
          )}
          <form
            method="POST"
            onSubmit={formik.handleSubmit}
            autoComplete="on"
            className="modal_form"
          >
            <input
              required
              type="text"
              id="title"
              name="title"
              placeholder="Оглавление заявки"
              onChange={formik.handleChange}
              value={formik.values.title}
              className="modal_form__input-text"
            />
            <input
              type="text"
              id="price"
              name="price"
              placeholder="Цена"
              onChange={formik.handleChange}
              value={formik.values.price}
              className="modal_form__input-text"
              style={{
                border: formik.errors.price ? "2px solid red" : "none",
              }}
            />
            {formik.errors.price && (
              <span className="error_text">{formik.errors.price}</span>
            )}
            <textarea
              required
              id="description"
              name="description"
              placeholder="Описание"
              onChange={formik.handleChange}
              value={formik.values.description}
              className="modal_form__input-textarea"
            ></textarea>
            <input type="submit" value="Создать" class="modal_form__submit" />
          </form>
          {/* <SimpleModal /> */}
        </div>
      </Modal>
      <Modal
        open={openAppModal}
        onClose={handleAppCloseModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            boxSizing: "border-box",
          }}
          className={classes.paper}
        >
          {!loading && (
            <div>
              <h2 id="simple-modal-title">{activeApp.title}</h2>
              <p id="simple-modal-description" style={{ marginTop: "10px" }}>
                {activeApp.description}
              </p>
              <p id="simple-modal-description" style={{ marginTop: "15px" }}>
                Цена: {activeApp.price} руб.
              </p>
              <div style={{ marginTop: "20px" }}>
                {!activeApp.is_author && (
                  <Button
                    onClick={() => acceptApp(activeApp.id)}
                    variant="contained"
                    color="primary"
                    style={{ marginRight: "30px" }}
                  >
                    Принять
                  </Button>
                )}
                {activeApp.is_author && (
                  <Button
                    onClick={() => deleteApp(activeApp.id)}
                    variant="contained"
                    color="secondary"
                  >
                    Удалить
                  </Button>
                )}
              </div>
            </div>
          )}
          {loading && (
            <CircularProgress
              className="circular_progress"
              style={{ margin: "10px 0 10px 0" }}
            />
          )}
          {/* <SimpleModal /> */}
        </div>
      </Modal>
    </div>
  );
}
