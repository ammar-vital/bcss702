'use client';

import { useEffect, useRef, useState } from 'react';

import { stats } from '@/data/home';

/** The theme counted up over 60 steps of 20ms; keep the same cadence. */
const STEPS = 60;
const STEP_MS = 20;

/**
 * Counts each stat up when the band scrolls into view. The final values are
 * rendered on the server, so the numbers are correct without JavaScript and
 * for crawlers; the count-up only starts once the observer fires.
 */
export function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(STEPS);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // Already on screen: leave the server-rendered final values in place rather
    // than flashing zeros while the count-up runs.
    if (node.getBoundingClientRect().top < window.innerHeight) return;

    setStep(0);
    let timer: ReturnType<typeof setInterval> | undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          timer = setInterval(() => {
            setStep((current) => {
              if (current >= STEPS) {
                clearInterval(timer);
                return STEPS;
              }
              return current + 1;
            });
          }, STEP_MS);
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (timer) clearInterval(timer);
    };
  }, []);

  return (
    <div className="stats" ref={ref}>
      <div className="stats-inner">
        {stats.map((stat, index) => (
          <div
            className={`stat-item${index < stats.length - 1 ? ' stat-divider' : ''}`}
            key={stat.label}
          >
            <div className="stat-num">
              {Math.floor((stat.value * step) / STEPS)}
              {stat.suffix}
            </div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
