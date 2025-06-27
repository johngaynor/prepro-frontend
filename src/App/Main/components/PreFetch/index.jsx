import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getSleepLogs } from "../../sleep/actions";
import { getWeightLogs } from "../../nutrition/actions";
import {
  getSupplements,
  getSupplementLogs,
} from "../../nutrition/supplements/actions";
import { getCheckIns } from "../../checkIns/actions";

const PreFetch = ({
  sleepLogs,
  sleepLogsLoading,
  getSleepLogs,
  weightLogs,
  weightLogsLoading,
  getWeightLogs,
  supplements,
  supplementsLoading,
  getSupplements,
  supplementLogs,
  supplementLogsLoading,
  getSupplementLogs,
  checkIns,
  checkInsLoading,
  getCheckIns,
}) => {
  useEffect(() => {
    if (!sleepLogs && !sleepLogsLoading) getSleepLogs();
    if (!weightLogs && !weightLogsLoading) getWeightLogs();
    // if (!supplements && !supplementsLoading) getSupplements();
    // if (!supplementLogs && !supplementLogsLoading) getSupplementLogs();
    if (!checkIns && !checkInsLoading) getCheckIns();
  }, []);

  return true;
};

function mapStateToProps(state) {
  return {
    sleepLogs: state.sleep.logs,
    sleepLogsLoading: state.sleep.logsLoading,
    weightLogs: state.nutrition.weightLogs,
    weightLogsLoading: state.nutrition.logsLoading,
    supplements: state.supplements.supplements,
    supplementsLoading: state.supplements.supplementsLoading,
    supplementLogs: state.supplements.logs,
    supplementLogsLoading: state.supplements.logsLoading,
    checkIns: state.checkIns.checkIns,
    checkInsLoading: state.checkIns.checkInsLoading,
  };
}

export default connect(mapStateToProps, {
  getSleepLogs,
  getWeightLogs,
  getSupplements,
  getSupplementLogs,
  getCheckIns,
})(PreFetch);
