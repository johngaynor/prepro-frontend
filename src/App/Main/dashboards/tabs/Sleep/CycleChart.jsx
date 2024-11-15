import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const toPercent = (decimal) => `${(decimal * 100).toFixed(1)}%`;

const getPercent = (value, total) => {
  const ratio = total > 0 ? value / total : 0;

  return toPercent(ratio, 1);
};

const renderTooltipContent = (o) => {
  const { payload, label } = o;
  const totalInBed = payload.reduce((result, entry) => result + entry.value, 0);
  const totalAsleep = payload
    .filter((entry) => entry.name !== "awakeQty")
    .reduce((result, entry) => result + entry.value, 0);

  const cycleOrder = ["awakeQty", "remQty", "lightQty", "deepQty"];

  const sortedPayload = payload.sort(
    (a, b) => cycleOrder.indexOf(a.name) - cycleOrder.indexOf(b.name)
  );

  return (
    <div
      className="customized-tooltip-content"
      style={{ backgroundColor: "white", padding: 5, borderRadius: 5 }}
    >
      <p className="total">{`${totalAsleep.toFixed(1)}hrs (${totalInBed.toFixed(
        1
      )} in bed)`}</p>
      <ul className="list">
        {sortedPayload.map((entry, index) => {
          const { value, name, color } = entry;
          return (
            <li key={`item-${index}`} style={{ color: color }}>
              {`${name}: ${value} (${getPercent(value, totalInBed)})`}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const CycleChart = ({ data = [], style = {} }) => {
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
        <ReferenceLine
          y=".20"
          stroke="#244780"
          strokeDasharray="3 3"
          label="Deep Target"
        />
        <ReferenceLine
          y=".70"
          stroke="#468cc2"
          strokeDasharray="3 3"
          label="Light Target"
        />
        <ReferenceLine
          y=".90"
          stroke="#70cbff"
          strokeDasharray="3 3"
          label="REM Target"
        />
        <Area
          type="monotone"
          dataKey="deepQty"
          stackId="1"
          stroke="#244780"
          fill="#244780"
        />
        <Area
          type="monotone"
          dataKey="lightQty"
          stackId="1"
          stroke="#468cc2"
          fill="#468cc2"
        />
        <Area
          type="monotone"
          dataKey="remQty"
          stackId="1"
          stroke="#70cbff"
          fill="#70cbff"
        />
        <Area
          type="monotone"
          dataKey="awakeQty"
          stackId="1"
          stroke="#f2f5f5"
          fill="#f2f5f5"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default CycleChart;
