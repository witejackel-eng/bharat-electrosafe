'use client';

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react';

function subscribeToReducedMotion(callback: () => void) {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  mq.addEventListener('change', callback);
  return () => mq.removeEventListener('change', callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getServerSnapshot() {
  return false;
}

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: keyof HTMLElementTagNameMap;
  duration?: number;
  translateY?: number;
  once?: boolean;
}

export function Reveal({
  children,
  className = '',
  delay = 0,
  stagger = 0,
  as: Tag = 'div',
  duration = 600,
  translateY = 20,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [observedVisible, setObservedVisible] = useState(false);
  const prefersReduced = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getServerSnapshot
  );

  // When prefersReduced is true, isVisible should be true (content shown immediately)
  const isVisible = prefersReduced ? true : observedVisible;

  useEffect(() => {
    if (prefersReduced) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setObservedVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setObservedVisible(false);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReduced, once]);

  const totalDelay = delay + stagger;

  const style: React.CSSProperties = prefersReduced
    ? {}
    : {
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : `translateY(${translateY}px)`,
        transition: `opacity ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${totalDelay}ms, transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${totalDelay}ms`,
      };

  return (
    <Tag ref={ref as React.RefObject<HTMLElement>} className={className} style={style}>
      {children}
    </Tag>
  );
}

interface RevealGroupProps {
  children: ReactNode[];
  className?: string;
  staggerInterval?: number;
  as?: keyof HTMLElementTagNameMap;
}

export function RevealGroup({
  children,
  className = '',
  staggerInterval = 80,
  as: Tag = 'div',
}: RevealGroupProps) {
  return (
    <Tag className={className}>
      {children.map((child, i) => (
        <Reveal key={i} stagger={i * staggerInterval}>
          {child}
        </Reveal>
      ))}
    </Tag>
  );
}
