type Props = {
  type: string;
  label: string;
  value: number | string;
  subLabel?: string;
  subValue?: number | string;
};

const StatsItem = ({ type, label, value, subLabel, subValue }: Props) => {
  return (
    <div className="block">
      <div className="block__title">{type ?? "N/A"}</div>
      <div className="block__item block__item--today">
        {label}:<span className="value">{value ?? "N/A"}</span>
      </div>
      {subLabel && (
        <div className="block__item block__item--total">
          {subLabel}:<span className="value">{subValue ?? "N/A"}</span>
        </div>
      )}
    </div>
  );
};

export default StatsItem;
