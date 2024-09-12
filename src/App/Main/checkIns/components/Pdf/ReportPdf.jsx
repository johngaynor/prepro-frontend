import { Document, View, Text, Page, Image } from "@react-pdf/renderer";
import { DateTime } from "luxon";

const FormQuestionBox = ({ question }) => {
  return (
    <View style={{ margin: "10 0" }}>
      <Text style={{ fontStyle: "italic" }}>{question.question}:</Text>
      <Text style={{ marginTop: 5 }}>{" - " + (question.answer || "N/a")}</Text>
    </View>
  );
};

const TableCell = ({
  text,
  borderTop = false,
  borderRight = true,
  borderBottom = true,
  borderLeft = false,
  width = "auto",
}) => {
  return (
    <View
      style={{
        borderTop: borderTop ? "0.5px solid black" : null,
        borderRight: borderRight ? "0.5px solid black" : null,
        borderBottom: borderBottom ? "0.5px solid black" : null,
        borderLeft: borderLeft ? "0.5px solid black" : null,
        height: 20,
        width: width,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Text style={{ margin: "0 10" }}>{text || "--"}</Text>
    </View>
  );
};

const TableRow = ({ log, backgroundColor = "white" }) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: backgroundColor,
      }}
    >
      <TableCell
        text={DateTime.fromISO(log.date).toFormat("MM/dd ccc")}
        width="20%"
        borderLeft
      />
      <TableCell text={log.amWeight} width="15%" />
      <TableCell text={log.amNotes} width="65%" />
    </View>
  );
};

const LogTable = ({ logs, selectedDay }) => {
  return (
    <View>
      {/* header */}
      <View style={{ display: "flex", flexDirection: "row" }}>
        <TableCell text="Day" width="20%" borderLeft borderTop />
        <TableCell text="Weight" width="15%" borderTop />
        <TableCell text="Comments" width="65%" borderTop />
      </View>
      {logs?.map((l, i) => {
        return (
          <TableRow
            log={l}
            key={"table-log-" + i}
            backgroundColor={
              l.date === selectedDay.date
                ? "#75c9c8"
                : i % 2 === 0
                ? "#F8F8F6"
                : "#E0E2DB"
            }
          />
        );
      })}
    </View>
  );
};

const CheckInDoc = ({ selectedDay, logs }) => {
  return (
    <Document>
      <Page size="letter" style={{ padding: 100, fontSize: 10 }}>
        {/* Header section */}
        <View
          style={{
            marginTop: -30,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Text style={{ textDecoration: "underline", fontSize: 14 }}>
            Mandatory Client Check In Sheet
          </Text>
          <Text style={{ margin: "10 auto" }}>
            Fill this out and send to me with pictures every Friday/Saturday
          </Text>
          <Text style={{ marginBottom: 10 }}>
            Delay in sending updates will result in delay of plan changes if
            necessary
          </Text>
        </View>
        {/* Images section */}
        <View
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          {selectedDay?.photos?.map((p, i) => (
            <Image
              src={{
                uri: p.signedUrl,
                method: "GET",
                headers: { "Cache-Control": "no-cache" },
                body: "",
              }}
              key={"checkin-photo-report-" + i}
              style={{ height: 500 }}
            />
          ))}
        </View>
      </Page>
      {/* Questions section */}
      <Page size="letter" style={{ padding: 100, fontSize: 10 }}>
        {/* Weight Log */}
        <Text style={{ marginBottom: 10 }}>Morning Logs:</Text>
        <LogTable logs={logs} selectedDay={selectedDay} />
        {/* Questions */}
        <View>
          {selectedDay?.questions?.map((q, i) => (
            <FormQuestionBox question={q} key={"form-question-" + i} />
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default CheckInDoc;
