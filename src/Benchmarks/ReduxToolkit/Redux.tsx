/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ReduxProvider } from './ReduxProvider';
import { increment, reset, RootState } from './store';
import { benchmarkLogger } from '../../lib/benchmarkLogger';
// import { benchmarkLogger } from '../lib/benchmarkLogger';

// Box component subscribing to count
function Box({ id }: { id: number }) {
  const count = useSelector((state: RootState) => state.counter.count);
  return <div>Comp {id}: {count}</div>;
}

// Inner benchmark component
function ReduxBenchmarkInner() {
  const intervalRef = useRef<any>(null);
  const [ready, setReady] = useState(false);
  const dispatch = useDispatch();
  const count = useSelector((state: RootState) => state.counter.count);
    const [processing, setProcessing] = useState(false);

  useEffect(() => {
    console.log('%c--- Redux Toolkit Benchmark Started ---', 'color: #e74c3c');

    // Cold start measurement
    const coldStart = performance.now();
    dispatch(reset());
    const coldEnd = performance.now();
    const coldInitTime = coldEnd - coldStart;
    console.log(`Cold start init time: ${(coldEnd - coldStart).toFixed(2)}ms`);
    benchmarkLogger.log('Redux Toolkit', 'Cold Start Init', coldInitTime);

    setReady(true);

    // 10,000 updates test
    intervalRef.current = setTimeout(() => {
      const memoryBefore = (performance as any)?.memory?.usedJSHeapSize || 0;
      const before = performance.now();
      for (let i = 0; i < 10000; i++) {
        console.log(count)
        dispatch(increment());
      }
      const after = performance.now();
      const updateTime = after - before;
      const memoryAfter = (performance as any)?.memory?.usedJSHeapSize || 0;
      const memoryDeltaMB = (memoryAfter - memoryBefore) / (1024 * 1024);
      console.log(`Time for 10,000 updates: ${(after - before).toFixed(2)}ms`);
      benchmarkLogger.log('Redux Toolkit', '10,000 concurrent state updates', updateTime,'ms',memoryDeltaMB);
      setProcessing(true);
    }, 500);
    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, []);

  return (
    <div className="container">
      <h1 className="heading">Redux Benchmark Playground</h1>
      <p className="description">
        Open your console to view performance logs and use React DevTools to observe re-renders.
      </p>

      <p style={{padding:"1rem 0"}}>{!processing ? "Processing..." : "Processed"}</p>
      {ready && (
        <div className="gridContainer">
          {Array.from({ length: 1000 }, (_, i) => (
            <Box key={i} id={i} />
          ))}
        </div>
      )}
    </div>
  );
}

// Export with Provider
export default function ReduxBenchmark() {
  return (
    <ReduxProvider>
      <ReduxBenchmarkInner />
    </ReduxProvider>
  );
}
