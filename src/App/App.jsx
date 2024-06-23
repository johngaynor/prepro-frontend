import Main from "./Main";
import Navbar from "./Main/components/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AppContext from "./Main/components/Context/appContext";
import React from "react";

function App() {
  const { user, setUser } = React.useContext(AppContext);
  return (
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
  );
}

export default App;
