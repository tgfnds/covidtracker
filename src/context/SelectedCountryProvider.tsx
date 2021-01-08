import {
  useState,
  useContext,
  createContext,
  ReactNode,
  SetStateAction,
  Dispatch,
} from "react";
import { SelectedCountry } from "../types";

type Props = {
  children: ReactNode;
};

export type ProviderValue = {
  selectedCountry: SelectedCountry;
  setSelectedCountry: Dispatch<SetStateAction<SelectedCountry>>;
};

const SelectedCountryContext = createContext<ProviderValue | null>(null);

const initialState: SelectedCountry = {
  code: null,
  data: null,
};

const useSelectedCountry = () => useContext(SelectedCountryContext);

const SelectedCountryProvider = ({ children }: Props) => {
  const [selectedCountry, setSelectedCountry] = useState<SelectedCountry>(
    initialState
  );

  return (
    <SelectedCountryContext.Provider
      value={{ selectedCountry, setSelectedCountry }}
    >
      {children}
    </SelectedCountryContext.Provider>
  );
};

export { useSelectedCountry, SelectedCountryProvider };
