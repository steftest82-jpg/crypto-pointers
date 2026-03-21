"use client";

import { useState, useEffect } from 'react';
import type { FC } from 'react';

interface TOCItem {
  heading: string;
  anchor: string;
}

interface TableOfContentsProps {
  items: TOCItem[];
}

const TableOfContents: FC<TableOfContentsProps> = ({ items }) => {
  const [activeAnchor, setActiveAnchor] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    const headingElements = items
      .map((item) => document.getElementById(item.anchor))
      .filter(Boolean) as HTMLElement[];

    if (headingElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveAnchor(entry.target.id);
          }
        }
      },
      {
        rootMargin: '-100px 0px -70% 0px',
        threshold: 0,
      }
    );

    headingElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav
      className="card p-5"
      aria-label="Table of contents"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-left group"
        aria-expanded={isExpanded}
      >
        <h2 className="text-[11px] font-extrabold uppercase tracking-widest text-primary">
          In This Article
        </h2>
        <svg
          className={`w-4 h-4 text-text/30 group-hover:text-primary transition-all duration-200 ${
            isExpanded ? 'rotate-180' : 'rotate-0'
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${
          isExpanded ? 'max-h-[600px] opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
        }`}
      >
        <ul className="space-y-1">
          {items.map((item, index) => {
            const isActive = activeAnchor === item.anchor;
            return (
              <li key={item.anchor}>
                <a
                  href={`#${item.anchor}`}
                  className={`flex items-start gap-2.5 px-3 py-2 rounded-lg text-sm leading-snug transition-all duration-200 ${
                    isActive
                      ? 'bg-primary/5 text-primary font-semibold'
                      : 'text-text/50 hover:text-primary hover:bg-primary/5'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById(item.anchor);
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      setActiveAnchor(item.anchor);
                    }
                  }}
                >
                  <span
                    className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold flex-shrink-0 transition-colors duration-200 ${
                      isActive
                        ? 'bg-primary text-white'
                        : 'bg-accent/20 text-text/40'
                    }`}
                  >
                    {index + 1}
                  </span>
                  <span>{item.heading}</span>
                </a>
              </li>
            );
          })}
        </ul>

        {/* Progress indicator */}
        <div className="mt-4 pt-3 border-t border-accent/15">
          <div className="flex items-center justify-between text-[10px] text-text/30 font-medium">
            <span>{items.length} sections</span>
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Scroll to navigate
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TableOfContents;
