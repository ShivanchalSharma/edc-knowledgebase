export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 -ml-3 ${className}`}>
      <img src="/eDC-icon.png" alt="eDC" className="h-12 w-auto object-contain" />
      <span className="font-bold tracking-tight text-2xl leading-none">
        {/* literal white — the theme's --foreground token resolved to a
            low-contrast violet against this dark background */}
        <span className="text-black">Knowledgebase</span>
      </span>
    </div>
  );
}
