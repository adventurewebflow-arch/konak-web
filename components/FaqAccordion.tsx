export interface FaqItem {
  pitanje: string;
  odgovor: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

function IconPlus() {
  return (
    <span
      className="kon-faq-ico relative inline-flex h-6 w-6 shrink-0 items-center justify-center text-terracotta transition-transform duration-200"
      aria-hidden="true"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M8 3v10M3 8h10"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.pitanje,
      acceptedAnswer: { "@type": "Answer", text: it.odgovor },
    })),
  };

  return (
    <div className="kon-faq">
      {items.map((it) => (
        <details
          key={it.pitanje}
          className="border-b border-line last:border-b-0"
        >
          <summary className="flex items-center justify-between gap-4 py-5">
            <span className="font-sans text-base font-bold text-ink">
              {it.pitanje}
            </span>
            <IconPlus />
          </summary>
          <p className="pb-5 font-sans text-[15px] leading-[1.65] text-text-secondary">
            {it.odgovor}
          </p>
        </details>
      ))}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
