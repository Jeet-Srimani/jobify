import React from "react";
import ReactDOM from "react-dom/client";
import "normalize.css";
import "./index.css";
import App from "./App";
import AppContext from "./context/appContext";

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);

root.render(
  <AppContext>
    <App />
  </AppContext>
);
