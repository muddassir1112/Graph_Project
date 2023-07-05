import "./App.css";
import LineGraph from "./component/LineGraph";
import CovidMap from "./component/LeafletMap";

function App() {
  return (
    <div className="App">
      <h1>Dashboard</h1>
      <LineGraph />
      <CovidMap />
    </div>
  );
}

export default App;
