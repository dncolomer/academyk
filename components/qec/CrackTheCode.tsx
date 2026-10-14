"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { cn } from "@/lib/cn";
import { syndrome, REP3, SURF3, type Code } from "./engine/pauli";

// Types
type GamePhase = "intro" | "predict" | "reveal" | "results" | "cliffhanger";
type PuzzleMode = "guess_error" | "predict_checks";
type Confidence = 50 | 70 | 90;
type Difficulty = "easier" | "standard" | "stretch";

interface GamePuzzle {
  id: string;
  code: Code;
  mode: PuzzleMode;
  error: string;
  litChecks: string[];
  hint?: string;
  explanation: string;
  difficulty: Difficulty;
}

interface PlayerAttempt {
  puzzleId: string;
  prediction: string[] | number;
  confidence: Confidence;
  correct: boolean;
  timeMs: number;
  timestamp: number;
}

interface LeaderboardEntry {
  nickname: string;
  score: number;
  calibration: number;
  puzzlesSolved: number;
  isDemo?: boolean;
  timestamp: number;
}

interface MissionState {
  missionId: number;
  puzzleIndex: number;
  attempts: PlayerAttempt[];
  startTime: number;
}

// Seeded demo rivals
const DEMO_RIVALS: LeaderboardEntry[] = [
  { nickname: "QuantumQueen", score: 847, calibration: 0.82, puzzlesSolved: 12, isDemo: true, timestamp: Date.now() - 3600000 },
  { nickname: "ErrorHunter", score: 723, calibration: 0.75, puzzlesSolved: 10, isDemo: true, timestamp: Date.now() - 7200000 },
  { nickname: "SyndromeSlayer", score: 651, calibration: 0.71, puzzlesSolved: 9, isDemo: true, timestamp: Date.now() - 10800000 },
  { nickname: "CheckMate", score: 589, calibration: 0.68, puzzlesSolved: 8, isDemo: true, timestamp: Date.now() - 14400000 },
  { nickname: "QubitNinja", score: 412, calibration: 0.63, puzzlesSolved: 6, isDemo: true, timestamp: Date.now() - 18000000 },
];

// Mission definitions
const MISSIONS = [
  {
    id: 1,
    title: "The Repetition Code",
    description: "Three qubits, two checks. Can you spot where errors hide?",
    code: REP3,
    puzzleCount: 4,
    cliffhanger: "You've mastered the basics. But what happens when the code gets bigger... and errors get sneakier?",
  },
  {
    id: 2,
    title: "The Surface Code",
    description: "Nine qubits arranged in a grid. Eight checks watching for trouble.",
    code: SURF3,
    puzzleCount: 5,
    cliffhanger: "You found the single errors. But two errors together? They can hide in plain sight...",
  },
  {
    id: 3,
    title: "Error Chains",
    description: "When errors team up, only the endpoints show. Can you trace the chain?",
    code: SURF3,
    puzzleCount: 4,
    cliffhanger: "You've cracked the code. But there's one error pattern that fools everyone...",
  },
];

// Generate puzzles for a mission
function generateMissionPuzzles(missionId: number, difficulty: Difficulty): GamePuzzle[] {
  const mission = MISSIONS.find(m => m.id === missionId);
  if (!mission) return [];
  
  const code = mission.code;
  const puzzles: GamePuzzle[] = [];
  
  if (missionId === 1) {
    // Repetition code puzzles
    const errors = difficulty === "easier" 
      ? ["X__", "_X_", "__X"]
      : difficulty === "stretch"
      ? ["X__", "_X_", "XX_", "Z__"]
      : ["X__", "_X_", "__X", "Z__"];
    
    errors.forEach((error, i) => {
      const litChecks = syndrome(code, error);
      const isZ = error.includes("Z");
      puzzles.push({
        id: `m1-${i}`,
        code,
        mode: i % 2 === 0 ? "predict_checks" : "guess_error",
        error,
        litChecks,
        explanation: isZ 
          ? "Z errors don't clash with Z checks. This code only catches bit-flips!"
          : `The error touches ${litChecks.length} check(s). Each lights up because they clash.`,
        difficulty,
      });
    });
  } else if (missionId === 2) {
    // Surface code single errors
    const positions = difficulty === "easier"
      ? [4, 0, 8]
      : difficulty === "stretch"
      ? [4, 0, 2, 5, 1]
      : [4, 0, 8, 3, 5];
    
    positions.forEach((pos, i) => {
      const paulis = ["X", "Z", "X", "Z", "Y"];
      const p = paulis[i % paulis.length];
      const errorArr = Array(9).fill("_");
      errorArr[pos] = p;
      const error = errorArr.join("");
      const litChecks = syndrome(code, error);
      
      puzzles.push({
        id: `m2-${i}`,
        code,
        mode: i % 2 === 0 ? "predict_checks" : "guess_error",
        error,
        litChecks,
        explanation: p === "Y" 
          ? "Y errors clash with BOTH X and Z checks. They light up everything they touch!"
          : `${p} errors are caught by ${p === "X" ? "Z" : "X"} checks. Opposite types clash.`,
        difficulty,
      });
    });
  } else {
    // Error chains and logical errors
    const chainErrors = difficulty === "stretch"
      ? ["___XX____", "X__X_____", "X__X__X__"]
      : ["___XX____", "____XX___", "X__X_____"];
    
    chainErrors.forEach((error, i) => {
      const litChecks = syndrome(code, error);
      const isLogical = litChecks.length === 0 && error.includes("X");
      
      puzzles.push({
        id: `m3-${i}`,
        code,
        mode: "predict_checks",
        error,
        litChecks,
        explanation: isLogical
          ? "No checks lit! This is a LOGICAL ERROR. The code failed silently."
          : "Error chains only light up their endpoints. The middle cancels out!",
        difficulty,
      });
    });
  }
  
  return puzzles.slice(0, mission.puzzleCount);
}

// Scoring
function calculateBrierScore(confidence: Confidence, correct: boolean): number {
  const prob = confidence / 100;
  const outcome = correct ? 1 : 0;
  return Math.pow(prob - outcome, 2);
}

function calculateScore(attempt: PlayerAttempt): number {
  const brierScore = calculateBrierScore(attempt.confidence, attempt.correct);
  const basePoints = attempt.correct ? 100 : 0;
  const calibrationBonus = Math.round((1 - brierScore) * 50);
  const speedBonus = Math.max(0, Math.round((30000 - attempt.timeMs) / 1000));
  return basePoints + calibrationBonus + speedBonus;
}

// Share link generation
function generateShareLink(missionId: number, seed: number): string {
  const params = new URLSearchParams({ m: String(missionId), s: String(seed) });
  if (typeof window !== "undefined") {
    return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
  }
  return "";
}

// Storage
function loadLeaderboard(): LeaderboardEntry[] {
  if (typeof window === "undefined") return DEMO_RIVALS;
  const stored = localStorage.getItem("qec-leaderboard");
  if (stored) {
    const parsed = JSON.parse(stored) as LeaderboardEntry[];
    return [...parsed, ...DEMO_RIVALS].sort((a, b) => b.score - a.score).slice(0, 20);
  }
  return DEMO_RIVALS;
}

function saveToLeaderboard(entry: LeaderboardEntry): void {
  if (typeof window === "undefined") return;
  const current = loadLeaderboard().filter(e => !e.isDemo);
  const updated = [...current.filter(e => e.nickname !== entry.nickname), entry]
    .sort((a, b) => b.score - a.score)
    .slice(0, 15);
  localStorage.setItem("qec-leaderboard", JSON.stringify(updated));
}

// Components
function QubitGridVisual({
  code,
  error,
  litChecks,
  showError,
  onQubitClick,
  selectedQubit,
}: {
  code: Code;
  error: string;
  litChecks: string[];
  showError: boolean;
  onQubitClick?: (q: number) => void;
  selectedQubit?: number;
}) {
  const isRep = code.id === "rep3";
  const size = isRep ? 72 : 56;
  const gap = isRep ? 12 : 6;
  const cols = isRep ? 3 : 3;

  const COLORS: Record<string, string> = {
    X: "bg-red-500 text-white",
    Y: "bg-purple-500 text-white", 
    Z: "bg-emerald-500 text-white",
  };

  return (
    <div className="inline-block">
      <div 
        className="grid" 
        style={{ gridTemplateColumns: `repeat(${cols}, ${size}px)`, gap: `${gap}px` }}
      >
        {code.qubitPositions.map((_, i) => {
          const p = error[i];
          const hasError = showError && p !== "_";
          const isSelected = selectedQubit === i;
          
          return (
            <button
              key={i}
              type="button"
              onClick={() => onQubitClick?.(i)}
              disabled={!onQubitClick}
              className={cn(
                "rounded-lg flex flex-col items-center justify-center transition-all",
                hasError ? COLORS[p] : "bg-slate-800 border border-slate-600",
                isSelected && "ring-2 ring-cyan-400 ring-offset-2 ring-offset-[#0a1628]",
                onQubitClick && "cursor-pointer hover:scale-105"
              )}
              style={{ width: size, height: size }}
            >
              <span className="text-xs opacity-60">q{i}</span>
              {hasError && <span className="text-xl font-bold">{p}</span>}
            </button>
          );
        })}
      </div>
      
      {/* Check indicators */}
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        {code.checks.map(check => {
          const isLit = litChecks.includes(check.id);
          return (
            <div
              key={check.id}
              className={cn(
                "px-3 py-1.5 rounded text-xs font-mono transition-all",
                isLit 
                  ? "bg-amber-400 text-black shadow-[0_0_16px_rgba(251,191,36,0.6)]"
                  : "bg-slate-700 text-slate-400"
              )}
            >
              {check.id}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ConfidenceSelector({ value, onChange }: { value: Confidence; onChange: (c: Confidence) => void }) {
  const options: { value: Confidence; label: string; desc: string }[] = [
    { value: 50, label: "50%", desc: "Guessing" },
    { value: 70, label: "70%", desc: "Likely" },
    { value: 90, label: "90%", desc: "Confident" },
  ];

  return (
    <div className="flex gap-3">
      {options.map(opt => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={cn(
            "flex-1 rounded-lg p-3 text-center transition-all",
            value === opt.value
              ? "bg-cyan-500 text-white"
              : "bg-slate-700 text-slate-300 hover:bg-slate-600"
          )}
        >
          <div className="text-lg font-bold">{opt.label}</div>
          <div className="text-xs opacity-70">{opt.desc}</div>
        </button>
      ))}
    </div>
  );
}

function Leaderboard({ entries, currentNickname }: { entries: LeaderboardEntry[]; currentNickname?: string }) {
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-800/50 overflow-hidden">
      <div className="bg-slate-700/50 px-4 py-2 text-xs font-mono text-slate-400 flex">
        <span className="w-8">#</span>
        <span className="flex-1">Player</span>
        <span className="w-16 text-right">Score</span>
        <span className="w-16 text-right">Cal.</span>
      </div>
      <div className="divide-y divide-slate-700/50">
        {entries.slice(0, 10).map((entry, i) => (
          <div 
            key={entry.nickname}
            className={cn(
              "px-4 py-2 flex text-sm",
              entry.nickname === currentNickname && "bg-cyan-500/10",
              entry.isDemo && "opacity-60"
            )}
          >
            <span className="w-8 font-mono text-slate-500">{i + 1}</span>
            <span className="flex-1 truncate">
              {entry.nickname}
              {entry.isDemo && <span className="ml-1 text-xs text-slate-500">(demo)</span>}
            </span>
            <span className="w-16 text-right font-mono text-amber-400">{entry.score}</span>
            <span className="w-16 text-right font-mono text-slate-400">{Math.round(entry.calibration * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function InstructorView({ attempts }: { attempts: PlayerAttempt[] }) {
  const mockData = {
    totalPlayers: 47,
    avgCalibration: 0.72,
    dropoffPoints: [
      { puzzle: "Surface Code Q4", dropoff: "18%" },
      { puzzle: "Error Chain", dropoff: "12%" },
    ],
    confidenceDistribution: { overconfident: 34, calibrated: 41, underconfident: 25 },
  };

  return (
    <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-amber-400 text-xs font-mono">INSTRUCTOR VIEW</span>
        <span className="text-xs text-slate-500">(example data)</span>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <div className="text-slate-400 text-xs mb-1">Players</div>
          <div className="text-2xl font-bold text-white">{mockData.totalPlayers}</div>
        </div>
        <div>
          <div className="text-slate-400 text-xs mb-1">Avg Calibration</div>
          <div className="text-2xl font-bold text-cyan-400">{Math.round(mockData.avgCalibration * 100)}%</div>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="text-slate-400 text-xs mb-2">Confidence Distribution</div>
        <div className="flex gap-1 h-6">
          <div 
            className="bg-red-500/60 rounded-l" 
            style={{ width: `${mockData.confidenceDistribution.overconfident}%` }}
            title="Overconfident"
          />
          <div 
            className="bg-emerald-500/60" 
            style={{ width: `${mockData.confidenceDistribution.calibrated}%` }}
            title="Calibrated"
          />
          <div 
            className="bg-blue-500/60 rounded-r" 
            style={{ width: `${mockData.confidenceDistribution.underconfident}%` }}
            title="Underconfident"
          />
        </div>
        <div className="flex justify-between text-xs text-slate-500 mt-1">
          <span>Over</span>
          <span>Calibrated</span>
          <span>Under</span>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="text-slate-400 text-xs mb-2">Retention Drop-off Points</div>
        {mockData.dropoffPoints.map((p, i) => (
          <div key={i} className="flex justify-between text-sm">
            <span className="text-slate-300">{p.puzzle}</span>
            <span className="text-red-400">{p.dropoff}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CrackTheCode() {
  const [phase, setPhase] = useState<GamePhase>("intro");
  const [nickname, setNickname] = useState("");
  const [missionState, setMissionState] = useState<MissionState | null>(null);
  const [puzzles, setPuzzles] = useState<GamePuzzle[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [showInstructor, setShowInstructor] = useState(false);
  
  // Current puzzle state
  const [selectedQubit, setSelectedQubit] = useState<number | null>(null);
  const [selectedChecks, setSelectedChecks] = useState<string[]>([]);
  const [confidence, setConfidence] = useState<Confidence>(70);
  const [puzzleStartTime, setPuzzleStartTime] = useState(0);
  const [difficulty, setDifficulty] = useState<Difficulty>("standard");

  const currentPuzzle = missionState && puzzles[missionState.puzzleIndex];
  const currentMission = missionState && MISSIONS.find(m => m.id === missionState.missionId);

  useEffect(() => {
    setLeaderboard(loadLeaderboard());
  }, []);

  const startMission = useCallback((missionId: number) => {
    const newPuzzles = generateMissionPuzzles(missionId, difficulty);
    setPuzzles(newPuzzles);
    setMissionState({
      missionId,
      puzzleIndex: 0,
      attempts: [],
      startTime: Date.now(),
    });
    setPuzzleStartTime(Date.now());
    setSelectedQubit(null);
    setSelectedChecks([]);
    setPhase("predict");
  }, [difficulty]);

  const submitPrediction = useCallback(() => {
    if (!currentPuzzle || !missionState) return;

    const timeMs = Date.now() - puzzleStartTime;
    let correct = false;

    if (currentPuzzle.mode === "guess_error") {
      const actualErrorQubit = currentPuzzle.error.split("").findIndex(c => c !== "_");
      correct = selectedQubit === actualErrorQubit;
    } else {
      const sortedSelected = [...selectedChecks].sort();
      const sortedActual = [...currentPuzzle.litChecks].sort();
      correct = JSON.stringify(sortedSelected) === JSON.stringify(sortedActual);
    }

    const attempt: PlayerAttempt = {
      puzzleId: currentPuzzle.id,
      prediction: currentPuzzle.mode === "guess_error" ? selectedQubit ?? -1 : selectedChecks,
      confidence,
      correct,
      timeMs,
      timestamp: Date.now(),
    };

    setMissionState(prev => prev ? {
      ...prev,
      attempts: [...prev.attempts, attempt],
    } : null);

    setPhase("reveal");
  }, [currentPuzzle, missionState, selectedQubit, selectedChecks, confidence, puzzleStartTime]);

  const nextPuzzle = useCallback(() => {
    if (!missionState) return;

    const nextIndex = missionState.puzzleIndex + 1;
    if (nextIndex >= puzzles.length) {
      setPhase("cliffhanger");
      
      // Calculate and save score
      if (nickname) {
        const totalScore = missionState.attempts.reduce((sum, a) => sum + calculateScore(a), 0);
        const avgCalibration = missionState.attempts.length > 0
          ? 1 - (missionState.attempts.reduce((sum, a) => sum + calculateBrierScore(a.confidence, a.correct), 0) / missionState.attempts.length)
          : 0;
        
        const entry: LeaderboardEntry = {
          nickname,
          score: totalScore,
          calibration: avgCalibration,
          puzzlesSolved: missionState.attempts.filter(a => a.correct).length,
          timestamp: Date.now(),
        };
        saveToLeaderboard(entry);
        setLeaderboard(loadLeaderboard());
      }
    } else {
      // Adjust difficulty based on calibration
      const recentAttempts = missionState.attempts.slice(-3);
      const avgConfCorrect = recentAttempts.filter(a => a.correct && a.confidence >= 70).length / Math.max(recentAttempts.length, 1);
      
      if (avgConfCorrect > 0.8) {
        setDifficulty("stretch");
      } else if (avgConfCorrect < 0.3) {
        setDifficulty("easier");
      } else {
        setDifficulty("standard");
      }

      setMissionState(prev => prev ? { ...prev, puzzleIndex: nextIndex } : null);
      setSelectedQubit(null);
      setSelectedChecks([]);
      setPuzzleStartTime(Date.now());
      setPhase("predict");
    }
  }, [missionState, puzzles.length, nickname]);

  const toggleCheck = (checkId: string) => {
    setSelectedChecks(prev => 
      prev.includes(checkId) 
        ? prev.filter(c => c !== checkId)
        : [...prev, checkId]
    );
  };

  const shareLink = useMemo(() => {
    if (missionState) {
      return generateShareLink(missionState.missionId, missionState.startTime);
    }
    return "";
  }, [missionState]);

  const totalScore = missionState?.attempts.reduce((sum, a) => sum + calculateScore(a), 0) ?? 0;

  return (
    <section id="lab" className="scroll-mt-8">
      <header className="mb-8">
        <p className="ak-label">Interactive Challenge</p>
        <h2 className="ak-serif mt-3 text-3xl text-ink sm:text-4xl">
          Crack the Code
        </h2>
        <p className="mt-4 max-w-2xl text-muted">
          Quantum codes protect data by detecting errors. Your mission: predict which 
          detectors will fire, or find where the error hides. The simulator decides.
        </p>
      </header>

      <div className="rounded-lg border border-cyan-400/20 bg-[#0a1628] p-6 sm:p-8">
        <div className="relative">
          <div className="absolute -left-2 -top-2 h-4 w-4 border-l-2 border-t-2 border-cyan-400/50" />
          <div className="absolute -right-2 -top-2 h-4 w-4 border-r-2 border-t-2 border-cyan-400/50" />
          <div className="absolute -bottom-2 -left-2 h-4 w-4 border-b-2 border-l-2 border-cyan-400/50" />
          <div className="absolute -bottom-2 -right-2 h-4 w-4 border-b-2 border-r-2 border-cyan-400/50" />

          {phase === "intro" && (
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <h3 className="ak-serif text-2xl">Ready to crack some codes?</h3>
                <p className="text-slate-400 max-w-md mx-auto">
                  Enter a nickname to join the leaderboard, or play anonymously.
                </p>
                <input
                  type="text"
                  value={nickname}
                  onChange={e => setNickname(e.target.value.slice(0, 15))}
                  placeholder="Your nickname (optional)"
                  className="w-full max-w-xs mx-auto block rounded border border-slate-600 bg-slate-800 px-4 py-2 text-center text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-3 mt-8">
                {MISSIONS.map(mission => (
                  <button
                    key={mission.id}
                    type="button"
                    onClick={() => startMission(mission.id)}
                    className="rounded-lg border border-slate-600 bg-slate-800/50 p-4 text-left hover:border-cyan-400 transition-colors"
                  >
                    <div className="text-xs text-cyan-400 font-mono">MISSION {mission.id}</div>
                    <div className="text-lg font-semibold text-white mt-1">{mission.title}</div>
                    <div className="text-sm text-slate-400 mt-2">{mission.description}</div>
                  </button>
                ))}
              </div>

              <div className="mt-8">
                <Leaderboard entries={leaderboard} currentNickname={nickname} />
              </div>
            </div>
          )}

          {phase === "predict" && currentPuzzle && currentMission && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-cyan-400 font-mono">
                    MISSION {currentMission.id} • PUZZLE {(missionState?.puzzleIndex ?? 0) + 1}/{puzzles.length}
                  </div>
                  <div className="text-lg font-semibold text-white mt-1">{currentMission.title}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">Score</div>
                  <div className="text-xl font-bold text-amber-400">{totalScore}</div>
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                {currentPuzzle.mode === "guess_error" ? (
                  <>
                    <p className="text-white mb-2">These detectors lit up. <strong>Where's the error?</strong></p>
                    <p className="text-sm text-slate-400 mb-4">Tap the qubit you think has the error.</p>
                  </>
                ) : (
                  <>
                    <p className="text-white mb-2">An error hit the code. <strong>Which detectors light up?</strong></p>
                    <p className="text-sm text-slate-400 mb-4">Tap the detectors you think will fire.</p>
                  </>
                )}

                <div className="flex justify-center">
                  <QubitGridVisual
                    code={currentPuzzle.code}
                    error={currentPuzzle.mode === "predict_checks" ? currentPuzzle.error : "_".repeat(currentPuzzle.code.n)}
                    litChecks={currentPuzzle.mode === "guess_error" ? currentPuzzle.litChecks : selectedChecks}
                    showError={currentPuzzle.mode === "predict_checks"}
                    onQubitClick={currentPuzzle.mode === "guess_error" ? setSelectedQubit : undefined}
                    selectedQubit={selectedQubit ?? undefined}
                  />
                </div>

                {currentPuzzle.mode === "predict_checks" && (
                  <div className="mt-4 flex flex-wrap gap-2 justify-center">
                    {currentPuzzle.code.checks.map(check => (
                      <button
                        key={check.id}
                        type="button"
                        onClick={() => toggleCheck(check.id)}
                        className={cn(
                          "px-4 py-2 rounded text-sm font-mono transition-all",
                          selectedChecks.includes(check.id)
                            ? "bg-amber-400 text-black"
                            : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                        )}
                      >
                        {check.id}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => setSelectedChecks([])}
                      className={cn(
                        "px-4 py-2 rounded text-sm transition-all border",
                        selectedChecks.length === 0
                          ? "border-amber-400 text-amber-400"
                          : "border-slate-600 text-slate-400 hover:border-slate-500"
                      )}
                    >
                      None
                    </button>
                  </div>
                )}
              </div>

              <div>
                <p className="text-sm text-slate-400 mb-3 text-center">How confident are you?</p>
                <ConfidenceSelector value={confidence} onChange={setConfidence} />
              </div>

              <button
                type="button"
                onClick={submitPrediction}
                disabled={currentPuzzle.mode === "guess_error" ? selectedQubit === null : false}
                className="w-full py-3 rounded-lg bg-cyan-500 text-white font-semibold hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Lock In Prediction
              </button>
            </div>
          )}

          {phase === "reveal" && currentPuzzle && missionState && (
            <div className="space-y-6">
              {(() => {
                const lastAttempt = missionState.attempts[missionState.attempts.length - 1];
                const wasCorrect = lastAttempt?.correct ?? false;
                const calibrationGap = lastAttempt ? (lastAttempt.confidence / 100) - (wasCorrect ? 1 : 0) : 0;

                return (
                  <>
                    <div className={cn(
                      "text-center py-6 rounded-lg",
                      wasCorrect ? "bg-emerald-500/20" : "bg-red-500/20"
                    )}>
                      <div className="text-4xl mb-2">{wasCorrect ? "✓" : "✗"}</div>
                      <div className={cn(
                        "text-xl font-bold",
                        wasCorrect ? "text-emerald-400" : "text-red-400"
                      )}>
                        {wasCorrect ? "Correct!" : "Not quite"}
                      </div>
                      <div className="text-sm text-slate-400 mt-1">
                        You said {lastAttempt?.confidence}% confident
                        {Math.abs(calibrationGap) > 0.2 && (
                          <span className={calibrationGap > 0 ? "text-amber-400" : "text-cyan-400"}>
                            {" "}— {calibrationGap > 0 ? "overconfident" : "underconfident"}!
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <QubitGridVisual
                        code={currentPuzzle.code}
                        error={currentPuzzle.error}
                        litChecks={currentPuzzle.litChecks}
                        showError={true}
                      />
                    </div>

                    <div className="bg-slate-800/50 rounded-lg p-4">
                      <p className="text-xs text-cyan-400 font-mono mb-2">WHY?</p>
                      <p className="text-white">{currentPuzzle.explanation}</p>
                    </div>

                    <div className="text-center text-sm text-slate-400">
                      Points earned: <span className="text-amber-400 font-bold">+{calculateScore(lastAttempt)}</span>
                    </div>

                    <button
                      type="button"
                      onClick={nextPuzzle}
                      className="w-full py-3 rounded-lg bg-cyan-500 text-white font-semibold hover:bg-cyan-400 transition-colors"
                    >
                      Continue
                    </button>
                  </>
                );
              })()}
            </div>
          )}

          {phase === "cliffhanger" && currentMission && missionState && (
            <div className="space-y-6 text-center">
              <div className="text-6xl">🎉</div>
              <h3 className="ak-serif text-2xl text-white">Mission Complete!</h3>
              
              <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
                <div className="bg-slate-800 rounded-lg p-3">
                  <div className="text-2xl font-bold text-amber-400">{totalScore}</div>
                  <div className="text-xs text-slate-400">Score</div>
                </div>
                <div className="bg-slate-800 rounded-lg p-3">
                  <div className="text-2xl font-bold text-emerald-400">
                    {missionState.attempts.filter(a => a.correct).length}/{missionState.attempts.length}
                  </div>
                  <div className="text-xs text-slate-400">Correct</div>
                </div>
                <div className="bg-slate-800 rounded-lg p-3">
                  <div className="text-2xl font-bold text-cyan-400">
                    {Math.round((1 - missionState.attempts.reduce((sum, a) => sum + calculateBrierScore(a.confidence, a.correct), 0) / Math.max(missionState.attempts.length, 1)) * 100)}%
                  </div>
                  <div className="text-xs text-slate-400">Calibration</div>
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-4 max-w-md mx-auto">
                <p className="text-slate-300 italic">"{currentMission.cliffhanger}"</p>
              </div>

              {shareLink && (
                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm text-slate-400">Challenge a friend:</span>
                  <button
                    type="button"
                    onClick={() => navigator.clipboard.writeText(shareLink)}
                    className="text-cyan-400 hover:text-cyan-300 text-sm underline"
                  >
                    Copy link
                  </button>
                </div>
              )}

              <div className="flex gap-3 justify-center">
                {currentMission.id < MISSIONS.length && (
                  <button
                    type="button"
                    onClick={() => startMission(currentMission.id + 1)}
                    className="px-6 py-3 rounded-lg bg-cyan-500 text-white font-semibold hover:bg-cyan-400 transition-colors"
                  >
                    Next Mission →
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setPhase("intro")}
                  className="px-6 py-3 rounded-lg border border-slate-600 text-slate-300 hover:border-slate-500 transition-colors"
                >
                  Back to Menu
                </button>
              </div>

              <div className="mt-6">
                <Leaderboard entries={leaderboard} currentNickname={nickname} />
              </div>
            </div>
          )}

          {phase === "results" && (
            <div className="text-center">
              <h3 className="ak-serif text-2xl mb-4">Final Results</h3>
              <Leaderboard entries={leaderboard} currentNickname={nickname} />
            </div>
          )}
        </div>

        {/* Instructor toggle */}
        <div className="mt-6 pt-4 border-t border-slate-700">
          <button
            type="button"
            onClick={() => setShowInstructor(!showInstructor)}
            className="text-xs text-slate-500 hover:text-slate-400"
          >
            {showInstructor ? "Hide" : "Show"} instructor view
          </button>
          {showInstructor && (
            <div className="mt-4">
              <InstructorView attempts={missionState?.attempts ?? []} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
