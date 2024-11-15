import React, { useEffect, useState } from "react";
import { Tab, Header, Segment, Grid } from "semantic-ui-react";
import Spinner from "../../../components/Spinner";
import { connect } from "react-redux";
import { DateTime } from "luxon";
import { DropdownField } from "../../../components/FormFields";
import { getSleepLogs } from "../../../sleep/actions";
import CycleChart from "./CycleChart";

const smallOptions = [
  { text: "Last 7 Days", value: 7 },
  { text: "Last 14 Days", value: 14 },
  { text: "Last Month", value: 30 },
  { text: "Last 2 Months", value: 60 },
];

const Sleep = ({
  // from redux
  sleepLogs,
  sleepLogsLoading,
  getSleepLogs,
}) => {
  const [primary, setPrimary] = useState(7);
  const [secondary, setSecondary] = useState(30);
  const [tertiary, setTertiary] = useState(30);

  useEffect(() => {
    if (!sleepLogs && !sleepLogsLoading) getSleepLogs();
  }, [sleepLogs, sleepLogsLoading]);

  const sortedSleepLogs = sleepLogs
    ?.sort((a, b) => DateTime.fromISO(a.date) - DateTime.fromISO(b.date))
    .map((s) => ({
      ...s,
      awakeQty: parseFloat(s.awakeQty),
      lightQty: parseFloat(s.lightQty),
      remQty: parseFloat(s.remQty),
      deepQty: parseFloat(s.deepQty),
    }));

  console.log(sortedSleepLogs);

  return (
    <Tab.Pane>
      {sleepLogsLoading && <Spinner />}
      <Grid columns={2}>
        <Grid.Column>
          <Segment>
            <Grid columns={2}>
              <DropdownField
                options={smallOptions}
                value={primary}
                onChange={(e, { value }) => setPrimary(value)}
              />
              <Grid.Column
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Header as="h2">
                  {/* {primaryData[0]?.date.toFormat("MMM dd")} -{" "}
                  {primaryData[primaryData.length - 1]?.date.toFormat("MMM dd")} */}
                  test
                </Header>
              </Grid.Column>
            </Grid>
            {/* <WeightChart
              data={primaryData}
              primaryLine="#086788"
              secondaryLine="#06AED5"
              style={{ marginTop: 30 }}
              shortenDate
              dietLogs={dietLogs || []}
            /> */}
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>
            <Grid columns={2}>
              <DropdownField
                options={smallOptions}
                value={secondary}
                onChange={(e, { value }) => setSecondary(value)}
              />
              <Grid.Column
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Header as="h2">
                  {/* {secondaryData[0]?.date.toFormat("MMM dd")} -{" "}
                  {secondaryData[secondaryData.length - 1]?.date.toFormat(
                    "MMM dd"
                  )} */}
                  test
                </Header>
              </Grid.Column>
            </Grid>
            {/* <WeightChart
              data={secondaryData}
              primaryLine="#086788"
              secondaryLine="#06AED5"
              style={{ marginTop: 30 }}
              shortenDate
              dietLogs={dietLogs || []}
            /> */}
          </Segment>
        </Grid.Column>
      </Grid>
      <Segment>
        <Grid columns={2}>
          <DropdownField
            options={smallOptions}
            value={tertiary}
            onChange={(e, { value }) => setTertiary(value)}
          />
          <Grid.Column
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Header as="h2">
              Sleep Cycles
              {/* {tertiaryData[0]?.date.toFormat("MMM dd, yyyy")} -{" "}
              {tertiaryData[tertiaryData.length - 1]?.date.toFormat(
                "MMM dd, yyyy"
              )} */}
            </Header>
          </Grid.Column>
        </Grid>
        <CycleChart
          data={sortedSleepLogs?.slice(-tertiary)}
          style={{ marginTop: 30 }}
        />
      </Segment>
    </Tab.Pane>
  );
};

function mapStateToProps(state) {
  return {
    sleepLogs: state.sleep.logs,
    sleepLogsLoading: state.sleep.logsLoading,
  };
}

export default connect(mapStateToProps, { getSleepLogs })(Sleep);
