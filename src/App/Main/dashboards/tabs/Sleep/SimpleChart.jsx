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

const SimpleChart = ({
  data = [],
  type = "linear",
  dot = true,
  primaryLine = "#000",
  secondaryLine = "#000",
  style = {},
}) => {
  return (
    <ResponsiveContainer width={"100%"} height={300} style={style}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" padding={{ left: 30, right: 30 }} />
        <YAxis domain={[0, 100]} />
        <Tooltip />
        <Legend />
        <Line
          type={type}
          dataKey="readinessScore"
          stroke={primaryLine}
          dot={dot}
          name="Readiness Score"
        />
        <Line
          type={type}
          dataKey="recoveryIndex"
          stroke={secondaryLine}
          dot={dot}
          name="Recovery Index"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SimpleChart;
