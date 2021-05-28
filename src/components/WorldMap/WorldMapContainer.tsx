import { SelectedCountryProvider } from "../../context/SelectedCountryProvider";
import { Country, Global } from "../../types";
import GlobalStats from "../GlobalStats/GlobalStats";
import Stats from "../Stats/Stats";
import WorldMap from "../WorldMap/WorldMap";

type Props = {
  countries: Country[];
  global: Global;
};

const WorldMapContainer = ({ countries, global }: Props) => {
  return (
    <div>
      <div className="content__top">
        <SelectedCountryProvider>
          <WorldMap countries={countries} />
          <Stats />
        </SelectedCountryProvider>
      </div>
      <div className="content__bottom">
        <GlobalStats stats={global} />
      </div>
    </div>
  );
};

export default WorldMapContainer;
