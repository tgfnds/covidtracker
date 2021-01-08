import "./GlobalStats.scss";
import GlobalStatsItem from "./GlobalStatsItem";
import { Global } from "../../types";

type Props = {
  stats?: Global;
};

const GlobalStats = ({ stats }: Props) => {
  return (
    <div className="global-stats">
      <h3 className="global-stats__title">Worldwide</h3>
      <div className="global-stats__items">
        <GlobalStatsItem
          type="Cases"
          today={stats?.todayCases}
          total={stats?.cases}
        />
        <GlobalStatsItem
          type="Deaths"
          today={stats?.todayDeaths}
          total={stats?.deaths}
        />
        <GlobalStatsItem
          type="Recovered"
          today={stats?.todayRecovered}
          total={stats?.recovered}
        />
      </div>
    </div>
  );
};

export default GlobalStats;
