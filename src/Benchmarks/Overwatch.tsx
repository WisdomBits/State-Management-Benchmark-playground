/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { createSharedState, usePicker, useSharedState } from 'overwatch-ts';
import React, { useEffect, useRef, useState } from 'react';
import { benchmarkLogger } from '../lib/benchmarkLogger';

// Create global shared state
createSharedState('countState', 0);

// Box component subscribing using usePicker
function Box({ id }: { id: number }) {
  const count = usePicker<number , number>('countState', (s) => s);
  return <div>Comp {id}: {count}</div>;
}

export default function OverwatchBenchmark() {
  const intervalRef = useRef<any>(null);
  const [ready, setReady] = useState(false);
  const [count ,setCountState] = useSharedState<number>('countState');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    console.log('%c--- Overwatch TS Benchmark Started ---', 'color: #0984e3');

    // Cold start timing
    const coldStart = performance.now();
    setCountState((count) => count + 0); // initialize
    const coldEnd = performance.now();
    const coldInitTime = coldEnd - coldStart;
    console.log(`Cold start init time: ${(coldEnd - coldStart).toFixed(2)}ms`);
    benchmarkLogger.log('Overwatch TS', 'Cold Start Init', coldInitTime);
    setReady(true);

    // Batched 10,000 updates test
    intervalRef.current = setTimeout(() => {
      const memoryBefore = (performance as any)?.memory?.usedJSHeapSize || 0;
      const before = performance.now();

      // Overwatch TS batches internally on repeated synchronous updates
      for (let i = 0; i < 10000; i++) {
        console.log(count)
        setCountState((count) => count + 1);
      }
      const after = performance.now();
      const updateTime = after - before;
      const memoryAfter = (performance as any)?.memory?.usedJSHeapSize || 0;
      const memoryDeltaMB = (memoryAfter - memoryBefore) / (1024 * 1024);
      console.log(`Time for 10,000 updates: ${(after - before).toFixed(2)}ms`);
      benchmarkLogger.log('Overwatch TS', '10,000 concurrent state updates', updateTime,'ms',memoryDeltaMB);
      setProcessing(true);
    }, 500);
     return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, []);

  return (
   <div className="container">
      <h1 className="heading">Overwatch Benchmark Playground</h1>
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
