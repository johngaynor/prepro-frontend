import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App/App.jsx";
import "./index.css";
import "semantic-ui-css/semantic.min.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { registerSW } from "virtual:pwa-register";
import { ErrorBoundary } from "react-error-boundary";
import DefaultError from "./App/Main/components/Errors/DefaultError.jsx";

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("New content is available. Reload?")) {
      updateSW(true);
    }
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={DefaultError}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
