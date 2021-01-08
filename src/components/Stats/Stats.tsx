import { useSelectedCountry } from "../../context/SelectedCountryProvider";
import { formatNumber } from "../../utils/numbers";
import "./Stats.scss";
import StatsItem from "./StatsItem";

const Stats = () => {
  const {
    selectedCountry,
  } = useSelectedCountry() as import("../../context/SelectedCountryProvider").ProviderValue;

  const { data } = selectedCountry;

  return selectedCountry.code !== null ? (
    <div className="stats">
      {/* <h2 className="stats__title">Statistics</h2> */}
      <div className="country">
        <div className="country__name">
          <img className="flag" src={data?.countryInfo.flag} alt="flag" />
          <span>{data?.country}</span>
        </div>
        <div className="country__population">
          Population: {data?.population ? formatNumber(data?.population) : 0}
        </div>
      </div>
      <StatsItem
        type="Cases"
        label="Today"
        value={data?.todayCases ? formatNumber(data?.todayCases) : 0}
        subLabel="Total"
        subValue={data?.cases ? formatNumber(data?.cases) : 0}
      />
      <StatsItem
        type="Deaths"
        label="Today"
        value={data?.todayDeaths ? formatNumber(data?.todayDeaths) : 0}
        subLabel="Total"
        subValue={data?.deaths ? formatNumber(data?.deaths) : 0}
      />
      <StatsItem
        type="Recovered"
        label="Today"
        value={data?.todayRecovered ? formatNumber(data?.todayRecovered) : 0}
        subLabel="Total"
        subValue={data?.recovered ? formatNumber(data?.recovered) : 0}
      />
      <StatsItem
        type="Active"
        label="Total"
        value={data?.active ? formatNumber(data?.active) : 0}
      />
    </div>
  ) : (
    <div className="stats">
      <h1>Click a flag</h1>
      <h1>←</h1>
    </div>
  );
};

export default Stats;
