import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { DateTime } from "luxon";

const WeightChart = ({
  data = [],
  type = "linear",
  dot = true,
  primaryLine = "#000",
  secondaryLine = "#000",
  style = {},
  shortenDate = false,
  dietLogs = [],
}) => {
  const minY = Math.min(
    ...data.filter((d) => d.value).map((entry) => entry.value)
  );
  const maxY = Math.max(
    ...data.filter((d) => d.value).map((entry) => entry.value)
  );

  const minX = data[0]?.date;
  const maxX = data[data.length - 1]?.date;

  const filteredDietLogs =
    minX &&
    maxX &&
    dietLogs.filter((l) => {
      const date = DateTime.fromISO(l.effectiveDate);
      return date >= minX && date <= maxX;
    });

  const newData = data.map((entry) => ({
    ...entry,
    date: entry.date.toISODate(),
  }));

  function formatDate(date) {
    const dateObj = DateTime.fromISO(date);

    if (shortenDate) {
      return dateObj.toFormat("MMM dd");
    } else return dateObj.toFormat("MMM dd, yyyy");
  }

  return (
    <ResponsiveContainer width={"100%"} height={300} style={style}>
      <LineChart data={newData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          padding={{ left: 30, right: 30 }}
          tickFormatter={formatDate}
        />
        {filteredDietLogs?.map((log, index) => (
          <ReferenceLine
            key={index}
            x={log.effectiveDate}
            stroke={"#ffc658"}
            label={parseInt(log.calories)}
            strokeDasharray="3 3"
          />
        ))}
        <YAxis domain={[Math.floor(minY - 1), Math.ceil(maxY + 1)]} />
        <Tooltip />
        <Legend />
        <Line
          type={type}
          dataKey="value"
          stroke={primaryLine}
          dot={dot}
          name="Weight (lbs)"
        />
        <Line
          type={type}
          dataKey="moving"
          stroke={secondaryLine}
          dot={false}
          name="Moving Average (lbs)"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default WeightChart;
