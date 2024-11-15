import React, { useEffect, useState } from "react";
import { Tab, Header, Segment, Grid } from "semantic-ui-react";
import Spinner from "../../../components/Spinner";
import { connect } from "react-redux";
import WeightChart from "./WeightChart";
import { getWeightLogs, getDietLogs } from "../../../nutrition/actions";
import { DateTime } from "luxon";
import { DropdownField } from "../../../components/FormFields";

const smallOptions = [
  { text: "Last 7 Days", value: 7 },
  { text: "Last 14 Days", value: 14 },
  { text: "Last Month", value: 30 },
  { text: "Last 2 Months", value: 60 },
];

const largeOptions = [
  { text: "Last 6 Months", value: 120 },
  { text: "Last Year", value: 365 },
  { text: "All Time", value: "all" },
];

const Weight = ({
  // from redux
  weightLogs,
  weightLogsLoading,
  getWeightLogs,
  dietLogs,
  dietLogsLoading,
  getDietLogs,
}) => {
  const [primary, setPrimary] = useState(7);
  const [secondary, setSecondary] = useState(30);
  const [tertiary, setTertiary] = useState(120);

  useEffect(() => {
    if (!weightLogs && !weightLogsLoading) getWeightLogs();
    if (!dietLogs && !dietLogsLoading) getDietLogs();
  }, [weightLogs, weightLogsLoading, dietLogs, dietLogsLoading]);

  const primaryData = weightLogs
    ? Array.from({ length: primary })
        .map((_, index) => {
          const date = DateTime.now().minus({ days: index }).startOf("day");
          const log = weightLogs.find((l) => l.date === date.toISODate());

          let count = 0;

          const previous = (
            Array.from({ length: primary }).reduce((acc, _, i) => {
              // const retArr = [...acc];
              const movingDate = date.minus({ days: i }).startOf("day");
              const movingLog = weightLogs.find(
                (l) => l.date === movingDate.toISODate()
              );

              if (movingLog && movingLog.weight) {
                count++;
                return (acc += parseFloat(movingLog.weight));
              }
            }, 0) / count
          ).toFixed(1);

          return {
            // date: date.toFormat("MMM dd"),
            date,
            value: log?.weight || null,
            moving: !isNaN(previous) ? previous : null,
          };
        })
        .reverse()
    : [];

  const secondaryData = weightLogs
    ? Array.from({ length: secondary })
        .map((_, index) => {
          const date = DateTime.now().minus({ days: index }).startOf("day");
          const log = weightLogs.find((l) => l.date === date.toISODate());

          let count = 0;

          const previous = (
            Array.from({ length: secondary }).reduce((acc, _, i) => {
              // const retArr = [...acc];
              const movingDate = date.minus({ days: i }).startOf("day");
              const movingLog = weightLogs.find(
                (l) => l.date === movingDate.toISODate()
              );

              if (movingLog && movingLog.weight) {
                count++;
                return (acc += parseFloat(movingLog.weight));
              }
            }, 0) / count
          ).toFixed(1);

          return {
            // date: date.toFormat("MMM dd"),
            date,
            value: log?.weight || null,
            moving: !isNaN(previous) ? previous : null,
          };
        })
        .reverse()
    : [];

  const oldestDate = weightLogs
    ? weightLogs
        .map((log) => DateTime.fromISO(log.date))
        .reduce((min, current) => (current < min ? current : min))
    : null;

  const tertiaryData = weightLogs
    ? Array.from({
        length:
          tertiary === "all"
            ? DateTime.now().diff(oldestDate, "days").days + 1
            : tertiary,
      })
        .map((_, index) => {
          const date = DateTime.now().minus({ days: index }).startOf("day");
          const log = weightLogs.find((l) => l.date === date.toISODate());
          return {
            // date: date.toFormat("MMM dd, yyyy"),
            date,
            value: log?.weight || null,
          };
        })
        .reverse()
    : [];

  return (
    <Tab.Pane>
      {(weightLogsLoading || dietLogsLoading) && <Spinner />}
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
                  {primaryData[0]?.date.toFormat("MMM dd")} -{" "}
                  {primaryData[primaryData.length - 1]?.date.toFormat("MMM dd")}
                </Header>
              </Grid.Column>
            </Grid>
            <WeightChart
              data={primaryData}
              primaryLine="#086788"
              secondaryLine="#06AED5"
              style={{ marginTop: 30 }}
              shortenDate
              dietLogs={dietLogs || []}
            />
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
                  {secondaryData[0]?.date.toFormat("MMM dd")} -{" "}
                  {secondaryData[secondaryData.length - 1]?.date.toFormat(
                    "MMM dd"
                  )}
                </Header>
              </Grid.Column>
            </Grid>

            <WeightChart
              data={secondaryData}
              primaryLine="#086788"
              secondaryLine="#06AED5"
              style={{ marginTop: 30 }}
              shortenDate
              dietLogs={dietLogs || []}
            />
          </Segment>
        </Grid.Column>
      </Grid>
      <Segment>
        <Grid columns={2}>
          <DropdownField
            options={largeOptions}
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
              {tertiaryData[0]?.date.toFormat("MMM dd, yyyy")} -{" "}
              {tertiaryData[tertiaryData.length - 1]?.date.toFormat(
                "MMM dd, yyyy"
              )}
            </Header>
          </Grid.Column>
        </Grid>
        <WeightChart
          data={tertiaryData}
          dot={false}
          primaryLine="#086788"
          secondaryLine="#06AED5"
          dietLogs={dietLogs || []}
        />
      </Segment>
    </Tab.Pane>
  );
};

function mapStateToProps(state) {
  return {
    weightLogs: state.nutrition.weightLogs,
    weightLogsLoading: state.nutrition.logsLoading,
    dietLogs: state.nutrition.dietLogs,
    dietLogsLoading: state.nutrition.dietLogsLoading,
  };
}

export default connect(mapStateToProps, { getWeightLogs, getDietLogs })(Weight);
