export default function Lacuna({ children }: { children: React.ReactNode }) {
  return (
    <span className="mt-1 inline-block rounded bg-amber-50 px-2 py-0.5 text-xs font-medium italic text-amber-700 ring-1 ring-amber-200">
      Conteúdo a confirmar: {children}
    </span>
  );
}
