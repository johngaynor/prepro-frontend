import Main from "./Main";
import Navbar from "./Main/components/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { configureStore } from "./store";
import { ErrorBoundary } from "react-error-boundary";
import DefaultError from "./Main/components/Errors/DefaultError";
import { registerSW } from "virtual:pwa-register";

const store = configureStore();

function App() {
  useEffect(() => {
    console.log("Checking service worker...");
    registerSW({
      onNeedRefresh() {
        if (confirm("New version available. Reload?")) {
          window.location.reload();
        }
      },
      onOfflineReady() {
        console.log("App ready to work offline");
      },
    });
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <ErrorBoundary FallbackComponent={DefaultError}>
          <Toaster
            toastOptions={{
              style: {
                width: "100%",
                fontSize: "20px",
              },
            }}
          />
          <div
            style={{
              height: "100vh",
            }}
          >
            <Navbar />
            <Main />
          </div>
        </ErrorBoundary>
      </Router>
    </Provider>
  );
}

export default App;
