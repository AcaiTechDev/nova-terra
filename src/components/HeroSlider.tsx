"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import CTAButton from "@/components/CTAButton";

export type HeroSlide = {
  id: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  buttons: {
    label: string;
    href: string;
    variant?: "primary" | "secondary" | "ghost";
    external?: boolean;
  }[];
  image?: { desktop: string; mobile: string; alt: string };
};

const AUTOPLAY_MS = 6500;

export default function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [tick, setTick] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback((index: number) => {
    setActiveIndex((index + slides.length) % slides.length);
    setTick((t) => t + 1);
  }, [slides.length]);

  const next = useCallback(() => goTo(activeIndex + 1), [goTo, activeIndex]);
  const prev = useCallback(() => goTo(activeIndex - 1), [goTo, activeIndex]);

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    const timer = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused, next, slides.length]);

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) {
      delta > 0 ? prev() : next();
    }
    touchStartX.current = null;
  }

  return (
    <section
      className="relative h-[500px] overflow-hidden sm:h-[640px] lg:h-[680px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-roledescription="carrossel"
      aria-label="Destaques da Igreja Nova Terra"
    >
      {slides.map((slide, index) => {
        const isActive = index === activeIndex;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              isActive ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            aria-hidden={!isActive}
          >
            {slide.image ? (
              <div className="absolute inset-0 overflow-hidden bg-night-900">
                <div
                  key={isActive ? `active-${tick}` : "idle"}
                  className={`h-full w-full ${isActive ? "hero-ken-burns" : ""}`}
                >
                  <picture>
                    <source media="(min-width: 768px)" srcSet={slide.image.desktop} />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={slide.image.mobile}
                      alt={slide.image.alt}
                      className="h-full w-full object-cover"
                      loading={index <= 1 ? "eager" : "lazy"}
                    />
                  </picture>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/10" />
              </div>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-terra-50 via-white to-white" />
            )}

            <div className="relative mx-auto flex h-full max-w-3xl flex-col items-center justify-center px-4 text-center sm:px-6">
              {slide.eyebrow && (
                <p
                  className={`text-sm font-semibold uppercase tracking-widest ${
                    slide.image ? "text-terra-300" : "text-terra-600"
                  }`}
                >
                  {slide.eyebrow}
                </p>
              )}
              <h1
                className={`mt-4 font-serif text-3xl font-bold leading-tight sm:text-5xl ${
                  slide.image ? "text-white" : "text-night-900"
                }`}
              >
                {slide.title}
              </h1>
              {slide.subtitle && (
                <p
                  className={`mx-auto mt-6 max-w-2xl text-base leading-relaxed sm:text-lg ${
                    slide.image ? "text-white/85" : "text-night-800/70"
                  }`}
                >
                  {slide.subtitle}
                </p>
              )}
              {slide.buttons.length > 0 && (
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  {slide.buttons.map((btn) => (
                    <CTAButton
                      key={btn.label}
                      href={btn.href}
                      variant={btn.variant ?? "primary"}
                      external={btn.external}
                    >
                      {btn.label}
                    </CTAButton>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}

      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Slide anterior"
            className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition hover:bg-white/30 sm:left-5"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
              <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Próximo slide"
            className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition hover:bg-white/30 sm:right-5"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="absolute inset-x-0 bottom-5 z-10 flex justify-center gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Ir para o slide ${index + 1}`}
                aria-current={index === activeIndex}
                className={`h-2 rounded-full transition-all ${
                  index === activeIndex ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
