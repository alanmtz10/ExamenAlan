import React from "react";
import ReactDOM from "react-dom/client";
import routes from "./router/routes";
import { RouterProvider } from "react-router-dom";
import "./assets/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
);
