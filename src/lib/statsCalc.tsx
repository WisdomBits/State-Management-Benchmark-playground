export function getComparisonStats(summary: Record<string, { count: number; average: number; fastest: number; latest: number }>) {
  const libraries = Object.keys(summary);
  if (libraries.length < 2) return [];

  const baseLib = 'Overwatch TS';
  if (!summary[baseLib] || summary[baseLib].average === 0) return [];

  const baseAvg = summary[baseLib].average;

  return libraries
    .filter((lib) => lib !== baseLib && summary[lib].average > 0)
    .map((lib) => {
      const otherAvg = summary[lib].average;
      const timesFaster = otherAvg / baseAvg;
      const percentFaster = ((otherAvg - baseAvg) / otherAvg) * 100;
      return {
        lib,
        timesFaster: timesFaster.toFixed(2),
        percentFaster: percentFaster.toFixed(0),
      };
    });
}