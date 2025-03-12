import React from "react";

const Circle = ({
  active = false,
  completed = false,
  index,
  setActiveIndex,
}) => {
  return (
    <div
      style={{
        width: active ? 25 : 15,
        height: active ? 25 : 15,
        margin: 2,
        backgroundColor: completed ? "#C2C2C2" : "white",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontWeight: "bold",
        border: "3px solid #C2C2C2",
        cursor: "pointer",
      }}
      onClick={() => setActiveIndex(index)}
    ></div>
  );
};

const Pagination = ({ data = [], activeIndex = 0, setActiveIndex }) => {
  return (
    <div
      style={{
        backgroundColor: "white",
        padding: 5,
        border: "1px solid grey",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        userSelect: "none",
      }}
    >
      {data.map((d, i) => (
        <Circle
          active={i === activeIndex}
          key={i}
          completed={i % 2 === 0}
          setActiveIndex={setActiveIndex}
          index={i}
        />
      ))}
    </div>
  );
};

export default Pagination;
