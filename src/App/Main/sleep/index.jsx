import React, { useEffect } from "react";
import Tab from "../components/Tab";
import Spinner from "../components/Spinner";
import { connect } from "react-redux";
import { getSleepLogs, getSleepSettings, updateSleepSettings } from "./actions";
import { useNavigate, useParams } from "react-router-dom";
import SleepStatistics from "./tabs/Statistics";
import SleepIntegrations from "./tabs/Integrations";
import SleepSettings from "./tabs/Settings";

const SleepApp = ({
  logs,
  logsLoading,
  getSleepLogs,
  settings,
  settingsLoading,
  getSleepSettings,
  updateSleepSettings,
}) => {
  useEffect(() => {
    if (!logs && !logsLoading) getSleepLogs();
    if (!settings && !settingsLoading) getSleepSettings();
  }, [
    logs,
    logsLoading,
    getSleepLogs,
    settings,
    settingsLoading,
    getSleepSettings,
  ]);

  const { maintab } = useParams();
  const navigate = useNavigate();

  const mainPanes = [
    {
      menuItem: "Statistics",
      render: () => {
        return <SleepStatistics logs={logs} settings={settings} />;
      },
    },
    {
      menuItem: "Integrations",
      render: () => {
        return <SleepIntegrations />;
      },
    },
    {
      menuItem: "Settings",
      render: () => {
        return (
          <SleepSettings
            settings={settings}
            updateSleepSettings={updateSleepSettings}
          />
        );
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
      {(logsLoading || settingsLoading) && <Spinner />}
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
    logs: state.sleep.logs,
    logsLoading: state.sleep.logsLoading,
    settings: state.sleep.settings,
    settingsLoading: state.sleep.settingsLoading,
  };
}

export default connect(mapStateToProps, {
  getSleepLogs,
  getSleepSettings,
  updateSleepSettings,
})(SleepApp);
