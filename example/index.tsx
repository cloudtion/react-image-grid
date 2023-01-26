import React from "react";
import ReactDOM from "react-dom/client";
import "./style.scss";
import App from "./App";
import Favicon from './assets/favicon.ico';

const root_el = document.createElement('div');
root_el.id = 'root';
document.body.appendChild(root_el);

const root = ReactDOM.createRoot(root_el);

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