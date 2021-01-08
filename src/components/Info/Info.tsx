import axios from "axios";
import { useEffect, useState } from "react";
import { Global } from "../../types";
import { formatNumber } from "../../utils/numbers";
import "./Info.scss";

const Info = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [globalStats, setGlobalStats] = useState<Global>({} as Global);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("https://disease.sh/v3/covid-19/all");

        setGlobalStats(response.data);
      } catch (e) {
        console.log(e);
      }
    };

    getData();
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="info">
        <p>Loading info...</p>
      </div>
    );
  } else {
    return (
      <div className="info">
        <h2>Today</h2>
        <div className="info__stats">
          <div className="block">
            <span>Cases:</span>
            <span>{formatNumber(globalStats.cases)}</span>
          </div>
          <div className="block">
            <span>Deaths:</span>
            <span className="block__value--red">
              {formatNumber(globalStats.deaths)}
            </span>
          </div>
          <div className="block">
            <span>Recovered:</span>
            <span className="block__value--green">
              {formatNumber(globalStats.recovered)}
            </span>
          </div>
        </div>
      </div>
    );
  }
};

export default Info;
