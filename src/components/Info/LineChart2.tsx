import * as d3 from "d3";
import { ScaleLinear } from "d3";
import { Ref, useCallback, useEffect, useRef, useState } from "react";
import { ChartData } from "../../types";

type Props = {
  data: ChartData[];
  width: number;
  height: number;
  margin?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
};

const LineChart2 = ({ width, height, data, margin }: Props) => {
  const ref: Ref<SVGSVGElement> = useRef<SVGSVGElement>(null);
  // const [xScale, setXScale] = useState<ScaleLinear<number, number>>();
  // const [yScale, setYScale] = useState<ScaleLinear<number, number>>();
  const [xTicks, setXTicks] = useState<(JSX.Element | null)[]>();
  const [yTicks, setYTicks] = useState<(JSX.Element | null)[]>();

  const xFormat = d3.format(".2");

  const setSVGSize = useCallback(() => {
    d3.select(ref.current)
      .attr("width", width)
      .attr("height", height)
      .style("border", "1px solid black");
  }, [width, height]);

  const draw = useCallback(() => {
    console.log(width, height, data, margin, xFormat, setXTicks, setYTicks);
    //   // const svg = d3.select(ref.current);
    //   // let selection = svg.selectAll("line").data(data);
    const xScale = d3
      .scaleLinear()
      .domain([0, data.length])
      .range([margin?.left ?? 0, width - (margin?.right ?? 0)]);

    const yScale = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.value) as number[])
      .range([height - (margin?.bottom ?? 0), margin?.top ?? 0]);

    const line = d3
      .line<ChartData>()
      .x((d) => xScale(Number(d.date.split("/")[1])))
      .y((d) => yScale(d.value));

    setXTicks(
      xScale.ticks(6).map((d) =>
        xScale(d) > (margin?.left ?? 0) && xScale(d) < width ? (
          <g
            transform={`translate(${xScale(d)},${
              height + (margin?.left ?? 0)
            })`}
          >
            <text>{xFormat(d)}</text>
            <line x1="0" x2="0" y1="0" y2="5" transform="translate(0, -20)" />
          </g>
        ) : null
      )
    );

    setYTicks(
      xScale.ticks(5).map((d) =>
        yScale(d) > 10 && yScale(d) < height ? (
          <g transform={`translate(${margin?.bottom ?? 0},${yScale(d)})`}>
            <text x="-12" y="5">
              {xFormat(d)}
            </text>
            <line x1="0" x2="5" y1="0" y2="0" transform="translate(-5, 0)" />
          </g>
        ) : null
      )
    );
  }, [data, height, margin, width, xFormat]);

  useEffect(() => {
    setSVGSize();
  }, [setSVGSize]);

  useEffect(() => {
    draw();
  }, [draw, data]);

  return (
    <div className="chart">
      <svg ref={ref}>
        <line
          name="xAxis"
          className="axis"
          x1={margin?.left ?? 0}
          y1={height}
          x2={width}
          y2={height}
        />
        <line
          name="yAxis"
          className="axis"
          x1={margin?.left ?? 0}
          y1={margin?.bottom ?? 0}
          x2={margin?.left ?? 0}
          y2={height}
        />
        <g className="axis-label">{xTicks}</g>
        <g className="axis-label">{yTicks}</g>
      </svg>
    </div>
  );
};

export default LineChart2;

//     const x = (data: Array<ChartData>) => {
//   const dates = data.map((d) => d.date);
//   d3.scaleLinear()
//     .domain([Number(dates[0]), Number(dates[dates.length - 1])])
//     .range([margin?.left ?? 0, width - margin?.right ?? 0]);
// };

// const y = (data: Array<ChartData>) => {
//   d3.scaleLinear()
//     .domain([
//       0,
//       Number(max(data, ({ value }) => (value ? Number(value) : 0))),
//     ])
//     .nice()
//     .range([height - margin.bottom, margin.top]);
// };

// selection
//   .transition()
//   .duration(300)
//   .attr("height", (d) => yScale(d.value))
//   .attr("y", (d) => height - yScale(d.value));

// selection
//   .enter()
//   .append("rect")
//   .attr("x", (d, i) => i * 45)
//   .attr("y", (d) => height)
//   .attr("width", 40)
//   .attr("height", 0)
//   .attr("fill", "orange")
//   .transition()
//   .duration(300)
//   .attr("height", (d) => yScale(d.value))
//   .attr("y", (d) => height - yScale(d.value));

// svg
//   .append("path")
//   .attr("class", "chart-line")
//   .datum(data)
//   .attr("fill", "none")
//   .attr("stroke", "steelblue")
//   .attr("stroke-linejoin", "round")
//   .attr("stroke-linecap", "round")
//   .attr("stroke-width", 1.5)
//   .attr("d", line);

// svg
//   .append("line")
//   .attr("x1", margin?.left ?? 0)
//   .attr("x2", width)
//   .attr("y1", height)
//   .attr("y2", height);
