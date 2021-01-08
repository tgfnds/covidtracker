import * as d3 from "d3";
import { useMemo } from "react";
import { ChartData } from "../../types";
import "./Chart.scss";

type Props = {
  data: ChartData[];
  width: number;
  height: number;
};

const LineChart = ({ width, height, data }: Props) => {
  const xFormat = d3.format(".2");

  const xScale = useMemo(
    () => d3.scaleLinear().domain([0, data.length]).range([0, width]),
    [width, data.length]
  );

  const yScale = useMemo(
    () =>
      d3
        .scaleLinear()
        .domain(d3.extent(data, (d) => d.value) as number[])
        .range([height, 0]),
    [height, data]
  );

  const line = d3
    .line<ChartData>()
    .x((d) => xScale(Number(d.date.split("/")[1])))
    .y((d) => yScale(d.value));

  const xTicks = xScale.ticks(6).map((d) =>
    xScale(d) < width ? (
      <g transform={`translate(${xScale(d)},${height})`}>
        <text>{xFormat(d)}</text>
        <line x1="0" y1="0" x2="0" y2="5" transform="translate(0, -20)" />
      </g>
    ) : null
  );

  const yTicks = xScale.ticks(5).map((d) =>
    yScale(d) > 10 && yScale(d) < height ? (
      <g transform={`translate(${0},${yScale(d)})`}>
        <text x="-12" y="5">
          {xFormat(d)}
        </text>
        <line x1="0" y1="0" x2="5" y2="0" transform="translate(-5, 0)" />
      </g>
    ) : null
  );

  return (
    <div className="wrapper">
      <svg className="chart" width={width} height={height}>
        <rect width={width} height={height} fill="teal" rx={14} />

        <line className="chart_line" d={line(data) ?? ""} />
        <line
          className="chart__axis"
          x1={0}
          y1={height}
          x2={width}
          y2={height}
          stroke="black"
          strokeWidth={1}
        />
        <line
          className="chart__axis"
          x1={0}
          y1={0}
          x2={0}
          y2={height}
          stroke="black"
          strokeWidth={1}
        />
        <g className="chart__axis-label">{xTicks}</g>
        <g className="chart__axis-label">{yTicks}</g>
      </svg>
    </div>
  );
};

export default LineChart;
