import React, { useState } from "react";
import {
  Segment,
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableCell,
  TableBody,
  Table,
  ButtonGroup,
  Button,
  Confirm,
  Popup,
} from "semantic-ui-react";
import { DateTime } from "luxon";
import DietForm from "../components/DietForm";
import { connect } from "react-redux";
import { editDietLog, deleteDietLog } from "../../actions";
import { useQuery } from "../../../customHooks";
import { useLocation, useNavigate } from "react-router-dom";

const History = ({ dietLogs, editDietLog, deleteDietLog }) => {
  const [confirm, setConfirm] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const query = useQuery(location.search, navigate);

  const formattedLogs = dietLogs?.sort(
    (a, b) =>
      DateTime.fromISO(b.effectiveDate) - DateTime.fromISO(a.effectiveDate)
  );

  const activeLog = formattedLogs?.find(
    (log) => log.id === parseInt(query.active)
  );

  return (
    <Segment>
      <DietForm
        open={!!query.active}
        log={activeLog || null}
        onCancel={() => query.update({ active: null })}
        onConfirm={(values) => editDietLog(values)}
      />
      <Confirm
        open={!!confirm}
        content="Are you sure you want to delete this entry? This action cannot be undone."
        onCancel={() => setConfirm(null)}
        onConfirm={() => {
          deleteDietLog(confirm);
          setConfirm(null);
        }}
      />

      <Table striped>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Effective Date</TableHeaderCell>
            <TableHeaderCell>Cardio</TableHeaderCell>
            <TableHeaderCell>Protein</TableHeaderCell>
            <TableHeaderCell>Carbs</TableHeaderCell>
            <TableHeaderCell>Fat</TableHeaderCell>
            <TableHeaderCell>Calories</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {formattedLogs?.map((log, index) => (
            <TableRow
              key={"diet-log-" + index}
              positive={index === 0 ? true : false}
            >
              <TableCell>
                {DateTime.fromISO(log.effectiveDate).toFormat("MMM dd, yyyy")}
              </TableCell>
              <TableCell>{log.cardio}</TableCell>
              <TableCell>{parseInt(log.protein)}</TableCell>
              <TableCell>{parseInt(log.carbs)}</TableCell>
              <TableCell>{parseInt(log.fat)}</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>
                {parseInt(log.calories)}
                <Popup
                  content={log.notes || "No notes!"}
                  trigger={
                    <Button
                      icon="info circle"
                      size="mini"
                      style={{ marginLeft: 5 }}
                    />
                  }
                />
              </TableCell>
              <TableCell>
                <ButtonGroup>
                  <Button
                    icon="edit"
                    onClick={() => query.update({ active: log.id })}
                  />
                  <Button icon="trash" onClick={() => setConfirm(log.id)} />
                </ButtonGroup>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Segment>
  );
};

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, { editDietLog, deleteDietLog })(
  History
);
