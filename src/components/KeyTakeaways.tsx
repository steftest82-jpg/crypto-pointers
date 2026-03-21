import type { FC } from 'react';

interface KeyTakeawaysProps {
  takeaways: string[];
}

const KeyTakeaways: FC<KeyTakeawaysProps> = ({ takeaways }) => {
  if (!takeaways || takeaways.length === 0) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent/15 via-primary/5 to-accent/10 border border-accent/25 p-6 md:p-8">
      {/* Decorative corner element */}
      <div
        className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-accent/10 blur-2xl"
        aria-hidden="true"
      />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center flex-shrink-0 shadow-glow-primary">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-text">
              Key Takeaways
            </h2>
            <p className="text-[11px] text-text/45 font-medium">
              The most important points from this article
            </p>
          </div>
        </div>

        <ul className="space-y-3">
          {takeaways.map((takeaway, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="mt-0.5 w-6 h-6 rounded-lg bg-primary/15 text-primary text-xs font-extrabold flex items-center justify-center flex-shrink-0">
                {index + 1}
              </span>
              <span className="text-sm text-text/75 leading-relaxed">
                {takeaway}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default KeyTakeaways;
