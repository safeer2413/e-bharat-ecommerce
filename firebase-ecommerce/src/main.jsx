import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import MyState from "./context/MyState";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MyState>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MyState>
  </React.StrictMode>
);