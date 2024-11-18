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

const renderTooltipContent = (o) => {
  const { payload, label } = o;

  const cycleOrder = ["totalSleep", "totalBed"];

  const sortedPayload = payload.sort(
    (a, b) => cycleOrder.indexOf(a.name) - cycleOrder.indexOf(b.name)
  );

  // const totalSleep = payload.find((p) => p.name === "totalSleep")?.value;
  // const totalBed = payload.find((p) => p.name === "totalBed")?.value;
  // const latency = totalBed - totalSleep;

  return (
    <div
      className="customized-tooltip-content"
      style={{ backgroundColor: "white", padding: 5, borderRadius: 5 }}
    >
      <p className="total">{label}</p>
      {/* <p className="total">Latency: {`${latency.toFixed(1)}hrs`}</p> */}
      <ul className="list">
        {sortedPayload.map((entry, index) => {
          const { value, name, color } = entry;
          return (
            <li key={`item-${index}`} style={{ color: color }}>
              {`${name}: ${value}`}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const EfficiencyChart = ({ data = [], style = {} }) => {
  return (
    <ResponsiveContainer width="100%" height={300} style={style}>
      <AreaChart
        width={500}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <Tooltip content={renderTooltipContent} />
        <YAxis />
        <ReferenceLine
          y="9"
          stroke="#244780"
          strokeDasharray="3 3"
          label="In Bed Target"
        />
        <ReferenceLine
          y="8"
          stroke="#468cc2"
          strokeDasharray="3 3"
          label="Actual Sleep Target"
        />
        <Area
          type="monotone"
          dataKey="totalSleep"
          stackId="1"
          stroke="#244780"
          fill="#244780"
        />
        <Area
          type="monotone"
          dataKey="bedSleepDiff"
          stackId="1"
          stroke="#468cc2"
          fill="#468cc2"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default EfficiencyChart;
