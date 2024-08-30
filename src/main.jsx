import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App/App.jsx";
import "./index.css";
import "semantic-ui-css/semantic.min.css";
import { AppProvider } from "./App/Main/context/appContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
