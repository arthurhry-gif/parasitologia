import React, { useEffect, useState } from "react";

interface CountdownTimerProps {
  targetDateIso: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

function calculateTimeRemaining(targetIso: string): TimeRemaining {
  const targetTime = new Date(targetIso).getTime();
  const now = new Date().getTime();
  const diff = targetTime - now;

  if (isNaN(targetTime) || diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, isExpired: false };
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDateIso,
  size = "md",
  className = ""
}) => {
  const [time, setTime] = useState<TimeRemaining>(() =>
    calculateTimeRemaining(targetDateIso)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(calculateTimeRemaining(targetDateIso));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDateIso]);

  if (time.isExpired) {
    return (
      <div
        id="contador-regressivo-expirado"
        className={`inline-flex items-center justify-center px-6 py-3 rounded-xl bg-red-950/70 border border-red-500/40 text-red-200 font-bold tracking-wide shadow-lg ${className}`}
      >
        <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-500 mr-2 animate-pulse"></span>
        Oferta encerrada
      </div>
    );
  }

  const pad = (n: number) => String(n).padStart(2, "0");

  const units = [
    { label: "DIAS", value: pad(time.days) },
    { label: "HORAS", value: pad(time.hours) },
    { label: "MINUTOS", value: pad(time.minutes) },
    { label: "SEGUNDOS", value: pad(time.seconds) }
  ];

  if (size === "sm") {
    return (
      <div
        id="contador-regressivo-sm"
        className={`inline-flex items-center gap-1.5 font-['Poppins'] font-bold text-sm tracking-tight ${className}`}
      >
        <span className="px-2 py-0.5 rounded bg-amber-950/80 border border-amber-500/30 text-amber-300">
          {pad(time.days)}d
        </span>
        <span className="text-amber-400/60">:</span>
        <span className="px-2 py-0.5 rounded bg-amber-950/80 border border-amber-500/30 text-amber-300">
          {pad(time.hours)}h
        </span>
        <span className="text-amber-400/60">:</span>
        <span className="px-2 py-0.5 rounded bg-amber-950/80 border border-amber-500/30 text-amber-300">
          {pad(time.minutes)}m
        </span>
        <span className="text-amber-400/60">:</span>
        <span className="px-2 py-0.5 rounded bg-amber-950/80 border border-amber-500/30 text-amber-300">
          {pad(time.seconds)}s
        </span>
      </div>
    );
  }

  return (
    <div
      id="contador-regressivo"
      className={`grid grid-cols-4 gap-2 sm:gap-3 max-w-sm mx-auto font-['Poppins'] ${className}`}
    >
      {units.map((unit) => (
        <div
          key={unit.label}
          className="flex flex-col items-center justify-center p-2.5 sm:p-3.5 rounded-xl bg-slate-900/90 border border-amber-500/30 shadow-md backdrop-blur-sm"
        >
          <span className="font-['Poppins'] text-2xl sm:text-3xl font-black text-amber-400 tracking-tight">
            {unit.value}
          </span>
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 mt-0.5">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
};
