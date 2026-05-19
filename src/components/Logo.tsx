export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg width="38" height="38" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="vcGold" x1="0" y1="0" x2="40" y2="40">
            <stop offset="0%" stopColor="#F5E6C8" />
            <stop offset="60%" stopColor="#C8A97E" />
            <stop offset="100%" stopColor="#8E7048" />
          </linearGradient>
        </defs>
        <path
          d="M6 8 L14 30 L20 18 L26 30 L34 8"
          stroke="url(#vcGold)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M20 18 C 24 22, 30 22, 34 18"
          stroke="url(#vcGold)"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />
      </svg>
      <span className="font-display text-lg font-semibold tracking-[0.25em] text-foreground">
        VC<span className="text-primary"> · </span>ESTATES
      </span>
    </div>
  );
}
