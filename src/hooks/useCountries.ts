import axios from "axios";
import { useState, useEffect } from "react";
import { Country } from "../types";

const useCountries = () => {
  const [countries, setCountries] = useState<Country[]>([]);

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

  return countries;
};

export default useCountries;
