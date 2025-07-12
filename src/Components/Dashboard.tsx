'use client';

import { benchmarkLogger } from "../lib/benchmarkLogger";
import "../benchmarkDashboard.css"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getComparisonStats } from "../lib/statsCalc";

export default function BenchmarkDashboard() {
  const navigate = useNavigate();
  const [results, setResults] = useState(benchmarkLogger.getResults());
  const summary = benchmarkLogger.getSummaryByLibrary();

  useEffect(() => {
    if (results.length === 0) {
      benchmarkLogger.loadFromLocalStorage();
      setResults(benchmarkLogger.getResults())
    }
  }, []);

  return (
    <div className="dashboardPage">
      <div className="dashboardContainer">
        {Object.keys(summary).length > 0 && (
  <div className="perfSummaryCard">
    <h2 className="perfSummaryHeading">🚀 Performance Summary</h2>
    {getComparisonStats(summary).length === 0 ? (
      <p className="perfSummaryEmpty">Run benchmarks to see comparative performance here.</p>
    ) : (
      <ul className="perfSummaryList">
        {getComparisonStats(summary).map((stat) => (
          <li key={stat.lib}>
            Overwatch TS is <span className="perfHighlight">{stat.timesFaster}x</span> (~{stat.percentFaster}%)
            faster than <span className="perfLib">{stat.lib}</span> on average.
          </li>
        ))}
      </ul>
    )}
  </div>
)}


        {Object.keys(summary).length > 0 && (
          <div className="summaryGrid">
            {Object.entries(summary).map(([library, data]) => (
              <div
                key={library}
                className={`summaryCard ${library === 'Overwatch TS'
                  ? 'summaryCardOverwatch'
                  : library === 'Zustand'
                    ? 'summaryCardZustand'
                    : 'summaryCardRedux'
                  }`}
              >
                <h2 className="summaryCardTitle">{library}</h2>
                <p>Tests Run: <span className="highlight-benchmark">{data.count}</span></p>
                <p>Average Update: <span className="highlight-benchmark">{data.average.toFixed(2)}ms</span></p>
                <p>Fastest Update: <span className="highlight-benchmark">{data.fastest.toFixed(2)}ms</span></p>
                <p>Latest Update: <span className="highlight-benchmark">{data.latest.toFixed(2)}ms</span></p>
              </div>
            ))}
          </div>
        )}

        {results.length === 0 ? (
          <p className="emptyMessage">⚡ Run benchmarks on individual pages to populate data.</p>
        ) : (
          <div className="tableContainer">
            <table className="resultsTable">
              <thead>
                <tr>
                  <th>Library</th>
                  <th>Test</th>
                  <th>Value</th>
                  <th>Unit</th>
                  <th>Memory Δ (MB)</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {results
                  .slice()
                  .reverse()
                  .map((result, idx) => (
                    <tr key={idx} className="tableRow">
                      <td>{result.library}</td>
                      <td>{result.test}</td>
                      <td>{result.value.toFixed(2)}</td>
                      <td>{result.unit}</td>
                      <td>
                        {result.memoryDeltaMB !== undefined ? result.memoryDeltaMB.toFixed(2) : '-'}
                      </td>
                      <td>{new Date(result.timestamp).toLocaleString()}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        {results.length > 0 && (
          <div className="downloadButtons">
            <button
            className="buttonRed"
              onClick={() => {
                benchmarkLogger.clearLocalStorage()
                navigate('/');
              }}
            >
              Clear Local
            </button>
            <button
              onClick={() => benchmarkLogger.downloadCSV()}
              className="buttonBlue"
            >
              Download CSV
            </button>
            <button
              onClick={() => benchmarkLogger.downloadJSON()}
              className="buttonGreen"
            >
              Download JSON
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
