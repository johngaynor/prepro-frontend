import React, { useContext, useState } from "react";
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
} from "semantic-ui-react";
import SupplementContext from "../../context/supplementContext";
import { DateTime } from "luxon";
import { InputField } from "../../../../components/FormFields";

const DailyView = () => {
  const [selectedDay, setSelectedDay] = useState(
    DateTime.now().toFormat("yyyy-MM-dd")
  );
  const { suppItems, suppLogs, missedLogs, toggleSupplementLog } =
    useContext(SupplementContext);

  const formattedDate = DateTime.fromISO(selectedDay).toFormat("yyyy-MM-dd");

  const filteredLogs = suppItems?.reduce((acc, val) => {
    const retArr = [...acc];

    const match = suppLogs?.find(
      (l) => l.date === formattedDate && l.supplementId === val.id
    );
    const missedMatch = missedLogs?.find(
      (l) => l.date === formattedDate && l.supplementId === val.id
    );

    if (match || missedMatch) {
      retArr.push({
        ...val,
        completed: !!match,
        missed: !!missedMatch,
      });
    } else {
      retArr.push({ ...val });
    }
    return retArr;
  }, []);

  console.log(filteredLogs);
  return (
    <Tab.Pane>
      <Grid stackable columns={3} style={{ marginBottom: "10px" }}>
        <InputField
          type="date"
          label="Date"
          value={formattedDate}
          onChange={(e, { value }) => setSelectedDay(value)}
        />
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
                positive={item.completed}
                negative={item.missed}
              >
                <TableCell style={{ fontWeight: "bold" }}>
                  <Icon
                    name={
                      item.completed
                        ? "checkmark"
                        : item.missed
                        ? "cancel"
                        : "question"
                    }
                  />
                  {item.name}
                  {/* <br />
                {item.description} */}
                </TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>--</TableCell>
                <TableCell verticalAlign="top">
                  <Checkbox
                    checked={item.completed}
                    onChange={() => {
                      toggleSupplementLog(item, formattedDate);
                    }}
                    disabled={item.missed}
                  />
                </TableCell>
                <TableCell>
                  {!item.completed && !item.missed && (
                    <Icon
                      name="cancel"
                      onClick={() => {
                        console.log("edit item", item);
                      }}
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

export default DailyView;
