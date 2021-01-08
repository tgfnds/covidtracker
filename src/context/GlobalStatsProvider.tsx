import {
  useState,
  useContext,
  createContext,
  ReactNode,
  SetStateAction,
  Dispatch,
} from "react";
import { Global } from "../types";

type Props = {
  children: ReactNode;
};

export type ProviderValue = {
  globalStats: Global;
  setGlobalStats: Dispatch<SetStateAction<Global>>;
};

const GlobalStatsContext = createContext<ProviderValue | null>(null);

const initialState = {} as Global;

const useGlobalStats = () => useContext(GlobalStatsContext);

const GlobalStatsProvider = ({ children }: Props) => {
  const [globalStats, setGlobalStats] = useState<Global>(initialState);

  return (
    <GlobalStatsContext.Provider value={{ globalStats, setGlobalStats }}>
      {children}
    </GlobalStatsContext.Provider>
  );
};

export { useGlobalStats, GlobalStatsProvider };
