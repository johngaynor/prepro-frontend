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
} from "semantic-ui-react";
import { DateTime } from "luxon";
import DietForm from "../components/DietForm";
import { connect } from "react-redux";
import { editDietLog, deleteDietLog } from "../../actions";

const History = ({
  dietLogs,
  modalOpen,
  setModalOpen,
  editDietLog,
  deleteDietLog,
}) => {
  const [confirm, setConfirm] = useState(null);

  const formattedLogs = dietLogs?.sort(
    (a, b) =>
      DateTime.fromISO(b.effectiveDate) - DateTime.fromISO(a.effectiveDate)
  );

  return (
    <Segment>
      <DietForm
        open={!!modalOpen}
        log={modalOpen?.id ? modalOpen : null}
        onCancel={() => setModalOpen(null)}
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
              </TableCell>
              <TableCell>
                <ButtonGroup>
                  <Button icon="edit" onClick={() => setModalOpen(log)} />
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
