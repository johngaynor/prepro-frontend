import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Homepage from "./Homepage";
import BreadCrumb from "./components/Breadcrumb";
import Logs from "./components/DailyLogs/logs";
import ExerciseLog from "./fitness/exerciseLog";
import DailyLogForm from "./components/DailyLogForm/DailyLogForm";
import AdminConsole from "./admin";
import AppContext from "./components/Context/appContext";
import { LogProvider } from "./components/Context/logContext";
import Spinner from "./components/Spinner";
import { Segment } from "semantic-ui-react";

const Main = (props) => {
  const location = useLocation();
  const { apps, user } = React.useContext(AppContext);

  const withAuth = (Component, appId) => {
    const match = apps.find((a) => a.id === appId);
    if (match) {
      return <Component {...props} />;
    } else {
      if (!user || !apps.length) {
        return <Spinner />;
      } else
        return (
          <Segment>
            <h4>
              You do not have access to this app. Please contact your coach or
              account manager to grant access.
            </h4>
          </Segment>
        );
    }
  };

  return (
    <div style={{ margin: "1rem" }}>
      {!apps && <Spinner />}
      <BreadCrumb path={location.pathname} />
      <LogProvider>
        <Routes>
          <Route path="/" element={<Homepage startsWith={"/"} />} />
          <Route path="/admin" element={withAuth(AdminConsole, 1)} />
          <Route path="/logs" element={withAuth(Logs, 2)} />
          <Route path="/fitness/log" element={withAuth(ExerciseLog, 3)} />
          <Route
            path="/logs/new/:logType"
            element={withAuth(DailyLogForm, 3)}
          />
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
