import React, { useEffect, useState } from "react";
import { Tab, Header, Segment, Grid } from "semantic-ui-react";
import Spinner from "../../../components/Spinner";
import { connect } from "react-redux";
import WeightChart from "./WeightChart";
import { getWeightLogs } from "../../../nutrition/actions";
import { DateTime } from "luxon";
import { DropdownField } from "../../../components/FormFields";

const smallOptions = [
  { text: "Last 7 Days", value: 7 },
  { text: "Last 14 Days", value: 14 },
  { text: "Last 30 Days", value: 30 },
  { text: "Last 60 Days", value: 60 },
];

const Weight = ({
  // from redux
  weightLogs,
  logsLoading,
  getWeightLogs,
}) => {
  const [primary, setPrimary] = useState(7);
  const [secondary, setSecondary] = useState(30);

  useEffect(() => {
    if (!weightLogs && !logsLoading) getWeightLogs();
  }, [weightLogs, logsLoading]);

  const primaryData = weightLogs
    ? Array.from({ length: primary })
        .map((_, index) => {
          const date = DateTime.now().minus({ days: index }).startOf("day");
          const log = weightLogs.find((l) => l.date === date.toISODate());
          return {
            date: date.toFormat("MMM dd"),
            value: log?.weight || null,
          };
        })
        .reverse()
    : [];

  const secondaryData = weightLogs
    ? Array.from({ length: secondary })
        .map((_, index) => {
          const date = DateTime.now().minus({ days: index }).startOf("day");
          const log = weightLogs.find((l) => l.date === date.toISODate());
          return {
            date: date.toFormat("MMM dd"),
            value: log?.weight || null,
          };
        })
        .reverse()
    : [];

  const oldestDate = weightLogs
    ? weightLogs
        .map((log) => DateTime.fromISO(log.date))
        .reduce((min, current) => (current < min ? current : min))
    : null;

  const allTime = weightLogs
    ? Array.from({ length: DateTime.now().diff(oldestDate, "days").days + 1 })
        .map((_, index) => {
          const date = DateTime.now().minus({ days: index }).startOf("day");
          const log = weightLogs.find((l) => l.date === date.toISODate());
          return {
            date: date.toFormat("MMM dd, yyyy"),
            value: log?.weight || null,
          };
        })
        .reverse()
    : [];

  return (
    <Tab.Pane>
      {logsLoading && <Spinner />}
      <Grid columns={2}>
        <Grid.Column>
          <Segment>
            <DropdownField
              options={smallOptions}
              value={primary}
              onChange={(e, { value }) => setPrimary(value)}
            />
            <WeightChart
              data={primaryData}
              lineColor="#06AED5"
              style={{ marginTop: 30 }}
            />
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>
            <DropdownField
              options={smallOptions}
              value={secondary}
              onChange={(e, { value }) => setSecondary(value)}
            />
            <WeightChart
              data={secondaryData}
              lineColor="#086788"
              style={{ marginTop: 30 }}
            />
          </Segment>
        </Grid.Column>
      </Grid>
      <Segment>
        <Header as="h2">
          All Time ({oldestDate?.toFormat("MMM dd, yyyy")} -{" "}
          {DateTime.now().toFormat("MMM dd, yyyy")})
        </Header>
        <WeightChart data={allTime} dot={false} lineColor="#078BAF" />
      </Segment>
    </Tab.Pane>
  );
};

function mapStateToProps(state) {
  return {
    weightLogs: state.nutrition.weightLogs,
    logsLoading: state.nutrition.logsLoading,
  };
}

export default connect(mapStateToProps, { getWeightLogs })(Weight);
