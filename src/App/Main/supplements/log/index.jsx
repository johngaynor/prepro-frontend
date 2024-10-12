import React, { useEffect } from "react";
import DailyView from "./tabs/DailyView";
import MonthlyView from "./tabs/MonthlyView";
import Tab from "../../components/Tab";
import Spinner from "../../components/Spinner";
import { getSupplements, getSupplementLogs } from "../actions";
import { connect } from "react-redux";

const SupplementLog = ({
  supplements,
  supplementsLoading,
  getSupplements,
  logs,
  logsLoading,
  getSupplementLogs,
}) => {
  useEffect(() => {
    if (!supplements && !supplementsLoading) getSupplements();
    if (!logs && !logsLoading) getSupplementLogs();
  }, [supplements, supplementsLoading, logs, logsLoading]);

  const mainPanes = [
    {
      menuItem: "Daily View",
      render: () => {
        return <DailyView />;
      },
    },
    {
      menuItem: "Monthly View",
      render: () => {
        return <MonthlyView />;
      },
    },
  ];
  return (
    <>
      {(supplementsLoading || logsLoading) && <Spinner />}
      <Tab panes={mainPanes} />
    </>
  );
};

function mapStateToProps(state) {
  return {
    supplements: state.supplements.supplements,
    supplementsLoading: state.supplements.supplementsLoading,
    logs: state.supplements.logs,
    logsLoading: state.supplements.logsLoading,
  };
}

export default connect(mapStateToProps, { getSupplements, getSupplementLogs })(
  SupplementLog
);
