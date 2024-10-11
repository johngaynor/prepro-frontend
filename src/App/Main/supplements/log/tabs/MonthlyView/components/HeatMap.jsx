import { DateTime } from "luxon";
import React from "react";

const HeatMap = ({ supplements, logs, activeMonth, activeYear }) => {
  const daysInMonth = DateTime.local(activeYear, activeMonth).daysInMonth;
  const days = Array.from({ length: daysInMonth }, (_, i) => {
    const fullDate = DateTime.local(activeYear, activeMonth, i + 1).toFormat(
      "yyyy-MM-dd"
    );
    return {
      day: i + 1,
      fullDate,
      items: logs?.filter((l) => l.date === fullDate),
    };
  });

  const today = DateTime.now().toFormat("yyyy-MM-dd");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        marginTop: 25,
      }}
    >
      {/* date headers */}
      <div style={{ display: "flex", gap: 4 }}>
        <div style={{ width: 100, marginRight: 10 }}></div>
        {days?.map((day, dayIndex) => (
          <div
            key={"supp-day-header-" + dayIndex}
            style={{
              width: 30,
              height: 30,
              display: "flex",
              justiyfContent: "center",
              alignItems: "center",
              fontWeight: day.fullDate === today ? "bold" : "normal",
              fontSize: day.fullDate === today ? 16 : 14,
            }}
          >
            <p style={{ margin: "0 auto" }}>{day.day}</p>
          </div>
        ))}
      </div>
      {/* heatmap */}
      {supplements?.map((item) => (
        <div
          key={"supp-item-map-" + item.id}
          style={{ display: "flex", gap: 4 }}
        >
          <div style={{ width: 100, marginRight: 10 }}>
            <p
              style={{
                height: 30,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                fontWeight: "bold",
              }}
            >
              {item.name}
            </p>
          </div>

          {days.map((day, dayIndex) => {
            const match = day.items?.find((d) => d.supplementId === item.id);
            return (
              <div
                key={"supp-item-day-" + dayIndex}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 4,
                  backgroundColor:
                    match && match.completed
                      ? "#7bc96f"
                      : match && match.completed === 0
                      ? "#f44336"
                      : "#ebedf0",
                  border: day.fullDate === today ? "2px solid black" : "none",
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default HeatMap;
