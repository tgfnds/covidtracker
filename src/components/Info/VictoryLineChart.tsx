import * as V from "victory";
import { ChartData } from "../../types";
import { abbreviateNumber, formatNumber } from "../../utils/numbers";

type Props = {
  data: ChartData[];
  name: string;
};

const VictoryLineChart = ({ data, name }: Props) => {
  return (
    <V.VictoryChart
      theme={V.VictoryTheme.material}
      domainPadding={5}
      style={{ parent: { backgroundColor: "#FFF", borderRadius: 12 } }}
    >
      <V.VictoryLine
        data={data}
        x={(d: ChartData) => d.date}
        y={(d: ChartData) => d.value}
      />
      <V.VictoryScatter
        data={data}
        x={(d: ChartData) => d.date}
        y={(d: ChartData) => d.value}
        labels={({ datum }) => formatNumber(datum.value)}
        labelComponent={<V.VictoryTooltip cornerRadius={0} />}
      />
      <V.VictoryAxis
        fixLabelOverlap
        style={{ grid: { stroke: "none" }, tickLabels: { fontSize: 10 } }}
      />
      <V.VictoryAxis
        dependentAxis
        tickFormat={(tick) => abbreviateNumber(tick)}
        style={{ grid: { stroke: "none" }, tickLabels: { fontSize: 10 } }}
      />
      <V.VictoryLabel x={20} y={30} text={`${name} last 7 days`} />
    </V.VictoryChart>
  );
};

export default VictoryLineChart;
