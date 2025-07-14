import React from 'react'
import { FaGithub } from "react-icons/fa";
import { Link } from 'react-router-dom';


const Methadolagy = () => {
  return (
   <section className="benchmarkSection">
  <div className="benchmarkContainer">
    <h2 className="benchmarkHeading">
      🚀 How We Benchmark State Management Libraries
    </h2>
    <p className="benchmarkDescription">
      We’ve built an open, transparent benchmark playground to measure real-world performance of Overwatch TS, Zustand, and Redux Toolkit in realistic React apps.
    </p>
    <div className="benchmarkList">
      <p>✅ <strong>Concurrent State Updates:</strong> Triggering 10,000 rapid updates to stress-test each library’s update pipeline.</p>
      <p>✅ <strong>Render Efficiency:</strong> Tracking re-renders across 1,000 subscribed components.</p>
      <p>✅ <strong>Memory Usage:</strong> Monitoring JS heap usage before and after update storms.</p>
      <p>✅ <strong>Cold Start:</strong> Measuring initialization and first update handling speed.</p>
      <p>✅ <strong>Open Source:</strong> Contribute or audit on GitHub for transparent, community-driven benchmarking.</p>
    </div>
    <div className="benchmarkActions">
      <Link
        to="https://github.com/WisdomBits/State-Management-Benchmark-playground"
        target="_blank"
        rel="noopener noreferrer"
        className="benchmarkButton benchmarkButtonGray"
      >
        <FaGithub /> View on GitHub
      </Link>
    </div>
  </div>
</section>)
}

export default Methadolagy