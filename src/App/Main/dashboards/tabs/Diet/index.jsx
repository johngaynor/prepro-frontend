import React, { useEffect, useState } from "react";
import {
  Tab,
  Header,
  Segment,
  Grid,
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableCell,
  TableBody,
  Table,
  Button,
  Popup,
} from "semantic-ui-react";
import Spinner from "../../../components/Spinner";
import { connect } from "react-redux";
import MacroChart from "./MacroChart";
import CardioChart from "./CardioChart";
import { getDietLogs, getWeightLogs } from "../../../nutrition/actions";
import { DropdownField } from "../../../components/FormFields";
import { generateData } from "./helperFunctions";
import { DateTime } from "luxon";
import { useNavigate } from "react-router-dom";

const largeOptions = [
  { text: "Last Month", value: 30 },
  { text: "Last 3 Months", value: 90 },
  { text: "Last 6 Months", value: 180 },
  { text: "Last Year", value: 365 },
];

const Diet = ({
  // from redux
  weightLogs,
  weightLogsLoading,
  getWeightLogs,
  dietLogs,
  dietLogsLoading,
  getDietLogs,
}) => {
  const [secondary, setSecondary] = useState(90);
  const [tertiary, setTertiary] = useState(90);

  const navigate = useNavigate();

  useEffect(() => {
    if (!weightLogs && !weightLogsLoading) getWeightLogs();
    if (!dietLogs && !dietLogsLoading) getDietLogs();
  }, [weightLogs, weightLogsLoading, dietLogs, dietLogsLoading]);

  const macroData =
    dietLogs && weightLogs ? generateData(dietLogs, weightLogs) : [];

  const sortedDietLogs = dietLogs
    ?.sort(
      (a, b) =>
        DateTime.fromISO(b.effectiveDate) - DateTime.fromISO(a.effectiveDate)
    )
    .reverse();

  const tableData = sortedDietLogs?.reduce((acc, log, index) => {
    const nextDietLog = sortedDietLogs[index + 1];

    const endDay = !nextDietLog
      ? null
      : weightLogs?.find((l) => l.date === nextDietLog.effectiveDate);

    const start = weightLogs?.find((l) => l.date === log.effectiveDate);
    const end = nextDietLog
      ? endDay
      : weightLogs?.find((l) => l.date === DateTime.now().toISODate());

    return [
      ...acc,
      {
        id: log.id,
        date: log.effectiveDate,
        delta: (end.weight - start.weight).toFixed(1),
        calories: log.calories,
        cardio: log.cardio,
        cardioMinutes: log.cardioMinutes,
        start,
        end,
      },
    ];
  }, []);

  return (
    <Tab.Pane>
      {(weightLogsLoading || dietLogsLoading) && <Spinner />}
      <Grid columns={2}>
        <Grid.Column>
          <Segment>
            <div style={{ maxHeight: 370, overflowY: "auto" }}>
              <Table striped>
                <TableHeader>
                  <TableRow>
                    <TableHeaderCell
                      style={{ position: "sticky", top: 0, zIndex: 1 }}
                    >
                      Effective Date
                    </TableHeaderCell>
                    <TableHeaderCell
                      style={{ position: "sticky", top: 0, zIndex: 1 }}
                    >
                      Calories
                    </TableHeaderCell>
                    <TableHeaderCell
                      style={{ position: "sticky", top: 0, zIndex: 1 }}
                    >
                      Cardio
                    </TableHeaderCell>
                    <TableHeaderCell
                      style={{ position: "sticky", top: 0, zIndex: 1 }}
                    >
                      Min / Week
                    </TableHeaderCell>
                    <TableHeaderCell
                      style={{ position: "sticky", top: 0, zIndex: 1 }}
                    >
                      Weight Change (lbs)
                    </TableHeaderCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tableData?.reverse().map((d, index) => (
                    <TableRow
                      key={"diet-weight-table-" + index}
                      positive={index === 0 ? true : false}
                      onClick={() => navigate(`/nutrition/diet?active=${d.id}`)}
                      style={{ cursor: "pointer" }}
                    >
                      <TableCell>
                        {DateTime.fromISO(d.date).toFormat("MMM dd, yyyy")}
                      </TableCell>
                      <TableCell>{d.calories}</TableCell>
                      <TableCell>{d.cardio}</TableCell>
                      <TableCell>{d.cardioMinutes}</TableCell>
                      <TableCell>
                        {d.delta > 0 ? "+" : ""}
                        {d.delta}
                        <Popup
                          content={
                            <>
                              Start weight: {d.start.weight}
                              <br />
                              End weight: {d.end.weight}
                            </>
                          }
                          trigger={
                            <Button
                              icon="info circle"
                              size="mini"
                              style={{ marginLeft: 5 }}
                            />
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>
            <Grid columns={2}>
              <DropdownField
                options={largeOptions}
                value={secondary}
                onChange={(e, { value }) => setSecondary(value)}
              />
              <Grid.Column
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Header as="h2">Cardio (minutes / week)</Header>
              </Grid.Column>
            </Grid>
            <CardioChart
              data={macroData?.slice(-secondary)}
              style={{ marginTop: 30 }}
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
            <Header as="h2">Macro % of Calories</Header>
          </Grid.Column>
        </Grid>
        <MacroChart
          data={macroData?.slice(-tertiary)}
          style={{ marginTop: 30 }}
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

export default connect(mapStateToProps, { getWeightLogs, getDietLogs })(Diet);
