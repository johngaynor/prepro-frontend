import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Homepage from "./Homepage";
import BreadCrumb from "./components/Breadcrumb";
import Logs from "./components/DailyLogs/logs";
// import LogProvider from "./components/Context/logContext";
import { LogProvider } from "./components/Context/logContext";

const Main = (props) => {
  const location = useLocation();

  return (
    <div style={{ margin: "1rem" }}>
      <BreadCrumb path={location.pathname} />
      <LogProvider>
        <Routes>
          <Route path="/" element={<Homepage startsWith={"/"} />} />
          <Route path="/logs" element={<Logs />} />
          <Route
            path="*"
            element={<Homepage startsWith={location.pathname} />}
          />
        </Routes>
      </LogProvider>
    </div>
  );
};

export default Main;
