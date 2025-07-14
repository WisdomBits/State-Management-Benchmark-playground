import React from 'react'
import { Link } from 'react-router-dom'
import { benchmarkLogger } from '../lib/benchmarkLogger';

const Home = () => {
    return (
        <main className="benchmarkMain">
            <div className="benchmarkContainer">
                <h1 className="benchmarkHeading">Watchly Benchmark</h1>
                <p className="benchmarkDescription">
                    Compare <span className="highlight">Overwatch TS</span>, Zustand, and Redux Toolkit
                    on reactivity and performance.
                </p>
                <p><Link style={{color: "#fff"}} to={"/benchmark-methodology"}>How we Benchmark?</Link></p>

                <h4>Check Results: <Link className="linkButton" to={"/benchmark-stats"}>Performance Analytics</Link></h4>

                <div className="benchmarkButtonGroup">
                    <Link
                        to="/overwatch-benchmark"
                        className="blueButton"
                    >
                        🚀 Overwatch TS Benchmark v1.1.8
                    </Link>

                    <Link
                        to="/zustand-benchmark"
                        className="greenButton"
                    >
                        ⚡ Zustand Benchmark v5.0.6
                    </Link>

                    <Link
                        to="/redux-benchmark"
                        className="redButton"
                    >
                        🔥 Redux Toolkit Benchmark v2.8.2
                    </Link>

                    <div style={{display: "flex", flexDirection: "column", gap : "0.5rem"}} className="uploadWrapper">
                        <label>Upload Previous Results JSON</label>
                        <input
                            type="file"
                            accept="application/json"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    benchmarkLogger.loadFromJSONFile(file);
                                }
                            }}
                            className="uploadInput"
                            placeholder='Upload JSON File'
                        />
                    </div>
                    </div>


                    <footer className="benchmarkFooter">
                        Built for recording performance tests and memory deltas.
                    </footer>
                </div>
        </main>
    )
}

export default Home