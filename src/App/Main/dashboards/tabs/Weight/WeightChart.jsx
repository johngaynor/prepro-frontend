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
} from "recharts";

const WeightChart = ({
  data = [],
  type = "linear",
  dot = true,
  primaryLine = "#000",
  secondaryLine = "#000",
  style = {},
}) => {
  const minValue = Math.min(
    ...data.filter((d) => d.value).map((entry) => entry.value)
  );
  const maxValue = Math.max(
    ...data.filter((d) => d.value).map((entry) => entry.value)
  );

  return (
    <ResponsiveContainer width={"100%"} height={300} style={style}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" padding={{ left: 30, right: 30 }} />
        <YAxis domain={[Math.floor(minValue - 1), Math.ceil(maxValue + 1)]} />
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
