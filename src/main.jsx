import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App/App.jsx";
import "./index.css";
import "semantic-ui-css/semantic.min.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { registerSW } from "virtual:pwa-register";

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("New content is available. Reload?")) {
      updateSW(true);
    }
  },
});

// // Clear any old service workers and caches on app load, commented out because it was creating a constant cycle of refreshing
// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker.getRegistrations().then((registrations) => {
//     registrations.forEach((registration) => {
//       registration.unregister(); // Unregister old service workers
//     });
//   });

//   caches.keys().then((names) => {
//     names.forEach((name) => caches.delete(name)); // Delete all cached assets
//   });
// }

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
