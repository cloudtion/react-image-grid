import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import App from "./App";
import Favicon from './favicon.ico';

const root = ReactDOM.createRoot(document.getElementById("root") as Element);

const favi = document.createElement("link");
favi.setAttribute("rel", "icon");
favi.setAttribute("type", "image/x-icon");
favi.setAttribute("href", Favicon);

document.head.appendChild(favi);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);