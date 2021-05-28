import axios from "axios";
import { useState, useEffect } from "react";
import { Global } from "../types";

const useGlobal = () => {
  const [global, setGlobal] = useState<Global>({} as Global);

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

  return global;
};

export default useGlobal;
