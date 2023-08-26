import "./App.css";
import { ActivitiesList } from "./views/pages/activities_list/activities_list";

const staticValues = {
  operators: [],
  recurrence: [],
  procedures: [],
};

function App() {
  return (
    <div className="app">
      <div className="aside"></div>
        <div className="table_section">
          <ActivitiesList></ActivitiesList>
        </div>
    </div>
  );
}

export default App;
