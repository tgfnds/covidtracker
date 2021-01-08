import { useEffect, useState } from "react";
import axios from "axios";
import WorldMap from "../WorldMap/WorldMap";
import Stats from "../Stats/Stats";
import { SelectedCountryProvider } from "../../context/SelectedCountryProvider";
import { Country, Global } from "../../types";
import "./App.scss";
import GlobalStats from "../GlobalStats/GlobalStats";

const App = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [global, setGlobal] = useState<Global>({} as Global);

  // Countries effect
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          "https://disease.sh/v3/covid-19/countries"
        );

        setCountries(response.data);
      } catch (e) {
        console.log(e);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("https://disease.sh/v3/covid-19/all");

        setGlobal(response.data);
      } catch (e) {
        console.log(e);
      }
    };

    getData();
  }, []);

  return (
    <div className="app">
      <div className="content">
        <div className="header">Covid-19 Stats</div>
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
      <footer className="footer">
        <span className="footer__item">
          <span>&copy; Tiago Fernandes - 2020</span>
          <a className="footer__link" href="https://tgfnds.dev">
            tgfnds.dev
          </a>
        </span>
      </footer>
    </div>
  );
};

export default App;
