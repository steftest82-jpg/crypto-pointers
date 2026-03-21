import type { FC } from 'react';

interface MarkdownRendererProps {
  content: string;
}

function markdownToHtml(md: string): string {
  let html = md;

  // Headers
  html = html.replace(/^### (.+)$/gm, (_, text) => {
    const id = text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
    return `<h3 id="${id}" class="text-xl font-bold text-text mt-8 mb-4 scroll-mt-24">${text}</h3>`;
  });
  html = html.replace(/^## (.+)$/gm, (_, text) => {
    const id = text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
    return `<h2 id="${id}" class="text-2xl font-extrabold text-text mt-10 mb-4 scroll-mt-24">${text}</h2>`;
  });

  // Bold & Italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-accent/30 text-secondary text-sm font-mono">$1</code>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary underline hover:text-secondary transition-colors duration-200">$1</a>');

  // Blockquotes
  html = html.replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-primary pl-4 py-2 my-6 italic text-text/70 bg-accent/10 rounded-r-lg">$1</blockquote>');

  // Unordered lists
  html = html.replace(/^- (.+)$/gm, '<li class="ml-4 text-text/80 leading-relaxed">$1</li>');
  html = html.replace(/(<li[^>]*>.*<\/li>\n?)+/g, (match) => `<ul class="list-disc space-y-2 my-4 pl-4">${match}</ul>`);

  // Paragraphs
  html = html
    .split('\n\n')
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return '';
      if (
        trimmed.startsWith('<h') ||
        trimmed.startsWith('<blockquote') ||
        trimmed.startsWith('<ul') ||
        trimmed.startsWith('<ol') ||
        trimmed.startsWith('<li')
      ) {
        return trimmed;
      }
      return `<p class="text-text/80 leading-relaxed mb-4">${trimmed}</p>`;
    })
    .join('\n');

  return html;
}

const MarkdownRenderer: FC<MarkdownRendererProps> = ({ content }) => {
  const html = markdownToHtml(content);

  return (
    <div
      className="max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default MarkdownRenderer;
