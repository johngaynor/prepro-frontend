export function calculateHoursMinutes(number) {
  if (!number) return "--";

  let negative = number < 0;
  const hours = Math.floor(Math.abs(number));
  const minutes = Math.round((Math.abs(number) - hours) * 60);

  return `${negative ? "-" : ""}${hours}h ${minutes}m`;
}
