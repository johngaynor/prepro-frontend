import { Document, View, Text, Page, Image, Svg } from "@react-pdf/renderer";
import { DrawLineGraph, SupplementHeatmap, getTime } from "./pdfFunctions";
import { DateTime } from "luxon";

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

function getAvg(values) {
  const filteredValues = values
    .map((v) => v.value)
    .filter((v) => v !== null && v !== undefined);
  return filteredValues.length > 0
    ? filteredValues.reduce((acc, cur) => acc + cur, 0) / filteredValues.length
    : null;
}

const FormQuestionBox = ({ question, answer }) => {
  return (
    <View style={{ margin: "10 0" }}>
      <Text style={{ fontStyle: "italic" }}>{question}:</Text>
      <Text style={{ marginTop: 5 }}>{" - " + (answer || "N/a")}</Text>
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
  status,
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
        backgroundColor: status
          ? text.toString().includes("-")
            ? "#ff6347"
            : "#7bc96f"
          : null,
      }}
    >
      <Text style={{ margin: "0 10" }}>{text || "--"}</Text>
    </View>
  );
};

const WeightLogTable = ({ phase, todayWeight, lastWeight }) => {
  const change = (todayWeight - lastWeight).toFixed(1);
  return (
    <View style={{ marginBottom: 10 }}>
      {/* header */}
      <View style={{ display: "flex", flexDirection: "row" }}>
        <TableCell text="Phase" width="20%" borderLeft borderTop />
        <TableCell text="Today" width="20%" borderTop />
        <TableCell text="Last Checkin" width="20%" borderTop />
        <TableCell text="Change" width="20%" borderTop />
      </View>
      {/* cells */}
      <View style={{ display: "flex", flexDirection: "row" }}>
        <TableCell text={phase || "--"} width="20%" borderLeft borderTop />
        <TableCell text={todayWeight || "--"} width="20%" borderTop />
        <TableCell text={lastWeight || "--"} width="20%" borderTop />
        <TableCell
          text={(change > 0 ? "+" : "") + change || "--"}
          width="20%"
          borderTop
        />
      </View>
    </View>
  );
};

const SleepLogTable = ({ last7, last30, hours = false }) => {
  const avg7 = hours ? getTime(getAvg(last7)) : Math.floor(getAvg(last7));
  const avg30 = hours ? getTime(getAvg(last30)) : Math.floor(getAvg(last30));
  const diff = hours
    ? getTime(getAvg(last7) - getAvg(last30))
    : Math.floor(avg7 - avg30);

  return (
    <View style={{ marginBottom: 10 }}>
      {/* header */}
      <View style={{ display: "flex", flexDirection: "row" }}>
        <TableCell text="Last 7 Days" width="20%" borderLeft borderTop />
        <TableCell text="Last 30 Days" width="20%" borderTop />
        <TableCell text="Change" width="20%" borderTop />
      </View>
      {/* cells */}
      <View style={{ display: "flex", flexDirection: "row" }}>
        <TableCell text={avg7 || "--"} width="20%" borderLeft borderTop />
        <TableCell text={avg30 || "--"} width="20%" borderTop />
        <TableCell text={diff || "--"} width="20%" borderTop status />
      </View>
    </View>
  );
};

const RenderPdf = ({
  selectedDay,
  lastWeight,
  todayWeight,
  last7Weight,
  last30Weight,
  last7Supplements,
  supplements,
  supplementLogs,
  last7Sleep,
  last30Sleep,
}) => {
  const last7SleepHours = last7Sleep.map((log) => ({
    date: log.date,
    value: log.totalSleep,
  }));

  const last7SleepRecoveryIndex = last7Sleep.map((log) => ({
    date: log.date,
    value: log.recoveryIndex,
  }));

  const last30SleepHours = last30Sleep.map((log) => ({
    date: log.date,
    value: log.totalSleep,
  }));

  const last30SleepRecoveryIndex = last30Sleep.map((log) => ({
    date: log.date,
    value: log.recoveryIndex,
  }));

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
        {/* Questions */}
        <View>
          {/* {selectedDay?.questions?.map((q, i) => (
                <FormQuestionBox question={q} key={"form-question-" + i} />
              ))} */}
          <FormQuestionBox
            question="Hormone altering or fat loss supplements used"
            answer={selectedDay?.hormones}
          />
          <FormQuestionBox
            question="Current diet phase (bulk, cut, etc.)"
            answer={selectedDay?.phase}
          />
          <FormQuestionBox
            question="Timeline (how many weeks into diet)"
            answer={selectedDay?.timeline}
          />
          <FormQuestionBox
            question="Cardio (style, duration, number of times per week)"
            answer={selectedDay?.cardio}
          />
          <FormQuestionBox
            question="Training (style and days per week)"
            answer={selectedDay?.training}
          />
          <FormQuestionBox
            question="Cheat/missed meals (PLEASE BE HONEST, this is necessary for making accurate changes)"
            answer={selectedDay?.cheats}
          />
          <FormQuestionBox
            question="Overall comments/thoughts from the week (training, mood, sleep, energy, etc.)"
            answer={selectedDay?.comments}
          />
        </View>
      </Page>
      {/* Weight Log */}
      <Page size="letter" style={{ padding: 100, fontSize: 10 }}>
        <Text
          style={{
            textDecoration: "underline",
            marginBottom: 10,
            fontSize: 12,
          }}
        >
          Weight Log - Summary
        </Text>
        <WeightLogTable
          lastWeight={lastWeight}
          todayWeight={todayWeight}
          phase={selectedDay?.phase}
        />
        {/* Last 7 days */}
        <View>
          <Text
            style={{
              textDecoration: "underline",
              marginBottom: -20,
              fontSize: 12,
            }}
          >
            Last 7 Days
          </Text>
          <View style={{ width: "100%", marginBottom: -5 }}>
            <Svg style={{ height: 80, width: "120%" }}>
              {last7Weight.map((log, index) => {
                const x = 128 + 50 * index;

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
          <DrawLineGraph
            max={getMax(last7Weight) + 2 || 300}
            min={getMin(last7Weight) - 2 || 0}
            data={last7Weight}
          />
          <View style={{ width: "100%", marginTop: -55 }}>
            <Svg style={{ height: 80, width: "120%" }}>
              {last7Weight.map((log, index) => {
                const x = 128 + 50 * index;
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
        {/* Last 30 days */}
        <View>
          <Text
            style={{
              textDecoration: "underline",
              marginBottom: -20,
              marginTop: 30,
              fontSize: 12,
            }}
          >
            Last 30 Days
          </Text>
          <View style={{ width: "100%", marginBottom: -5 }}>
            <Svg style={{ height: 80, width: "120%" }}>
              {last30Weight.map((log, index) => {
                const x = 52 + 13.5 * index;

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
          <DrawLineGraph
            max={getMax(last30Weight) + 2 || 300}
            min={getMin(last30Weight) - 2 || 0}
            data={last30Weight}
          />
          <View style={{ width: "100%", marginTop: -55 }}>
            <Svg style={{ height: 80, width: "120%" }}>
              {last30Weight.map((log, index) => {
                const x = 52 + 13.5 * index;
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
      </Page>
      {/* Sleep report */}
      <Page size="letter" style={{ padding: "75 100", fontSize: 10 }}>
        <Text
          style={{
            textDecoration: "underline",
            marginBottom: 10,
            fontSize: 12,
          }}
        >
          Summary - Total Sleep (hours)
        </Text>
        <SleepLogTable
          last7={last7SleepHours}
          last30={last30SleepHours}
          hours
        />
        {/* Last 30 days - sleep hours */}
        <View>
          <Text
            style={{
              textDecoration: "underline",
              marginBottom: -20,
              fontSize: 12,
            }}
          >
            Last 30 Days - Total Sleep (hours)
          </Text>
          <View style={{ width: "100%", marginBottom: -5 }}>
            <Svg style={{ height: 80, width: "120%" }}>
              {last30SleepHours.map((log, index) => {
                const x = 52 + 13.5 * index;

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
          <DrawLineGraph
            max={getMax(last30SleepHours) + 1 || 300}
            min={getMin(last30SleepHours) - 2 || 0}
            data={last30SleepHours}
          />
          <View style={{ width: "100%", marginTop: -55, marginBottom: 30 }}>
            <Svg style={{ height: 80, width: "120%" }}>
              {last30SleepHours.map((log, index) => {
                const x = 52 + 13.5 * index;
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
        <Text
          style={{
            textDecoration: "underline",
            marginBottom: 10,
            fontSize: 12,
          }}
        >
          Summary - Recovery Score (1-100)
        </Text>
        <SleepLogTable
          last7={last7SleepRecoveryIndex}
          last30={last30SleepRecoveryIndex}
        />
        {/* Last 30 days - recovery index */}
        <View>
          <Text
            style={{
              textDecoration: "underline",
              marginBottom: -20,
              fontSize: 12,
            }}
          >
            Last 30 Days - Recovery Score (1-100)
          </Text>
          <View style={{ width: "100%", marginBottom: 10 }}>
            <Svg style={{ height: 80, width: "120%" }}>
              {last30SleepRecoveryIndex.map((log, index) => {
                const x = 52 + 13.5 * index;

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
          <DrawLineGraph
            max={100}
            min={0}
            data={last30SleepRecoveryIndex}
            step={10}
          />
          <View style={{ width: "100%", marginTop: -55 }}>
            <Svg style={{ height: 80, width: "120%" }}>
              {last30SleepRecoveryIndex.map((log, index) => {
                const x = 52 + 13.5 * index;
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
      </Page>
      {/* Daily log */}
      <Page size="letter" style={{ padding: 100, fontSize: 10 }}>
        <Text
          style={{
            textDecoration: "underline",
            marginBottom: 10,
            fontSize: 12,
          }}
        >
          Daily Log - Last 7 Days
        </Text>
        <SupplementHeatmap
          last7Supplements={last7Supplements}
          supplements={supplements}
        />
        <Text
          style={{
            textDecoration: "underline",
            marginBottom: 10,
            fontSize: 12,
          }}
        >
          Missed Items
        </Text>
        {supplements?.map((item, index) => {
          const missed = supplementLogs?.filter(
            (l) =>
              l.supplementId === item.id &&
              last7Supplements?.find((log) => log.date === l.date) &&
              last7Supplements
                ?.find((log) => log.date === l.date)
                .logs.find((log) => log.completed === 0)
          );
          if (missed?.length && missed.find((m) => m.completed === 0))
            return (
              <View key={"missed-supps-" + index} style={{ marginBottom: 5 }}>
                <Text>{item.name}</Text>
                {missed.map(
                  (m, i) =>
                    m.reason && (
                      <Text key={"missed-supp-" + i}>
                        - {DateTime.fromISO(m.date).toFormat("M/d")}, {m.reason}
                      </Text>
                    )
                )}
              </View>
            );

          return null;
        })}
      </Page>
    </Document>
  );
};

export default RenderPdf;
