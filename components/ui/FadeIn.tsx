'use client';

import { useEffect, useRef, type ElementType, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

/**
 * Scroll-reveal wrapper replacing the theme's IntersectionObserver snippet.
 *
 * Unlike the original, the content is visible by default and is only hidden
 * ("armed") on mount, and only when it is still below the fold. That keeps the
 * reveal animation for anything the visitor scrolls to while guaranteeing the
 * copy is never invisible to crawlers, to visitors without JavaScript, or
 * during hydration.
 */
export function FadeIn({ children, className, as: Tag = 'div' }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (node.getBoundingClientRect().top < window.innerHeight) return;

    node.classList.add('fade-armed');
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={['fade-in', className].filter(Boolean).join(' ')}>
      {children}
    </Tag>
  );
}
