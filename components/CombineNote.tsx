import { getTranslations } from "next-intl/server";

function IconCombine() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 7h3.6c1.2 0 2.3.6 3 1.6l4.8 6.8c.7 1 1.8 1.6 3 1.6H21M3 17h3.6c1.2 0 2.3-.6 3-1.6l1.2-1.7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.4 14.4 21 17l-2.6 2.6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Izdvojena napomena da se aranžmani mogu kombinovati — rafting i kanjoning ture. */
export async function CombineNote({ className = "" }: { className?: string }) {
  const tTD = await getTranslations("TuraDetalj");

  return (
    <div
      className={`flex items-start gap-3.5 rounded-card border border-mint-border bg-mint-surface p-4 sm:p-5 ${className}`}
    >
      <span className="mt-px shrink-0 text-teal" aria-hidden="true">
        <IconCombine />
      </span>
      <p className="font-sans text-[15px] font-semibold leading-[1.6] text-pine">
        {tTD("ui.combineNote")}
      </p>
    </div>
  );
}
