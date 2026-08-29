const pointsPerSecondSS = 53 + 1 / 3;
const pointsPerSecondSSS = 13 + 1 / 3;
const pointsPerSecondSSSUp = 16;

type ScoreMode = "SS" | "SSS" | "SSS +20%";

// Starting raw score and per-second decay for each rank mode.
const scoreConfig: Record<ScoreMode, { rawStart: number; pointsPerSecond: number }> = {
  SS: { rawStart: 32000, pointsPerSecond: pointsPerSecondSS },
  SSS: { rawStart: 40000, pointsPerSecond: pointsPerSecondSSS },
  "SSS +20%": { rawStart: 48000, pointsPerSecond: pointsPerSecondSSSUp },
};

// Memorial Arena score thresholds for the first 45 seconds, in the given mode.
function generateScores(mode: ScoreMode): number[] {
  const seconds = 45;
  const { rawStart, pointsPerSecond } = scoreConfig[mode];
  const scores: number[] = [];
  for (let i = 0; i < seconds; i += 1) {
    scores.push(Math.floor(rawStart - pointsPerSecond * (i + 1)));
  }
  return scores;
}

export { generateScores };
