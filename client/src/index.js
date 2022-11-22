import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Context from "./Store/context";
import App from "./App";
import "./index.css";
import AppContext from "./Store/AppContext";
import SlotModal from "./Store/SlotModalContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SlotModal>
        <AppContext>
          <Context>
            <App />
          </Context>
        </AppContext>
      </SlotModal>
    </BrowserRouter>
  </React.StrictMode>
);
