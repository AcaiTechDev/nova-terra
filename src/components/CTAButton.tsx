import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  external?: boolean;
  className?: string;
};

const variants: Record<string, string> = {
  primary:
    "bg-terra-600 text-white hover:bg-terra-700 shadow-sm shadow-terra-900/10",
  secondary:
    "bg-white text-terra-700 border border-terra-200 hover:bg-terra-50",
  ghost:
    "bg-white/10 text-white border border-white/40 hover:bg-white/20",
};

export default function CTAButton({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
}: Props) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition ${variants[variant]} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
