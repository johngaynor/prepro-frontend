import { DateTime } from "luxon";
import RenderPdf from "./RenderPdf";

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

const CheckInDoc = ({
  selectedDay,
  dailyLogs = [],
  lastCheckIn,
  supplementLogs,
  supplements,
  sleepLogs,
}) => {
  const last7Weight = selectedDay
    ? Array.from({ length: 7 })
        .map((_, index) => {
          const currentDay = DateTime.fromISO(selectedDay.date);
          const day = currentDay
            .minus({ days: index })
            .startOf("day")
            .toISODate();
          const log = dailyLogs.find((l) => l.date === day);
          return { date: day, value: log?.weight || null };
        })
        .reverse()
    : [];

  const last30Weight = selectedDay
    ? Array.from({ length: 30 })
        .map((_, index) => {
          const currentDay = DateTime.fromISO(selectedDay.date);
          const day = currentDay
            .minus({ days: index })
            .startOf("day")
            .toISODate();
          const log = dailyLogs.find((l) => l.date === day);
          return { date: day, value: log?.weight || null };
        })
        .reverse()
    : [];

  const lastWeight = dailyLogs.length
    ? dailyLogs.find((l) => l.date === lastCheckIn?.date)?.weight
    : null;
  const todayWeight = [...last7Weight].reverse()[0]?.value;

  const last7Supplements =
    supplementLogs &&
    supplements &&
    Array.from({ length: 7 })
      .map((_, index) => {
        const currentDay = DateTime.fromISO(selectedDay?.date);
        const day = currentDay
          .minus({ days: index + 1 })
          .startOf("day")
          .toISODate();
        const matches = supplementLogs.filter((l) => l.date === day);

        return { date: day, logs: matches };
      })
      .reverse();

  const last7Sleep =
    selectedDay && sleepLogs
      ? Array.from({ length: 7 })
          .map((_, index) => {
            const currentDay = DateTime.fromISO(selectedDay.date);
            const day = currentDay
              .minus({ days: index })
              .startOf("day")
              .toISODate();
            const log = sleepLogs.find((l) => l.date === day);
            return {
              date: day,
              totalSleep: parseFloat(log?.totalSleep) || null,
              recoveryIndex: log?.recoveryIndex || null,
            };
          })
          .reverse()
      : [];

  console.log(last7Sleep);

  return (
    <RenderPdf
      selectedDay={selectedDay}
      lastWeight={lastWeight}
      todayWeight={todayWeight}
      last7Weight={last7Weight}
      last30Weight={last30Weight}
      last7Supplements={last7Supplements}
      supplements={supplements}
      supplementLogs={supplementLogs}
    />
  );
};

export default CheckInDoc;
