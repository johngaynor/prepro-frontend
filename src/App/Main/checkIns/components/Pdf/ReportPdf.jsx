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
      last7Weight={last7Weight}
      last30Weight={last30Weight}
      last7Supplements={last7Supplements}
      supplements={supplements}
      supplementLogs={supplementLogs}
      last7Sleep={last7Sleep}
      last30Sleep={last30Sleep}
      activeDietLog={activeDietLog}
    />
  );
};

export default CheckInDoc;
