import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const toPercent = (decimal, fixed = 0) => `${(decimal * 100).toFixed(fixed)}%`;

const getPercent = (value, total) => {
  const ratio = total > 0 ? value / total : 0;

  return toPercent(ratio, 1);
};

const renderTooltipContent = (o) => {
  const { payload, label } = o;
  const total = payload.reduce((result, entry) => result + entry.value, 0);

  const calories = payload.reduce((result, entry) => result + entry.value, 0);

  const macroOrder = ["fat", "carbs", "protein"];

  const sortedPayload = payload.sort(
    (a, b) => macroOrder.indexOf(a.name) - macroOrder.indexOf(b.name)
  );

  return (
    <div
      className="customized-tooltip-content"
      style={{ backgroundColor: "white", padding: 5, borderRadius: 5 }}
    >
      <p className="total">{`${label} (${calories} kcal)`}</p>
      <ul className="list">
        {sortedPayload.map((entry, index) => {
          const { value, name, color } = entry;
          const originalValue =
            name === "protein"
              ? value / 4
              : name === "carbs"
              ? value / 4
              : value / 9;
          return (
            <li key={`item-${index}`} style={{ color: color }}>
              {`${name}: ${originalValue} (${getPercent(value, total)})`}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const MacroChart = ({ data = [], style = {} }) => {
  return (
    <ResponsiveContainer width="100%" height={250} style={style}>
      <AreaChart
        width={500}
        data={data}
        stackOffset="expand"
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis tickFormatter={toPercent} />
        <Tooltip content={renderTooltipContent} />
        <Area
          type="monotone"
          dataKey="protein"
          stackId="1"
          stroke="#8884d8"
          fill="#8884d8"
        />
        <Area
          type="monotone"
          dataKey="carbs"
          stackId="1"
          stroke="#82ca9d"
          fill="#82ca9d"
        />
        <Area
          type="monotone"
          dataKey="fat"
          stackId="1"
          stroke="#ffc658"
          fill="#ffc658"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default MacroChart;
