import React from 'react';
import { motion } from 'framer-motion';

const metrics = [
  ['Energy', 48],
  ['Sleep', 62],
  ['Hydration', 74],
];

const highlights = [
  ['Baby growth', 'Strong movement'],
  ['Body rhythm', 'Hydration, rest'],
  ['Next visit', 'Glucose screen'],
];

const CareOverviewPanel = ({
  title = 'This week',
  week = 'Week 24',
  trimester = 'Trimester 2',
  summary = 'Clear status, progress, and next actions inside one focused surface.',
  variant = 'compact',
  className = '',
}) => {
  const showMetrics = variant === 'full';

  return (
    <div className={`rounded-[1.9rem] border border-[var(--care-border)] bg-[linear-gradient(160deg,rgba(255,255,255,0.9),rgba(255,244,239,0.88))] p-5 shadow-[var(--care-shadow)] dark:border-white/10 dark:bg-[linear-gradient(160deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] ${className}`}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="theme-accent-text text-[11px] font-semibold uppercase tracking-[0.18em]">{title}</div>
          <div className="mt-2 text-2xl font-semibold text-[var(--care-text)] dark:text-white">{week}</div>
          <div className="mt-1 text-sm text-body">{trimester}</div>
        </div>
        <div className="theme-badge px-3 py-1 text-xs font-semibold">Focused overview</div>
      </div>

      <div className={`mt-5 grid gap-4 ${showMetrics ? 'lg:grid-cols-[1.1fr_0.9fr]' : 'lg:grid-cols-[0.95fr_1.05fr]'}`}>
        {showMetrics && (
          <div className="theme-accent-soft rounded-[1.5rem] border border-white/50 p-4 shadow-sm dark:border-white/10">
            <div className="grid grid-cols-3 gap-3">
              {metrics.map(([label, value], index) => (
                <div key={label} className="rounded-2xl bg-white/80 p-3 text-center shadow-sm dark:bg-white/10">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${value}%` }}
                    transition={{ duration: 0.65, delay: 0.15 + index * 0.07 }}
                    className="theme-accent-gradient mx-auto h-16 w-4 rounded-full"
                  />
                  <div className="mt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--care-text-muted)] dark:text-slate-300">{label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid gap-3">
          <div className="rounded-[1.5rem] bg-white/78 p-4 shadow-sm dark:bg-white/10">
            <div className="theme-accent-text text-[11px] font-semibold uppercase tracking-[0.16em]">Today</div>
            <div className="mt-2 text-lg font-semibold text-[var(--care-text)] dark:text-white">Check-in complete</div>
            <div className="mt-1 text-sm text-body">Mood, sleep, hydration, movement</div>
          </div>
          <div className="rounded-[1.5rem] bg-white/78 p-4 shadow-sm dark:bg-white/10">
            <div className="flex items-center justify-between text-sm text-body">
              <span>Plan progress</span>
              <span className="theme-accent-text font-semibold">78%</span>
            </div>
            <div className="mt-3 h-2.5 rounded-full bg-[var(--care-surface-muted)]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '78%' }}
                transition={{ duration: 0.9 }}
                className="theme-accent-gradient h-2.5 rounded-full"
              />
            </div>
            <div className="mt-3 text-sm text-body">Next reminder: glucose screen this week</div>
          </div>
        </div>
      </div>

      <div className={`mt-4 grid gap-3 ${showMetrics ? 'sm:grid-cols-3' : 'sm:grid-cols-2 xl:grid-cols-3'}`}>
        {highlights.map(([label, value]) => (
          <div key={label} className="rounded-2xl bg-white/84 px-3 py-3 shadow-sm dark:bg-white/10">
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--care-text-muted)] dark:text-slate-300">{label}</div>
            <div className="mt-1 text-sm font-semibold text-[var(--care-text)] dark:text-white">{value}</div>
          </div>
        ))}
      </div>

      <p className="mt-4 text-sm leading-7 text-body">{summary}</p>
    </div>
  );
};

export default CareOverviewPanel;
