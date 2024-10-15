import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Homepage from "./homepage";
import BreadCrumb from "./components/Breadcrumb";
import Spinner from "./components/Spinner";
import { Segment } from "semantic-ui-react";
import { connect } from "react-redux";
// page imports
import Logs from "./logs";
import ExerciseLog from "./fitness/log";
import DailyLogForm from "./logs/components/DailyLogForm/DailyLogForm";
import AdminConsole from "./admin";
import FitnessLogAdmin from "./fitness/admin";
import CheckInLogs from "./checkIns";
import ActivityLogs from "./activity";
import SupplementLogPage from "./nutrition/supplements/log";

const Main = ({ user, apps, ...props }) => {
  const location = useLocation();

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
      <BreadCrumb path={location.pathname} />
      <Routes>
        <Route path="/" element={<Homepage startsWith={"/"} />} />
        <Route path="/admin" element={withAuth(AdminConsole, 1)} />
        <Route path="/logs" element={withAuth(Logs, 2)} />
        <Route path="/fitness/log" element={withAuth(ExerciseLog, 3)} />
        <Route path="/fitness/log/:date" element={withAuth(ExerciseLog, 3)} />
        <Route path="/logs/new/:logType" element={withAuth(DailyLogForm, 3)} />
        <Route
          path="/fitness/exercises"
          element={withAuth(FitnessLogAdmin, 4)}
        />
        <Route path="/checkins" element={withAuth(CheckInLogs, 5)} />

        <Route path="/checkins/:date" element={withAuth(CheckInLogs, 5)} />
        <Route path="/activity" element={withAuth(ActivityLogs, 6)} />
        <Route
          path="/nutrition/supplements"
          element={withAuth(SupplementLogPage, 7)}
        />
        <Route path="*" element={<Homepage startsWith={location.pathname} />} />
      </Routes>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    user: state.app.user,
    apps: state.app.apps,
  };
}

export default connect(mapStateToProps, {})(Main);
