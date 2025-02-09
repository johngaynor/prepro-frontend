import React, { useEffect } from "react";
import Tab from "../components/Tab";
import Spinner from "../components/Spinner";
import { connect } from "react-redux";
import { getSleepLogs } from "./actions";
import { useNavigate, useParams } from "react-router-dom";
import SleepStatistics from "./tabs/Statistics";
import SleepIntegrations from "./tabs/Integrations";

const SleepApp = ({ sleepLogs, sleepLogsLoading, getSleepLogs }) => {
  useEffect(() => {
    if (!sleepLogs && !sleepLogsLoading) getSleepLogs();
  }, [sleepLogs, sleepLogsLoading, getSleepLogs]);

  const { maintab } = useParams();
  const navigate = useNavigate();

  const mainPanes = [
    {
      menuItem: "Statistics",
      render: () => {
        return <SleepStatistics sleepLogs={sleepLogs} />;
      },
    },
    {
      menuItem: "Integrations",
      render: () => {
        return <SleepIntegrations />;
      },
    },
  ];

  const activeTab = mainPanes.findIndex(
    (pane) => pane.menuItem.toLowerCase() === maintab
  );

  useEffect(() => {
    if (activeTab < 0) navigate("/sleep/statistics");
  });

  return (
    <>
      {sleepLogsLoading && <Spinner />}
      <Tab
        panes={mainPanes}
        activeIndex={activeTab}
        onTabChange={(e, { activeIndex }) =>
          navigate(`/sleep/${mainPanes[activeIndex].menuItem.toLowerCase()}`)
        }
      />
    </>
  );
};

function mapStateToProps(state) {
  return {
    sleepLogs: state.sleep.logs,
    sleepLogsLoading: state.sleep.logsLoading,
  };
}

export default connect(mapStateToProps, { getSleepLogs })(SleepApp);
