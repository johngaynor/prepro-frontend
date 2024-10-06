import { Document, View, Text, Page, Image, Svg } from "@react-pdf/renderer";
import { DrawLineGraph } from "./pdfFunctions";
import { DateTime } from "luxon";

const FormQuestionBox = ({ question }) => {
  return (
    <View style={{ margin: "10 0" }}>
      <Text style={{ fontStyle: "italic" }}>{question.question}:</Text>
      <Text style={{ marginTop: 5 }}>{" - " + (question.answer || "N/a")}</Text>
    </View>
  );
};

function getMax(values) {
  const filteredValues = values
    .map((v) => v.value)
    .filter((v) => v !== null && v !== undefined);
  return filteredValues.length > 0 ? Math.max(...filteredValues) : null;
}

function getMin(values) {
  const filteredValues = values
    .map((v) => v.value)
    .filter((v) => v !== null && v !== undefined);
  return filteredValues.length > 0 ? Math.min(...filteredValues) : null;
}

const CheckInDoc = ({ selectedDay, logs = [] }) => {
  const last7Days = selectedDay
    ? Array.from({ length: 7 })
        .map((_, index) => {
          const currentDay = DateTime.fromISO(selectedDay.date);
          const day = currentDay
            .minus({ days: index })
            .startOf("day")
            .toISODate();
          const log = logs.find((l) => l.date === day);
          return { date: day, value: log?.weight || null };
        })
        .reverse()
    : [];

  const max7 = getMax(last7Days);
  const min7 = getMin(last7Days);

  const last30Days = selectedDay
    ? Array.from({ length: 30 })
        .map((_, index) => {
          const currentDay = DateTime.fromISO(selectedDay.date);
          const day = currentDay
            .minus({ days: index })
            .startOf("day")
            .toISODate();
          const log = logs.find((l) => l.date === day);
          return { date: day, value: log?.weight || null };
        })
        .reverse()
    : [];

  const max30 = getMax(last30Days);
  const min30 = getMin(last30Days);

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
          {/* Last 30 days */}
          <View
            style={{ marginBottom: 7, display: "flex", flexDirection: "row" }}
          >
            <View
              style={{
                width: "100%",
                marginBottom: -10,
              }}
            >
              <Svg style={{ height: 80, width: "120%" }}>
                {last30Days.map((log, index) => {
                  const x = 33 + 13.5 * index;

                  return (
                    <Text
                      style={{ fontSize: 8 }}
                      transform={`translateX(${x}) translateY(${
                        80 - 2
                      }) rotate(-90)`}
                      key={`log-${index}`}
                    >
                      {log && DateTime.fromISO(log.date).toFormat("yyyy-MM-dd")}
                    </Text>
                  );
                })}
              </Svg>
            </View>
          </View>
          <DrawLineGraph
            max={max30 + 2 || 300}
            min={min30 - 2 || 0}
            data={last30Days}
          />
          {/* Weights for each log */}
          <View
            style={{ marginBottom: 7, display: "flex", flexDirection: "row" }}
          >
            <View style={{ width: "100%", marginTop: -50 }}>
              <Svg style={{ height: 80, width: "120%" }}>
                {last30Days.map((log, index) => {
                  const x = 33 + 13.5 * index;
                  return (
                    <Text
                      style={{ fontSize: 8 }}
                      transform={`translateX(${x}) translateY(${
                        80 - 2
                      }) rotate(-90)`}
                      key={`log-${index}`}
                    >
                      {log.value ? parseFloat(log.value).toFixed(1) : ""}
                    </Text>
                  );
                })}
              </Svg>
            </View>
          </View>
          {/* Last 7 days */}
          <View
            style={{ marginBottom: 7, display: "flex", flexDirection: "row" }}
          >
            <View style={{ width: "100%", marginBottom: -10 }}>
              <Svg style={{ height: 80, width: "100%" }}>
                {last7Days.map((log, index) => {
                  const x = 108 + 50 * index;

                  return (
                    <Text
                      style={{ fontSize: 8 }}
                      transform={`translateX(${x}) translateY(${
                        80 - 2
                      }) rotate(-90)`}
                      key={`log-${index}`}
                    >
                      {log && DateTime.fromISO(log.date).toFormat("yyyy-MM-dd")}
                    </Text>
                  );
                })}
              </Svg>
            </View>
          </View>
          <DrawLineGraph
            max={max7 + 2 || 300}
            min={min7 - 2 || 0}
            data={last7Days}
          />
          {/* Weights for each log */}
          <View
            style={{ marginBottom: 7, display: "flex", flexDirection: "row" }}
          >
            <View style={{ width: "100%", marginTop: -50 }}>
              <Svg style={{ height: 80, width: "100%" }}>
                {last7Days.map((log, index) => {
                  const x = 108 + 50 * index;
                  return (
                    <Text
                      style={{ fontSize: 8 }}
                      transform={`translateX(${x}) translateY(${
                        80 - 2
                      }) rotate(-90)`}
                      key={`log-${index}`}
                    >
                      {log.value ? parseFloat(log.value).toFixed(1) : ""}
                    </Text>
                  );
                })}
              </Svg>
            </View>
          </View>
        </View>
        {/* Images section */}
        {/* <View
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
        </View> */}
      </Page>
      {/* Questions section */}
      <Page size="letter" style={{ padding: 100, fontSize: 10 }}>
        {/* Weight Log */}
        <Text style={{ marginBottom: 10 }}>Morning Logs:</Text>

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
