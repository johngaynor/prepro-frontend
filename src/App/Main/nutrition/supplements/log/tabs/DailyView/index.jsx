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
import { InputField } from "../../../../../components/FormFields";
import MissedModal from "./components/MissedModal";
import { connect } from "react-redux";
import { toggleSupplementLog, addMissedSupplement } from "../../../actions";
import { isMobile } from "../../../../../customHooks";
import HorizontalSlide from "../../../../../components/Motion/HorizontalSlide";

const DailyView = ({
  supplements,
  logs,
  toggleSupplementLog,
  addMissedSupplement,
}) => {
  const [selectedDay, setSelectedDay] = useState(
    DateTime.now().toFormat("yyyy-MM-dd")
  );
  const [missedItem, setMissedItem] = useState(null);

  const formattedDate = DateTime.fromISO(selectedDay).toFormat("yyyy-MM-dd");

  const filteredLogs = supplements?.reduce((acc, val) => {
    const retObj = { ...acc };

    const match = logs?.find(
      (l) => l.date === formattedDate && l.supplementId === val.id
    );

    if (!retObj[val.categoryName]) {
      retObj[val.categoryName] = [];
    }

    retObj[val.categoryName].push({
      ...val,
      reason: match?.reason,
      completed: match?.completed,
      time: match?.time,
    });

    return retObj;
  }, {});

  function handleChangeDate(direction) {
    let newDate;

    if (direction === "left") {
      newDate = DateTime.fromISO(selectedDay)
        .minus({ days: 1 })
        .toFormat("yyyy-MM-dd");
    } else if (direction === "right") {
      newDate = DateTime.fromISO(selectedDay)
        .plus({ days: 1 })
        .toFormat("yyyy-MM-dd");
    }

    setSelectedDay(newDate);
  }

  return (
    <HorizontalSlide handleChangeDate={handleChangeDate} pageKey={selectedDay}>
      <Tab.Pane>
        <MissedModal
          handleClose={() => setMissedItem(null)}
          missedItem={missedItem}
          selectedDay={selectedDay}
          addMissedSupplement={addMissedSupplement}
        />
        <Grid stackable columns={3} style={{ marginBottom: "10px" }}>
          <Grid.Column>
            <InputField
              type="date"
              label="Date"
              value={formattedDate}
              onChange={(e, { value }) => setSelectedDay(value)}
            />
          </Grid.Column>
          {!isMobile && (
            <Grid.Column verticalAlign="bottom">
              <Button
                icon="arrow left"
                color="blue"
                onClick={() => handleChangeDate("left")}
                style={{ marginLeft: -20 }}
              />
              <Button
                icon="arrow right"
                color="blue"
                onClick={() => handleChangeDate("right")}
              />
            </Grid.Column>
          )}
        </Grid>
        <Table striped>
          {!isMobile && (
            <TableHeader>
              <TableRow>
                <TableHeaderCell>Item</TableHeaderCell>
                <TableHeaderCell>Description</TableHeaderCell>
                <TableHeaderCell>Dosage</TableHeaderCell>
                <TableHeaderCell>Completed?</TableHeaderCell>
                <TableHeaderCell>Missed?</TableHeaderCell>
              </TableRow>
            </TableHeader>
          )}

          <TableBody>
            {filteredLogs &&
              Object.keys(filteredLogs).map((category, i) => {
                return (
                  <React.Fragment key={"supp-category-" + i}>
                    <TableRow key={"supp-category-" + i}>
                      <TableCell colSpan={5} style={{ fontWeight: "bold" }}>
                        {category.toUpperCase()}(S)
                      </TableCell>
                    </TableRow>
                    {filteredLogs[category].map((item, i) => {
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
                            {isMobile && item.dosage && ` - ${item.dosage}`}
                            {(item.completed || item.reason) &&
                              item.time &&
                              ` (${DateTime.fromISO(item.time, { zone: "utc" })
                                .toLocal()
                                .toFormat("M/d/yy h:mm a")})`}
                          </TableCell>
                          <TableCell>{item.description}</TableCell>
                          {!isMobile && (
                            <TableCell>{item.dosage || "--"}</TableCell>
                          )}
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
                            {!item.completed && item.completed !== 0 && (
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
                  </React.Fragment>
                );
              })}
          </TableBody>
        </Table>
      </Tab.Pane>
    </HorizontalSlide>
  );
};

function mapStateToProps(state) {
  return {
    supplements: state.supplements.supplements,
    logs: state.supplements.logs,
  };
}

export default connect(mapStateToProps, {
  toggleSupplementLog,
  addMissedSupplement,
})(DailyView);
