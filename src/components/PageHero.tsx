import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
};

export default function PageHero({ eyebrow, title, description, children }: Props) {
  return (
    <section className="border-b border-terra-100 bg-terra-50/60">
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
        {eyebrow && (
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-wide text-terra-600">
              {eyebrow}
            </p>
          </Reveal>
        )}
        <Reveal delay={80}>
          <h1 className="mt-3 font-serif text-3xl font-bold text-night-900 sm:text-4xl">
            {title}
          </h1>
        </Reveal>
        {description && (
          <Reveal delay={160}>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-night-800/70">
              {description}
            </p>
          </Reveal>
        )}
        {children && (
          <Reveal delay={240}>
            <div className="mt-8 flex flex-wrap justify-center gap-3">{children}</div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
