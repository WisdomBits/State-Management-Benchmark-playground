import OverwatchBenchmark from "./Benchmarks/Overwatch";
import ZustandBenchmark from "./Benchmarks/Zustand";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./app.css"
import Home from "./Components/Home";
import ReduxBenchmark from "./Benchmarks/ReduxToolkit/Redux";
import BenchmarkDashboard from "./Components/Dashboard";
import Methadolagy from "./Components/Methadolagy";
// import { IoMdArrowBack } from "react-icons/io";

function App() {

  return (<>
    <Router>
      <div className="appContainer">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/benchmark-stats" element={<BenchmarkDashboard />} />
          <Route path="/overwatch-benchmark" element={<OverwatchBenchmark />} />
          <Route path="/zustand-benchmark" element={<ZustandBenchmark />} />
          <Route path="/redux-benchmark" element={<ReduxBenchmark />} />
          <Route path="/benchmark-methodology" element={<Methadolagy />} />
        </Routes>
      </div>
    </Router>
  </>)

}

export default App
