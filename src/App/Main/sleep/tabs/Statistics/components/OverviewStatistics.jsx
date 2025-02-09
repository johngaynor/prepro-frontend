import { Grid, Header, Icon, Message, Segment } from "semantic-ui-react";
import { calculateHoursMinutes } from "../../../components/helperFunctions";
import { StatisticsBox } from "../../../components/DashboardComponents";

const OverviewStatistics = ({ settings, lastCheckIn, sleepLogsThisWeek }) => {
  const days =
    settings && settings.checkInFrequency
      ? parseInt(settings.checkInFrequency)
      : 7;
  const avgThisWeek =
    sleepLogsThisWeek &&
    sleepLogsThisWeek.length &&
    (
      sleepLogsThisWeek?.reduce(
        (acc, val) => (acc += parseFloat(val.totalSleep)),
        0
      ) / sleepLogsThisWeek?.length
    )?.toFixed(2);

  const avgCheckInDiff =
    avgThisWeek && lastCheckIn && avgThisWeek - lastCheckIn.avgTotalSleep;

  const daysLeft = days - sleepLogsThisWeek?.length;

  const targetAvg =
    avgCheckInDiff &&
    daysLeft &&
    ((Math.abs(avgCheckInDiff) * sleepLogsThisWeek.length) / daysLeft).toFixed(
      2
    );

  return (
    <Segment>
      <Header as="h1" icon>
        <Icon name="line graph" size="massive" color="teal" />
        Statistics this week:
      </Header>
      <Grid columns={3} doubling stackable>
        <StatisticsBox value={avgThisWeek} label="Average" />
        <StatisticsBox
          value={lastCheckIn?.avgTotalSleep}
          label="Last Check-in"
        />
        <StatisticsBox
          value={avgCheckInDiff}
          label="Difference"
          color={
            !avgCheckInDiff ? "black" : avgCheckInDiff >= 0 ? "green" : "red"
          }
        />
      </Grid>
      <Message
        positive={avgCheckInDiff >= 0}
        negative={avgCheckInDiff < 0}
        hidden={!avgCheckInDiff}
      >
        {avgCheckInDiff >= 0 ? (
          <>
            <h4 style={{ marginBottom: -5 }}>Congratulations, you're ahead!</h4>
            {daysLeft ? (
              <p>
                You need to sleep{" "}
                <strong>
                  {calculateHoursMinutes(
                    parseFloat(lastCheckIn?.avgTotalSleep) -
                      parseFloat(targetAvg)
                  )}
                </strong>{" "}
                over the next <strong>{daysLeft}</strong> night
                {daysLeft > 1 ? "s" : ""} to beat last week.
              </p>
            ) : (
              <p>
                You beat last week by {calculateHoursMinutes(avgCheckInDiff)}.
              </p>
            )}
          </>
        ) : (
          <>
            <h4 style={{ marginBottom: -5 }}>Warning, you're behind!</h4>
            {daysLeft ? (
              <p>
                You need to sleep{" "}
                <strong>
                  {calculateHoursMinutes(
                    parseFloat(lastCheckIn?.avgTotalSleep) +
                      parseFloat(targetAvg)
                  )}
                </strong>{" "}
                over the next <strong>{daysLeft}</strong> night
                {daysLeft > 1 ? "s" : ""} to beat last week.
              </p>
            ) : (
              <p>
                You were behind{" "}
                <strong>
                  {calculateHoursMinutes(Math.abs(avgCheckInDiff))}
                </strong>{" "}
                this week.
              </p>
            )}
          </>
        )}
      </Message>
    </Segment>
  );
};

export default OverviewStatistics;
