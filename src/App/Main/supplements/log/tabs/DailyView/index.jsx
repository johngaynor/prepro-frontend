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
} from "semantic-ui-react";
import SupplementContext from "../../context/supplementContext";
import { DateTime } from "luxon";
import { InputField } from "../../../../components/FormFields";

const DailyView = () => {
  const [selectedDay, setSelectedDay] = useState(
    DateTime.now().toFormat("yyyy-MM-dd")
  );
  const { suppItems, suppLogs, toggleSupplementLog } =
    useContext(SupplementContext);

  const formattedDate = DateTime.fromISO(selectedDay).toFormat("yyyy-MM-dd");

  const filteredLogs = suppItems?.reduce((acc, val) => {
    const retArr = [...acc];

    const match = suppLogs?.find(
      (l) => l.date === formattedDate && l.supplementId === val.id
    );
    if (match) {
      retArr.push({ ...val, completed: true });
    } else {
      retArr.push({ ...val });
    }
    return retArr;
  }, []);

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
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredLogs?.map((item, i) => {
            return (
              <TableRow verticalAlign="top" key={"supp-item-" + i}>
                <TableCell style={{ fontWeight: "bold" }}>
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
                  />
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
