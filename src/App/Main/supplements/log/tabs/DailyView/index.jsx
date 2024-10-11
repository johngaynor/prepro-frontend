import React, { useState } from "react";
import {
  Tab,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  TableHeaderCell,
  Checkbox,
  Grid,
  Icon,
  Popup,
  Button,
} from "semantic-ui-react";
import { DateTime } from "luxon";
import { InputField } from "../../../../components/FormFields";
import MissedModal from "./components/MissedModal";
import { connect } from "react-redux";
import { toggleSupplementLog } from "../../../actions";

const DailyView = ({ supplements, logs, toggleSupplementLog }) => {
  const [selectedDay, setSelectedDay] = useState(
    DateTime.now().toFormat("yyyy-MM-dd")
  );
  const [missedItem, setMissedItem] = useState(null);

  const formattedDate = DateTime.fromISO(selectedDay).toFormat("yyyy-MM-dd");

  const filteredLogs = supplements?.reduce((acc, val) => {
    const retArr = [...acc];

    const match = logs?.find(
      (l) => l.date === formattedDate && l.supplementId === val.id
    );

    retArr.push({ ...val, reason: match?.reason, completed: match?.completed });
    return retArr;
  }, []);

  // console.log(logs, filteredLogs);

  return (
    <Tab.Pane>
      {/* <MissedModal
        handleClose={() => setMissedItem(null)}
        missedItem={missedItem}
        selectedDay={selectedDay}
        addMissedSupplement={addMissedSupplement}
      /> */}
      <Grid stackable columns={3} style={{ marginBottom: "10px" }}>
        <Grid.Column>
          <InputField
            type="date"
            label="Date"
            value={formattedDate}
            onChange={(e, { value }) => setSelectedDay(value)}
          />
        </Grid.Column>
        <Grid.Column verticalAlign="bottom">
          <Button
            icon="arrow left"
            color="blue"
            onClick={() => {
              const yesterday = DateTime.fromISO(selectedDay)
                .minus({ days: 1 })
                .toFormat("yyyy-MM-dd");
              setSelectedDay(yesterday);
            }}
            style={{ marginLeft: -20 }}
          />
          <Button
            icon="arrow right"
            color="blue"
            onClick={() => {
              const tomorrow = DateTime.fromISO(selectedDay)
                .plus({ days: 1 })
                .toFormat("yyyy-MM-dd");
              setSelectedDay(tomorrow);
            }}
          />
        </Grid.Column>
      </Grid>
      <Table striped>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Supplement</TableHeaderCell>
            <TableHeaderCell>Description</TableHeaderCell>
            <TableHeaderCell>Dosage</TableHeaderCell>
            <TableHeaderCell>Completed?</TableHeaderCell>
            <TableHeaderCell>Missed?</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredLogs?.map((item, i) => {
            return (
              <TableRow
                verticalAlign="top"
                key={"supp-item-" + i}
                positive={!!item.completed}
                negative={item.completed === 0}
              >
                <TableCell style={{ fontWeight: "bold" }}>
                  <Icon
                    name={
                      item.completed
                        ? "checkmark"
                        : item.completed === 0
                        ? "cancel"
                        : "question"
                    }
                  />
                  {item.name}
                </TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>--</TableCell>
                <TableCell verticalAlign="top">
                  <Checkbox
                    checked={!!item.completed}
                    onChange={() => {
                      toggleSupplementLog(item, formattedDate);
                    }}
                    disabled={item.completed === 0}
                  />
                </TableCell>
                <TableCell>
                  {(!item.completed || item.completed !== 0) && (
                    <Icon
                      name="cancel"
                      onClick={() => setMissedItem(item)}
                      style={{ cursor: "pointer" }}
                    />
                  )}
                  {item.reason && (
                    <Popup
                      content={item.reason}
                      trigger={
                        <Icon
                          name="info circle"
                          style={{ cursor: "pointer" }}
                        />
                      }
                      position="top center"
                    />
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Tab.Pane>
  );
};

function mapStateToProps(state) {
  return {
    supplements: state.supplements.supplements,
    logs: state.supplements.logs,
  };
}

export default connect(mapStateToProps, { toggleSupplementLog })(DailyView);
