'use client';

import { benchmarkLogger } from "../lib/benchmarkLogger";
import '../BenchmarkDashboard.css';

export default function BenchmarkDashboard() {
  const results = benchmarkLogger.getResults();
  const summary = benchmarkLogger.getSummaryByLibrary();

  return (
    <div className="dashboardPage">
      <div className="dashboardContainer">
        {Object.keys(summary).length > 0 && (
          <div className="summaryGrid">
            {Object.entries(summary).map(([library, data]) => (
              <div
                key={library}
                className={`summaryCard ${
                  library === 'Overwatch TS'
                    ? 'summaryCardOverwatch'
                    : library === 'Zustand'
                      ? 'summaryCardZustand'
                      : 'summaryCardRedux'
                }`}
              >
                <h2 className="summaryCardTitle">{library}</h2>
                <p>Tests Run: <span className="highlight">{data.count}</span></p>
                <p>Average Update: <span className="highlight">{data.average.toFixed(2)}ms</span></p>
                <p>Fastest Update: <span className="highlight">{data.fastest.toFixed(2)}ms</span></p>
                <p>Latest Update: <span className="highlight">{data.latest.toFixed(2)}ms</span></p>
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
