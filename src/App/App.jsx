import Main from "./Main";
import Navbar from "./Main/components/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "./store";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Toaster
          toastOptions={{
            style: {
              width: "100%",
              fontSize: "20px",
            },
          }}
        />
        <Navbar />
        <div
          style={{
            paddingTop: "30px",
          }}
        >
          <Main />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
