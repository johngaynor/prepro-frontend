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

const CardioChart = ({ data = [], type = "linear", style = {} }) => {
  const minValue = Math.min(
    ...data.filter((d) => d.cardioMinutes).map((entry) => entry.cardioMinutes)
  );
  const maxValue = Math.max(
    ...data.filter((d) => d.cardioMinutes).map((entry) => entry.cardioMinutes)
  );

  return (
    <ResponsiveContainer width={"100%"} height={300} style={style}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" padding={{ left: 30, right: 30 }} />
        <YAxis domain={[Math.floor(minValue - 30), Math.ceil(maxValue + 30)]} />
        <Tooltip />
        <Legend />
        <Line
          type={type}
          dataKey="cardioMinutes"
          stroke={"#086788"}
          dot={false}
          name="Cardio (minutes / week)"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CardioChart;
