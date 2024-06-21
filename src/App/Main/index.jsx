import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Homepage from "./Homepage";
import BreadCrumb from "./components/Breadcrumb";

const Main = (props) => {
  const location = useLocation();

  return (
    <div style={{ margin: "1rem" }}>
      <BreadCrumb path={location.pathname} />
      <Routes>
        <Route path="/" element={<Homepage startsWith={"/"} />} />
        <Route path="*" element={<Homepage startsWith={location.pathname} />} />
      </Routes>
    </div>
  );
};

export default Main;
