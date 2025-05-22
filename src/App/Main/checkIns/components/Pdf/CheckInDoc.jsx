import { DateTime } from "luxon";
import RenderPdf from "./RenderPdf";

const CheckInDoc = ({
  selectedDay,
  dailyLogs = [],
  lastCheckIn,
  supplementLogs,
  supplements,
  sleepLogs,
  activeDietLog,
  options = {},
}) => {
  const last30Logs = selectedDay
    ? Array.from({ length: 30 })
        .map((_, index) => {
          const currentDay = DateTime.fromISO(selectedDay.date);
          const day = currentDay
            .minus({ days: index })
            .startOf("day")
            .toISODate();
          const log = dailyLogs.find((l) => l.date === day);
          return {
            date: day,
            weight: log?.weight || null,
            steps: log?.steps || null,
            flagged: index < 7,
          };
        })
        .reverse()
    : [];

  const last30Steps = last30Logs.map((l) => ({ ...l, value: l.steps }));
  const last30Weight = last30Logs.map((l) => {
    const { flagged, weight, date } = l;
    return { flagged, value: weight, date };
  });

  const lastWeight = dailyLogs.length
    ? dailyLogs.find((l) => l.date === lastCheckIn?.date)?.weight
    : null;
  const todayWeight = [...last30Weight].reverse()[0]?.value;

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

  const last30Sleep =
    selectedDay && sleepLogs
      ? Array.from({ length: 30 })
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

  return (
    <RenderPdf
      selectedDay={selectedDay}
      lastWeight={lastWeight}
      todayWeight={todayWeight}
      last30Weight={last30Weight}
      last30Steps={last30Steps}
      last7Supplements={last7Supplements}
      supplements={supplements}
      supplementLogs={supplementLogs}
      last7Sleep={last7Sleep}
      last30Sleep={last30Sleep}
      activeDietLog={activeDietLog}
      options={options}
    />
  );
};

export default CheckInDoc;
