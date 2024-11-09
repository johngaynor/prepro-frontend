import { DateTime } from "luxon";

export function generateData(dietLogs, weightLogs) {
  const startDate = dietLogs.reduce((oldest, current) => {
    return current.effectiveDate < oldest.effectiveDate ? current : oldest;
  })?.effectiveDate;

  const endDate = DateTime.now();

  const macroData = [];

  let currentDate = DateTime.fromISO(startDate);
  let latestEffectiveDate = null;

  while (currentDate <= endDate) {
    const dietLog = dietLogs.find(
      (l) => l.effectiveDate === currentDate.toISODate()
    );
    const weightLog = weightLogs.find(
      (l) => l.date === currentDate.toISODate()
    );

    if (dietLog) {
      latestEffectiveDate = dietLog;
    }

    macroData.push({
      date: currentDate.toISODate(),
      protein: parseInt(latestEffectiveDate?.protein) * 4 || 0,
      carbs: parseInt(latestEffectiveDate?.carbs) * 4 || 0,
      fat: parseInt(latestEffectiveDate?.fat) * 9 || 0,
      cardio: latestEffectiveDate.cardio,
      cardioMinutes: parseInt(latestEffectiveDate?.cardioMinutes) || 0,
      weight: parseFloat(weightLog?.weight) || null,
    });

    currentDate = currentDate.plus({ days: 1 });
  }

  return macroData;
}
