interface ReviewCardProps {
  tekst: string;
  ime: string;
  grad: string;
  ocjena?: number;
}

const AVATAR_BG = ["bg-pine", "bg-terracotta", "bg-teal"];

function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      className={filled ? "text-amber" : "text-line-strong"}
      aria-hidden="true"
    >
      <path
        d="m12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.2l1-5.8-4.3-4.1 5.9-.9L12 3Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ReviewCard({ tekst, ime, grad, ocjena = 5 }: ReviewCardProps) {
  const avatar = AVATAR_BG[(ime.charCodeAt(0) || 0) % AVATAR_BG.length];
  const inicijal = ime.trim().charAt(0).toUpperCase();

  return (
    <article className="rounded-card border border-line bg-surface p-[26px]">
      <div className="flex gap-1" aria-label={`Ocjena ${ocjena} od 5`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} filled={i < ocjena} />
        ))}
      </div>

      <p className="mt-4 font-sans text-[15px] leading-[1.65] text-body">“{tekst}”</p>

      <div className="my-5 h-px bg-line" />

      <div className="flex items-center gap-3">
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display text-base font-bold text-white ${avatar}`}
          aria-hidden="true"
        >
          {inicijal}
        </span>
        <span className="flex flex-col leading-tight">
          <span className="font-sans text-sm font-bold text-ink">{ime}</span>
          <span className="font-sans text-[13px] text-muted">{grad}</span>
        </span>
      </div>
    </article>
  );
}
