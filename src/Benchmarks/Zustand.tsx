/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { create } from 'zustand';
import { benchmarkLogger } from '../lib/benchmarkLogger';

// Define Zustand store
interface State {
  count: number;
  increment: () => void;
  batchIncrement: (n: number) => void;
}

const useStore = create<State>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  batchIncrement: (n) => set((state) => ({ count: state.count + n })),
}));

// Box component subscribing to count
function Box({ id }: { id: number }) {
  const count = useStore((state) => state.count);
  return <div>Comp {id}: {count}</div>;
}

export default function ZustandBenchmark() {
  const intervalRef = useRef<any>(null);
  const [ready, setReady] = useState(false);
  const increment = useStore((state) => state.increment);
  const batchIncrement = useStore((state) => state.batchIncrement);
  const count = useStore((state) => state.count)

  useEffect(() => {
    console.log('%c--- Zustand Benchmark Started ---', 'color: #27ae60');

    // Cold start time measurement
    const coldStart = performance.now();
    batchIncrement(0); // Trigger initial set
    const coldEnd = performance.now();
    const coldInitTime = coldEnd - coldStart;
    console.log(`Cold start init time: ${(coldEnd - coldStart).toFixed(2)}ms`);
    benchmarkLogger.log('Zustand', 'Cold Start Init', coldInitTime);
    setReady(true);

    // Batched 10,000 updates test
    intervalRef.current = setTimeout(() => {
      const memoryBefore = performance?.memory?.usedJSHeapSize || 0;
      const before = performance.now();
      for (let i = 0; i < 10000; i++) {
        console.log(count)
        increment();
      }
      const after = performance.now();
      const updateTime = after - before;
      const memoryAfter = performance?.memory?.usedJSHeapSize || 0;
      const memoryDeltaMB = (memoryAfter - memoryBefore) / (1024 * 1024);
      console.log(`Time for 10,000 updates: ${(after - before).toFixed(2)}ms`);
      benchmarkLogger.log('Zustand', '10,000 concurrent state updates', updateTime,'ms',memoryDeltaMB);
    }, 500);
    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, []);

  return (
    <div className="container">
      <h1 className="heading">Zustand Benchmark Playground</h1>
      <p className="description">
        Open your console to view performance logs and use React DevTools to observe re-renders.
      </p>

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
