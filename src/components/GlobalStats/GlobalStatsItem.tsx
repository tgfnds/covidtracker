import { formatNumber } from "../../utils/numbers";

type Props = {
  type: string;
  today?: number;
  total?: number;
};

const GlobalStatsItem = ({ type, today, total }: Props) => {
  return (
    <div className="block">
      <div className="block__title">{type}</div>
      <div className="block__item">
        <span className="value">{total ? formatNumber(total) : "N/A"}</span>
      </div>
      <div className="block__item block__item--total">
        <span className="value">
          Today: {today ? formatNumber(today) : "N/A"}
        </span>
        <span className="percentage">
          {today && total ? `${((today / total) * 100).toPrecision(2)}%` : ""}
        </span>
      </div>
    </div>
  );
};

export default GlobalStatsItem;
