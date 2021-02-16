import { Control } from "leaflet";

export interface Global {
  updated: number;
  cases: number;
  todayCases: number;
  deaths: number;
  todayDeaths: number;
  recovered: number;
  todayRecovered: number;
  active: number;
  critical: number;
  casesPerOneMillion: number;
  deathsPerOneMillion: number;
  tests: number;
  testsPerOneMillion: number;
  population: number;
  oneCasePerPeople: number;
  oneDeathPerPeople: number;
  oneTestPerPeople: number;
  activePerOneMillion: number;
  recoveredPerOneMillion: number;
  criticalPerOneMillion: number;
  affectedCountries: number;
}

export interface CountryInfo {
  _id: number;
  iso2: string;
  iso3: string;
  lat: number;
  long: number;
  flag: string;
}

export interface Country {
  updated: number;
  country: string;
  countryInfo: CountryInfo;
  cases: number;
  todayCases: number;
  deaths: number;
  todayDeaths: number;
  recovered: number;
  todayRecovered: number;
  active: number;
  critical: number;
  casesPerOneMillion: number;
  deathsPerOneMillion: number;
  tests: number;
  testsPerOneMillion: number;
  population: number;
  continent: string;
  oneCasePerPeople: number;
  oneDeathPerPeople: number;
  oneTestPerPeople: number;
  activePerOneMillion: number;
  recoveredPerOneMillion: number;
  criticalPerOneMillion: number;
}

// Historical types
export interface HistoricalGlobal {
  cases: {
    date: string;
    number: number;
  };
  deaths: [string, number];
  recovered: [string, number];
}

// Chart
export interface ChartData {
  date: string;
  value: number;
  label?: string;
  symbol?: "circle" | "square" | "diamond";
  fill?: string;
}

// Selected Country
export interface SelectedCountry {
  code: string | null;
  data: Country | null;
}

export type Mode = "FLAGS" | "RED_ZONES";

export interface ModeToggle extends Control {
  onChange: (mode: Mode) => void;
}
