import { useState, useEffect, useRef } from "react";
import { Coffee, Play, Square, Droplets, Activity } from "lucide-react";

export function PressureGauge() {
  const [isExtracting, setIsExtracting] = useState(false);
  const [pressure, setPressure] = useState(0); // 0 to 12 bar
  const [timer, setTimer] = useState(0); // in ms
  const [yieldWeight, setYieldWeight] = useState(0); // in grams
  const [flowRate, setFlowRate] = useState(0); // in ml/s
  const [status, setStatus] = useState("Spreman"); // status text

  const isExtractingRef = useRef(false);
  const requestRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Convert pressure to needle rotation angle
  // 0 bar = -120deg, 12 bar = 120deg (span of 240deg)
  const needleRotation = -120 + (pressure / 12) * 240;

  const startExtraction = () => {
    if (isExtractingRef.current) return;
    setIsExtracting(true);
    isExtractingRef.current = true;
    setPressure(0);
    setTimer(0);
    setYieldWeight(0);
    setFlowRate(0);
    setStatus("Pre-infuzija...");
    startTimeRef.current = null; // Let the animation frame set initial timestamp
    requestRef.current = requestAnimationFrame(animate);
  };

  const stopExtraction = () => {
    setIsExtracting(false);
    isExtractingRef.current = false;
    setPressure(0);
    setFlowRate(0);
    setStatus("Spreman");
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
  };

  const animate = (time: number) => {
    if (!isExtractingRef.current) return;

    if (startTimeRef.current === null) {
      startTimeRef.current = time;
    }
    const elapsed = time - startTimeRef.current;
    setTimer(elapsed);

    // Extraction simulation logic (25 seconds total)
    const elapsedSec = elapsed / 1000;

    if (elapsedSec >= 25) {
      // Finished
      setPressure(0);
      setFlowRate(0);
      setYieldWeight(36.0);
      setStatus("Završeno (Savršen šot!)");
      setIsExtracting(false);
      isExtractingRef.current = false;
      return;
    }

    let currentPressure = 0;
    let currentFlow = 0;
    let currentYield = 0;

    if (elapsedSec < 4) {
      // Pre-infusion: 0-4 seconds, pressure climbs to 2 bar, low flow
      setStatus("Pre-infuzija...");
      currentPressure = 1.5 + (elapsedSec / 4) * 1.0;
      currentFlow = 0.5;
      currentYield = elapsedSec * currentFlow;
    } else if (elapsedSec < 6) {
      // Pressure ramp up: 4-6 seconds, pressure goes to 9 bar, flow increases
      setStatus("Ramp-up pritiska...");
      const rampProgress = (elapsedSec - 4) / 2;
      currentPressure = 2.5 + rampProgress * 6.5;
      currentFlow = 0.5 + rampProgress * 1.5;
      currentYield = 2.0 + (elapsedSec - 4) * currentFlow;
    } else if (elapsedSec < 22) {
      // Main extraction: 6-22 seconds, steady 9 bar, constant flow
      setStatus("Optimalna ekstrakcija");
      // Add slight organic fluctuations in pressure (±0.12 bar)
      const fluctuation = Math.sin(time / 150) * 0.12;
      currentPressure = 9.0 + fluctuation;
      currentFlow = 1.8 + Math.cos(time / 200) * 0.05;
      // Yield increases linearly
      currentYield = 5.0 + (elapsedSec - 6) * 1.8;
    } else {
      // Tail end: 22-25 seconds, pressure drops slightly as puck degrades, blonding phase
      setStatus("Završna faza");
      const tailProgress = (elapsedSec - 22) / 3;
      currentPressure = 9.0 - tailProgress * 2.0;
      currentFlow = 1.8 + tailProgress * 0.4; // flow rises slightly as puck resistance drops
      currentYield = 33.8 + (elapsedSec - 22) * currentFlow;
    }

    setPressure(currentPressure);
    setFlowRate(currentFlow);
    setYieldWeight(Math.min(currentYield, 36.0));

    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    return () => {
      isExtractingRef.current = false;
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  // Format time to SS.m
  const formatTime = (ms: number) => {
    const totalSec = ms / 1000;
    return totalSec.toFixed(1) + " s";
  };

  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-card p-6 md:p-8 shadow-xl backdrop-blur-xl">
      <div className="mb-4 flex items-center gap-2">
        <Activity className="h-5 w-5 text-primary" />
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
          Barista Simulator Ekstrakcije
        </span>
      </div>

      <h3 className="mb-6 text-center font-display text-2xl font-bold tracking-tight text-card-foreground">
        Ekstrakcija pod pritiskom od 9 Bara
      </h3>

      <div className="grid gap-8 md:grid-cols-[auto_1fr] md:items-center">
        {/* SVG Pressure Gauge Dial */}
        <div className="relative flex justify-center">
          <svg
            className="h-48 w-48 drop-shadow-[0_0_15px_rgba(0,91,255,0.15)]"
            viewBox="0 0 200 200"
          >
            {/* Outer metallic ring */}
            <circle
              cx="100"
              cy="100"
              r="92"
              fill="none"
              stroke="var(--color-border)"
              strokeWidth="4"
            />
            <circle cx="100" cy="100" r="88" fill="var(--color-background)" />

            {/* Optimal zone arc (8 to 10 bar) */}
            {/* 8 bar = -120 + (8/12)*240 = 40deg, 10 bar = -120 + (10/12)*240 = 80deg */}
            {/* Using SVG arc path for 40 to 80 degrees */}
            <path
              d="M 154.6 154.6 A 78 78 0 0 1 178 100"
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="6"
              strokeLinecap="round"
              className="opacity-40"
            />
            {/* A glowing highlight zone */}
            <path
              d="M 154.6 154.6 A 78 78 0 0 1 178 100"
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Gauge Ticks & Numbers */}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((val) => {
              const angle = -120 + (val / 12) * 240;
              const angleRad = (angle * Math.PI) / 180;

              // Tick marks
              const x1 = 100 + 78 * Math.cos(angleRad);
              const y1 = 100 + 78 * Math.sin(angleRad);
              const x2 = 100 + (val % 3 === 0 ? 68 : 72) * Math.cos(angleRad);
              const y2 = 100 + (val % 3 === 0 ? 68 : 72) * Math.sin(angleRad);

              // Numbers position
              const tx = 100 + 56 * Math.cos(angleRad);
              const ty = 100 + 56 * Math.sin(angleRad);

              const isOptimal = val >= 8 && val <= 10;

              return (
                <g key={val}>
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={isOptimal ? "var(--color-primary)" : "var(--color-border)"}
                    strokeWidth={val % 3 === 0 ? "2" : "1"}
                  />
                  {val % 2 === 0 && (
                    <text
                      x={tx}
                      y={ty}
                      fill={
                        isOptimal ? "var(--color-card-foreground)" : "var(--color-muted-foreground)"
                      }
                      fontSize="9"
                      fontWeight={isOptimal ? "bold" : "normal"}
                      fontFamily="var(--font-sans)"
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      {val}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Center Text label */}
            <text
              x="100"
              y="135"
              fill="var(--color-muted-foreground)"
              fontSize="10"
              fontWeight="bold"
              fontFamily="var(--font-mono)"
              letterSpacing="2"
              textAnchor="middle"
            >
              BAR
            </text>
            <text
              x="100"
              y="150"
              fill="var(--color-primary)"
              fontSize="14"
              fontWeight="bold"
              fontFamily="var(--font-mono)"
              textAnchor="middle"
            >
              {pressure.toFixed(1)}
            </text>

            {/* Needle */}
            <g
              style={{
                transform: `rotate(${needleRotation}deg)`,
                transformOrigin: "100px 100px",
                transition: isExtracting
                  ? "transform 0.1s linear"
                  : "transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            >
              <line
                x1="100"
                y1="100"
                x2="100"
                y2="22"
                stroke="var(--color-accent)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {/* Tail of the needle */}
              <line
                x1="100"
                y1="100"
                x2="100"
                y2="115"
                stroke="var(--color-accent)"
                strokeWidth="1.5"
              />
            </g>

            {/* Center Cap */}
            <circle cx="100" cy="100" r="8" fill="var(--color-accent)" />
            <circle cx="100" cy="100" r="4" fill="var(--color-background)" />
          </svg>
        </div>

        {/* Real-time stats */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-border/60 bg-background/50 p-3 flex flex-col justify-between">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                <Coffee className="h-3 w-3 text-primary" />
                Vreme
              </span>
              <span className="font-mono text-lg font-bold text-card-foreground mt-1">
                {formatTime(timer)}
              </span>
            </div>

            <div className="border border-border/60 bg-background/50 p-3 flex flex-col justify-between">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                <Droplets className="h-3 w-3 text-primary" />
                Prinos (Yield)
              </span>
              <span className="font-mono text-lg font-bold text-card-foreground mt-1">
                {yieldWeight.toFixed(1)} g
              </span>
            </div>

            <div className="border border-border/60 bg-background/50 p-3 flex flex-col justify-between">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Protok (Flow)
              </span>
              <span className="font-mono text-lg font-bold text-card-foreground mt-1">
                {flowRate.toFixed(1)} ml/s
              </span>
            </div>

            <div className="border border-border/60 bg-background/50 p-3 flex flex-col justify-between">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Status profila
              </span>
              <span className="font-mono text-[11px] font-bold text-primary uppercase mt-1 truncate">
                {status}
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            {!isExtracting ? (
              <button
                type="button"
                onClick={startExtraction}
                className="flex flex-1 items-center justify-center gap-2 bg-primary py-3 px-4 font-mono text-xs font-bold uppercase tracking-wider text-primary-foreground transition-all hover:bg-accent hover:cursor-pointer"
              >
                <Play className="h-4 w-4 fill-current" />
                Pokreni Ekstrakciju
              </button>
            ) : (
              <button
                type="button"
                onClick={stopExtraction}
                className="flex flex-1 items-center justify-center gap-2 bg-destructive py-3 px-4 font-mono text-xs font-bold uppercase tracking-wider text-destructive-foreground transition-all hover:bg-destructive/80 hover:cursor-pointer"
              >
                <Square className="h-4 w-4 fill-current" />
                Prekini
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Profile info label */}
      <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground max-w-sm">
        Ovaj profil simulira pred-infuziju na 2 bar pritiska za ravnomerno natapanje kafe, nakon
        čega pritisak raste na optimalnih 9 bar, dajući savršen espresso šot od 36g.
      </p>
    </div>
  );
}
