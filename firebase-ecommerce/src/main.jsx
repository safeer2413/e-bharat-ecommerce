import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import MyState from "./context/MyState";
import { Provider } from "react-redux";
import { store } from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <MyState>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MyState>
    </Provider>
  </React.StrictMode>
);