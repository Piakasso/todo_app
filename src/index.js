import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";

import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Router basename="/">
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
