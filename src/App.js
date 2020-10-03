import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Registration } from "./pages/Registration/Registration";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { Applications } from "./pages/Applications/Applications";
import { PersonalAccount } from "./pages/PersonalAccount/PersonalAccount";
import { ToastProvider, useToasts } from 'react-toast-notifications'

import CircularProgress from "@material-ui/core/CircularProgress";

const host = "http://localhost";

function App() {
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <div className="loading_block">
        <h3 className="loading_header">DVFU.Food</h3>
        <CircularProgress className="circular_progress" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route
            host={host}
            exact
            path="/"
            header="Главная страница"
            render={() => <ToastProvider><Home host={host} /></ToastProvider>}
          />{" "}
          <Route
            host={host}
            exact
            path="/Registration"
            header="Регистрация"
            render={() => <ToastProvider><Registration host={host} /></ToastProvider>}
          />{" "}
          <Route
            host={host}
            exact
            path="/Login"
            header="Логинация"
            render={() => <ToastProvider><Login host={host} /></ToastProvider>}
          />{" "}
          <Route
            host={host}
            exact
            path="/Applications"
            header="Заявки"
            render={() => <ToastProvider><Applications host={host} /></ToastProvider>}
          />{" "}
          <Route
            host={host}
            exact
            path="/PersonalAccount"
            header="Личный кабинет"
            render={() => <ToastProvider><PersonalAccount host={host} /></ToastProvider>}
          />{" "}
        </Switch>{" "}
      </div>{" "}
    </BrowserRouter>
  );
}

export default App;
