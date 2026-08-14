"use client";

import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

export default function Reveal({ children, className = "", delay = 0, y = 24 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const style: CSSProperties = {
    transitionDelay: `${delay}ms`,
    ...(visible ? {} : { transform: `translateY(${y}px)` }),
  };

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
