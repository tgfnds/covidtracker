import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router";
import useCountries from "../../hooks/useCountries";
import useGlobal from "../../hooks/useGlobal";
import WorldMapContainer from "../WorldMap/WorldMapContainer";
import TableStats from "../TableStats/TableStats";
import MainLayout from "../MainLayout/MainLayout";

const App = () => {
  const countries = useCountries();
  const global = useGlobal();

  return (
    <Router>
      <Switch>
        <Route
          path="/table"
          element={
            <MainLayout>
              <TableStats />
            </MainLayout>
          }
        />
        <Route
          path="/"
          element={
            <MainLayout>
              <WorldMapContainer countries={countries} global={global} />
            </MainLayout>
          }
        />
      </Switch>
    </Router>
  );
};

export default App;
