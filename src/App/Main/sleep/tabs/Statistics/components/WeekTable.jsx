import { DateTime } from "luxon";
import {
  Header,
  Segment,
  Table,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableBody,
  TableCell,
} from "semantic-ui-react";
import { calculateHoursMinutes } from "../../../components/helperFunctions";

const WeekTable = ({ sleepLogsThisWeek }) => {
  return (
    <Segment>
      <Header as="h3">Sleep Logs this Week</Header>
      <div style={{ maxHeight: 290, overflowY: "auto" }}>
        <Table striped>
          <TableHeader>
            <TableRow>
              <TableHeaderCell
                style={{ position: "sticky", top: 0, zIndex: 1 }}
              >
                Date
              </TableHeaderCell>
              <TableHeaderCell
                style={{ position: "sticky", top: 0, zIndex: 1 }}
              >
                Total Sleep
              </TableHeaderCell>
              <TableHeaderCell
                style={{ position: "sticky", top: 0, zIndex: 1 }}
              >
                Time in Bed
              </TableHeaderCell>
              <TableHeaderCell
                style={{ position: "sticky", top: 0, zIndex: 1 }}
              >
                Wakeup
              </TableHeaderCell>
              <TableHeaderCell
                style={{ position: "sticky", top: 0, zIndex: 1 }}
              >
                Bedtime
              </TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sleepLogsThisWeek
              ?.sort((a, b) => b.date.localeCompare(a.date))
              .map((l) => (
                <TableRow key={l.id}>
                  <TableCell>
                    {DateTime.fromISO(l.date).toFormat("EEEE M/d")}
                  </TableCell>
                  <TableCell>{calculateHoursMinutes(l.totalSleep)}</TableCell>
                  <TableCell>{calculateHoursMinutes(l.totalBed)}</TableCell>
                  <TableCell>--</TableCell>
                  <TableCell>--</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </Segment>
  );
};

export default WeekTable;
