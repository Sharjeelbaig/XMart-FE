import "font-awesome/css/font-awesome.min.css";
import "font-awesome/css/font-awesome.css";
import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./router.tsx";
import "./styles/index.css";
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from "react-redux";
import store from "./storage/store.ts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <ToastContainer />
        <Router />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
