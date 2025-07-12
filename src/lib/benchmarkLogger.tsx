export type BenchmarkResult = {
  library: string;
  test: string;
  value: number;
  unit: string;
  memoryDeltaMB?: number;
  timestamp: string;
};


export class BenchmarkLogger {
  private results: BenchmarkResult[] = [];

  log(
  library: string,
  test: string,
  value: number,
  unit: string = 'ms',
  memoryDeltaMB?: number
) {
    const entry: BenchmarkResult = {
      library,
      test,
      value,
      unit,
      memoryDeltaMB,
      timestamp: new Date().toISOString(),
    };
    console.log(`✅ Benchmark captured: ${JSON.stringify(entry)}`);
    this.results.push(entry);
  }

  getResults() {
    return this.results;
  }

getSummaryByLibrary() {
  const summary: Record<
    string,
    { count: number; average: number; fastest: number; latest: number }
  > = {};

  this.results.forEach((r) => {
    if (!summary[r.library]) {
      summary[r.library] = {
        count: 0,
        average: 0,
        fastest: Infinity,
        latest: 0,
      };
    }
    const lib = summary[r.library];
    lib.count += 1;

    if (r.test === '10,000 concurrent state updates') {
      lib.average += r.value;
      lib.fastest = Math.min(lib.fastest, r.value);
      lib.latest = r.value;
    }
  });

  for (const lib in summary) {
    const relevantRuns = this.results.filter(
      (r) => r.library === lib && r.test === '10,000 concurrent state updates'
    ).length;

    if (relevantRuns > 0) {
      summary[lib].average = summary[lib].average / relevantRuns;
    } else {
      summary[lib].average = 0;
      summary[lib].fastest = 0;
    }
  }

  return summary;
}


  downloadCSV(filename = 'benchmark_results.csv') {
    const headers = Object.keys(this.results[0]).join(',');
    const rows = this.results.map((r) =>
      [r.library, r.test, r.value, r.unit, r.timestamp].join(',')
    );
    const csv = [headers, ...rows].join('\\n');
    this._downloadFile(csv, filename, 'text/csv');
  }

  downloadJSON(filename = 'benchmark_results.json') {
    const json = JSON.stringify(this.results, null, 2);
    this._downloadFile(json, filename, 'application/json');
  }

  private _downloadFile(content: string, filename: string, type: string) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }
  private storageKey = 'benchmarkResults';

saveToLocalStorage() {
  try {
    localStorage.setItem(this.storageKey, JSON.stringify(this.results));
    console.log('✅ Benchmark results saved to localStorage');
  } catch (error) {
    console.error('❌ Failed to save benchmark results:', error);
  }
}

loadFromJSONFile(file: File) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const text = e.target?.result as string;
      const parsed = JSON.parse(text);
      if (Array.isArray(parsed)) {
        this.results = parsed;
        this.saveToLocalStorage(); // Save to localStorage after loading
        console.log('✅ Benchmark results loaded from JSON file');
      } else {
        console.error('❌ Invalid JSON structure');
      }
    } catch (error) {
      console.error('❌ Failed to parse JSON file:', error);
    }
  };
  reader.readAsText(file);
}

loadFromLocalStorage() {
  try {
    const data = localStorage.getItem(this.storageKey);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        this.results = parsed;
        console.log('✅ Benchmark results loaded from localStorage');
      }
    }
  } catch (error) {
    console.error('❌ Failed to load benchmark results:', error);
  }
}

clearLocalStorage() {
  try {
    localStorage.removeItem(this.storageKey);
    this.results = []
    console.log('✅ Benchmark results cleared from localStorage');
  } catch (error) {
    console.error('❌ Failed to clear benchmark results:', error);
  }
}

}

export const benchmarkLogger = new BenchmarkLogger();
