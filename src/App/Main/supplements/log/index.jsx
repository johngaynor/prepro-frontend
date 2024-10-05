import React, { useContext, useEffect } from "react";
import DailyView from "./tabs/DailyView";
import MonthlyView from "./tabs/MonthlyView";
import SupplementContext, {
  SupplementProvider,
} from "./context/supplementContext";
import Tab from "../../components/Tab";
import Spinner from "../../components/Spinner";

const SupplementLog = () => {
  const {
    suppItems,
    suppsLoading,
    getSupplements,
    suppLogs,
    logsLoading,
    getSupplementLogs,
    missedLogs,
    missedLogsLoading,
    getMissedSupplements,
  } = useContext(SupplementContext);

  useEffect(() => {
    if (!suppItems && !suppsLoading) getSupplements();
    if (!suppLogs && !logsLoading) getSupplementLogs();
    if (!missedLogs && !missedLogsLoading) getMissedSupplements();
  }, [
    suppItems,
    suppsLoading,
    suppLogs,
    logsLoading,
    missedLogs,
    missedLogsLoading,
  ]);

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
      {(suppsLoading || logsLoading) && <Spinner />}
      <Tab panes={mainPanes} />
    </>
  );
};

const SupplementLogPage = () => {
  return (
    <SupplementProvider>
      <SupplementLog />
    </SupplementProvider>
  );
};

export default SupplementLogPage;
