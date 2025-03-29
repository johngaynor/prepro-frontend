import Main from "./Main";
import Navbar from "./Main/components/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "./store";
import { ErrorBoundary } from "react-error-boundary";
import DefaultError from "./Main/components/Errors/DefaultError";

const store = configureStore();

function App() {
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
