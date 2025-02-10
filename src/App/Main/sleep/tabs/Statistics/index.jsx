import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getCheckIns } from "../../../checkIns/actions";
import { Grid, Segment } from "semantic-ui-react";
import OverviewStatistics from "./components/OverviewStatistics";
import WeekTable from "./components/WeekTable";

const SleepStatistics = ({
  logs,
  checkIns,
  checkInsLoading,
  getCheckIns,
  settings,
}) => {
  useEffect(() => {
    if (!checkIns && !checkInsLoading) getCheckIns();
  }, [checkIns, checkInsLoading, getCheckIns]);

  const lastCheckIn = checkIns?.sort((a, b) => b.date.localeCompare(a.date))[0];

  const sleepLogsThisWeek =
    lastCheckIn && logs && logs.filter((l) => l.date > lastCheckIn.date);

  return (
    <Segment>
      <Grid columns={2} doubling stackable>
        <Grid.Column>
          <OverviewStatistics
            settings={settings}
            lastCheckIn={lastCheckIn}
            sleepLogsThisWeek={sleepLogsThisWeek}
          />
        </Grid.Column>
        <Grid.Column>
          <WeekTable sleepLogsThisWeek={sleepLogsThisWeek} />
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

function mapStateToProps(state) {
  return {
    checkIns: state.checkIns.checkIns,
    checkInsLoading: state.checkIns.checkInsLoading,
  };
}

export default connect(mapStateToProps, { getCheckIns })(SleepStatistics);
