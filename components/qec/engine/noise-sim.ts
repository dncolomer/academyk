/**
 * Deterministic noise model simulation for the prompting notebook.
 * All numbers come from this simulator - it is the source of truth.
 */

export interface NoiseModelParams {
  pX: number;
  pY: number;
  pZ: number;
}

export interface SimulationResult {
  pLogicalError: number;
  pNoError: number;
  dominantError: "X" | "Y" | "Z" | "none";
  errorCounts: { X: number; Y: number; Z: number; I: number };
}

export function runNoiseSimulation(
  params: NoiseModelParams,
  circuitDepth: number,
  trials: number = 10000
): SimulationResult {
  const { pX, pY, pZ } = params;
  const pI = 1 - pX - pY - pZ;
  
  let xCount = 0, yCount = 0, zCount = 0, iCount = 0;
  let logicalErrors = 0;
  
  for (let t = 0; t < trials; t++) {
    let totalX = 0, totalY = 0, totalZ = 0;
    
    for (let d = 0; d < circuitDepth; d++) {
      const r = deterministicRandom(t * circuitDepth + d);
      if (r < pX) {
        totalX++;
        xCount++;
      } else if (r < pX + pY) {
        totalY++;
        yCount++;
      } else if (r < pX + pY + pZ) {
        totalZ++;
        zCount++;
      } else {
        iCount++;
      }
    }
    
    const netX = totalX % 2;
    const netZ = (totalY + totalZ) % 2;
    if (netX > 0 || netZ > 0) {
      logicalErrors++;
    }
  }
  
  const total = xCount + yCount + zCount + iCount;
  const errorTotal = xCount + yCount + zCount;
  
  let dominantError: "X" | "Y" | "Z" | "none" = "none";
  if (errorTotal > 0) {
    if (xCount >= yCount && xCount >= zCount) dominantError = "X";
    else if (yCount >= xCount && yCount >= zCount) dominantError = "Y";
    else dominantError = "Z";
  }
  
  return {
    pLogicalError: logicalErrors / trials,
    pNoError: iCount / total,
    dominantError,
    errorCounts: { X: xCount, Y: yCount, Z: zCount, I: iCount },
  };
}

function deterministicRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

export function calculateErrorAccumulation(pError: number, depths: number[]): number[] {
  return depths.map(d => 1 - Math.pow(1 - pError, d));
}

export function compareNoiseModels(
  models: { name: string; params: NoiseModelParams }[],
  depth: number
): { name: string; pLogical: number; dominant: string }[] {
  return models.map(m => {
    const result = runNoiseSimulation(m.params, depth);
    return {
      name: m.name,
      pLogical: result.pLogicalError,
      dominant: result.dominantError,
    };
  });
}

export const PRESET_NOISE_MODELS = {
  symmetric: { pX: 0.001, pY: 0.001, pZ: 0.001 },
  zBiased: { pX: 0.0005, pY: 0.0005, pZ: 0.002 },
  xBiased: { pX: 0.002, pY: 0.0005, pZ: 0.0005 },
  highNoise: { pX: 0.005, pY: 0.005, pZ: 0.005 },
  lowNoise: { pX: 0.0003, pY: 0.0003, pZ: 0.0003 },
} as const;

export function formatPercent(p: number): string {
  if (p < 0.0001) return "<0.01%";
  if (p < 0.01) return `${(p * 100).toFixed(2)}%`;
  return `${(p * 100).toFixed(1)}%`;
}

export function formatNumber(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toString();
}
