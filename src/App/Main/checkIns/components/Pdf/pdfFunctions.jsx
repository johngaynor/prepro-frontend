import {
  Text,
  View,
  Rect,
  Circle,
  Path,
  G,
  Line,
  Svg,
} from "@react-pdf/renderer";
import { DateTime } from "luxon";

const font = {
  regular: "Times-Roman",
  bold: "Times-Bold",
  italic: "Times-Italic",
};

/**
 * Draws a triangle svg element facing upward
 * @param {DrawShapeProps} param0
 * @returns
 */
export function DrawTriangle({
  filled,
  x = "150",
  y = "150",
  size = "20",
  color = "#000000",
}) {
  const cleanedHeight = parseInt(size);

  const lengthOfSide = 2 * (cleanedHeight ** 2 / 3) ** (1 / 2);
  const horizontalDisplacement = lengthOfSide / 2;
  const verticalDisplacement = cleanedHeight / 2;

  const centerPoint = { x: parseFloat(x), y: parseFloat(y) };

  const topPoint = {
    x: centerPoint.x,
    y: centerPoint.y - verticalDisplacement,
  };
  const leftPoint = {
    x: centerPoint.x - horizontalDisplacement,
    y: centerPoint.y + verticalDisplacement,
  };
  const rightPoint = {
    x: centerPoint.x + horizontalDisplacement,
    y: centerPoint.y + verticalDisplacement,
  };

  return (
    <Path
      d={`M ${topPoint.x} ${topPoint.y} L ${leftPoint.x} ${leftPoint.y} L ${rightPoint.x} ${rightPoint.y} Z`}
      stroke={color}
      strokeWidth={1}
      fill={filled ? color : null}
    />
  );
}
/**
 * Draws a circle svg element
 * @param {DrawShapeProps} param0
 * @returns
 */
export function DrawCircle({
  filled,
  x = "150",
  y = " 150",
  size = "20",
  color = "#000000",
}) {
  return (
    <Circle
      cx={x}
      cy={y}
      r={parseInt(size) / 2}
      stroke={color}
      fill={filled ? color : null}
    />
  );
}

/**
 * Draws a square svg element
 * @param {DrawShapeProps} param0
 * @returns
 */
export function DrawSquare({
  filled,
  x = "150",
  y = " 150",
  size = "20",
  color = "#000000",
}) {
  return (
    <Rect
      x={parseFloat(x) - parseInt(size) / 2}
      y={parseFloat(y) - parseInt(size) / 2}
      width={size}
      height={size}
      stroke={color}
      fill={filled ? color : null}
    />
  );
}

export function LineGraphScaleLine({
  x = 0,
  y = 0,
  width = 0,
  dashed = "",
  color = "#000000",
  value = "",
  columnSpacing,
  showLineNames = true,
  boldLine = false,
  indentLineNames = 0,
}) {
  return (
    <G>
      <Line
        x1={x + columnSpacing + (indentLineNames || 2.5)}
        x2={x + width}
        y1={y}
        y2={y}
        stroke={color}
        strokeDasharray={dashed}
        strokeWidth={boldLine ? 1 : 0.25}
      />
      <Text
        style={{ fontSize: 7, fontFamily: font.regular }}
        x={x + indentLineNames * 2}
        y={y + 2}
      >
        {showLineNames ? value : ""}
      </Text>
    </G>
  );
}

export function DrawLineGraph({
  max = 100,
  min = 0,
  step = 1,
  labels,
  data = [],
  width = 450,
  height = 100,
  additionalData = [],
  additionalSvg,
  color = "#000000",
  shape = "circle",
  style = {},
  noLine = false,
  hideLineLabels = false,
  hideMinMaxLines = false,
}) {
  const graphStep = step === 0 || step ? step : 1;

  const totalLines = Math.abs(max - min) + 1;
  const needHorizontalLabel = labels && labels.x ? 20 : 0;
  const needVerticalLabel = labels && labels.y ? 20 : 0;
  const totalColumnsNeeded = data.length + 2;
  const columnSpacing = (1 / totalColumnsNeeded) * width;

  function calculateYPosition(value) {
    return height * (1 - (value - min) / totalLines);
  }

  function reduceDatapoints(dataset) {
    return dataset.reduce((acc, datapoint, datapointI) => {
      const retArr = [...acc];
      const currentPoint = {
        value: datapoint.value,
        x: columnSpacing * (datapointI + 2.5),
        y:
          datapoint.value || parseFloat(datapoint.value) === 0
            ? calculateYPosition(datapoint.value)
            : null,
        // y: datapoint.value ? (1 - datapoint.value / (max + 1)) * height : null,
      };
      const lastPoint =
        retArr
          .filter((dp) => dp.value || parseFloat(dp.value) === 0)
          .slice(-1)[0] || null;
      retArr.push({ ...currentPoint, lastPoint: lastPoint });

      return retArr;
    }, []);
  }

  const datapoints = reduceDatapoints(data);
  /**
   * @type {additionalDataset[]}
   */
  const additionalDatapoints = additionalData.length
    ? additionalData.reduce((acc, dataset) => {
        const retArr = [...acc];
        if (dataset.data)
          retArr.push({
            ...dataset,
            datapoints: reduceDatapoints(dataset.data),
          });
        return retArr;
      }, [])
    : [];

  function drawShape(shape = "", shapeOptions) {
    const fillShape = !shape.endsWith("outline");
    if (shape.startsWith("square"))
      return (
        <DrawSquare
          x={shapeOptions.x}
          y={shapeOptions.y}
          size={4}
          color={shapeOptions.color}
          fill={fillShape}
        />
      );
    if (shape.startsWith("triangle"))
      return (
        <DrawTriangle
          x={shapeOptions.x}
          y={shapeOptions.y}
          size={4}
          color={shapeOptions.color}
          fill={fillShape}
        />
      );
    return (
      <DrawCircle
        x={shapeOptions.x}
        y={shapeOptions.y}
        size={4}
        color={shapeOptions.color}
        fill={fillShape}
      />
    );
  }

  // console.log(min, width, columnSpacing); // min is coming over as NaN for some reason

  return (
    <View style={{ width: width + needVerticalLabel, ...style }}>
      <Svg
        style={{
          height: height + needHorizontalLabel + 5,
          width: width + needVerticalLabel,
        }}
      >
        {/* LOWER LINE */}
        {!hideMinMaxLines && (
          <LineGraphScaleLine
            value={Number(Number(min).toPrecision(5)).toFixed(1)}
            x={0}
            y={calculateYPosition(min)}
            width={width}
            dashed={"4"}
            widthSpacing={parseInt(Number(width || 0) / 100)}
            columnSpacing={columnSpacing}
            showLineNames
            boldLine
            indentLineNames={0}
            color={"#000000"}
          />
        )}
        {Array.from(
          { length: Math.floor(Math.abs(Math.ceil(max) - min)) - 1 },
          (n, nI) => {
            const lineValue = nI + 1 + Math.floor(min);
            return nI % graphStep === 0 ? (
              <LineGraphScaleLine
                key={`line-graph-scale-line-${nI}`}
                value={lineValue}
                x={0}
                y={calculateYPosition(lineValue)}
                width={width}
                dashed={lineValue % 5 === 0 ? "" : "2"}
                widthSpacing={parseInt(Number(width || 0) / 100)}
                columnSpacing={columnSpacing}
                showLineNames={hideLineLabels ? false : lineValue % 5 === 0}
                indentLineNames={lineValue % 5 === 0 ? 5 : 10}
                color={"#858484"}
              />
            ) : null;
          }
        )}
        {/* UPPER LINE */}
        {hideMinMaxLines || max === min ? null : (
          <LineGraphScaleLine
            value={Number(Number(max).toPrecision(5)).toFixed(1)}
            x={0}
            y={calculateYPosition(max)}
            width={width}
            dashed={"4"}
            widthSpacing={parseInt(Number(width || 0) / 100)}
            columnSpacing={columnSpacing}
            showLineNames
            boldLine
            indentLineNames={0}
            color={"#000000"}
          />
        )}

        {typeof additionalSvg === "function"
          ? additionalSvg({ calculateYPosition })
          : null}
        {datapoints.map((datapoint, datapointI) => {
          if (!datapoint.y) return null;

          return (
            <G key={`main-dataset-datapoint-${datapointI}`}>
              {datapoint.lastPoint && !noLine ? (
                <Line
                  x1={datapoint.lastPoint.x}
                  x2={datapoint.x}
                  y1={datapoint.lastPoint.y}
                  y2={datapoint.y}
                  stroke={color}
                  strokeWidth={0.5}
                />
              ) : null}
              {drawShape(shape, { ...datapoint, color: color })}
            </G>
          );
        })}
        {additionalDatapoints.map((dataset, datasetI) => {
          return dataset.datapoints.map((datapoint, datapointI) => {
            if (!datapoint.y) return null;

            return (
              <G key={`add-dataset-${datasetI}-datapoint-${datapointI}`}>
                {datapoint.lastPoint && !dataset.noLine ? (
                  <Line
                    x1={datapoint.lastPoint.x}
                    x2={datapoint.x}
                    y1={datapoint.lastPoint.y}
                    y2={datapoint.y}
                    stroke={dataset.color || color}
                    strokeWidth={0.5}
                  />
                ) : null}
                {drawShape(dataset.shape || shape, {
                  ...datapoint,
                  color: dataset.color || color,
                })}
              </G>
            );
          });
        })}
        {needVerticalLabel ? (
          <Text
            style={{ fontSize: 7 }}
            x={0}
            y={0}
            transform={`translateY(${
              height / 2
            }) translateX(20) rotate(-90 deg)`}
          >
            {labels.y}
          </Text>
        ) : null}
        {needHorizontalLabel ? (
          <Text style={{ fontSize: 7 }} x={width / 2} y={height + 20}>
            {labels.x}
          </Text>
        ) : null}
      </Svg>
    </View>
  );
}

export function SupplementHeatmap({ last7Supplements, supplements }) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* date headers */}
      <View style={{ display: "flex", flexDirection: "row", gap: 4 }}>
        <View style={{ width: 100, marginRight: 20 }} />
        {last7Supplements?.map((log, index) => (
          <View
            key={"supp-day-header-" + index}
            style={{
              width: 25,
              height: 25,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>{DateTime.fromISO(log.date).toFormat("M/d")}</Text>
          </View>
        ))}
      </View>
      {/* heatmap */}
      {supplements?.map((item, i) => {
        return (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 4,
              marginTop: 4,
            }}
            key={"supp-item-row-" + i}
          >
            <View
              style={{
                width: 100,
                display: "flex",
                justifyContent: "center",
                marginRight: 20,
              }}
            >
              <Text
                style={{
                  textAlign: "right",
                  width: "100%",
                }}
              >
                {item.name}
              </Text>
            </View>

            {last7Supplements?.map((log, index) => {
              const match = log.logs?.find((l) => l.supplementId === item.id);

              return (
                <View
                  key={"supp-item-day-" + index}
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: 4,
                    backgroundColor:
                      match && match.completed
                        ? "#7bc96f"
                        : match && match.completed === 0
                        ? "#ff6347"
                        : "#ebedf0",
                    border: "2px solid grey",
                  }}
                />
              );
            })}
          </View>
        );
      })}
      {/* Legend */}
      <View
        style={{ display: "flex", flexDirection: "row", gap: 4, marginTop: 10 }}
      >
        <View style={{ width: 100, marginRight: 20 }} />
        {/* Success */}
        <View
          style={{
            width: 15,
            height: 15,
            borderRadius: 4,
            backgroundColor: "#7bc96f",
            border: "2px solid grey",
          }}
        />
        <View style={{ display: "flex", justifyContent: "center" }}>
          <Text>= Success </Text>
        </View>
        {/* Miss */}
        <View
          style={{
            width: 15,
            height: 15,
            borderRadius: 4,
            backgroundColor: "#ff6347",
            border: "2px solid grey",
          }}
        />
        <View style={{ display: "flex", justifyContent: "center" }}>
          <Text>= Missed </Text>
        </View>
        {/* N/a */}
        <View
          style={{
            width: 15,
            height: 15,
            borderRadius: 4,
            backgroundColor: "#ebedf0",
            border: "2px solid grey",
          }}
        />
        <View style={{ display: "flex", justifyContent: "center" }}>
          <Text>= N/a</Text>
        </View>
      </View>
    </View>
  );
}

export function getTime(time) {
  const hours = Math.floor(time);
  const minutes = Math.floor((time - hours) * 60);

  return `${hours}h ${minutes}m`;
}
