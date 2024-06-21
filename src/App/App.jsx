import Main from "./Main";
import Navbar from "./Main/components/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
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
