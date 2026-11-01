/**
 * Lightweight, safe Markdown-to-HTML renderer for public pages.
 * Handles paragraphs, headings, lists, blockquotes, inline code,
 * code blocks, links, images, and emphasis without heavy dependencies.
 */
export function renderMarkdown(markdown: string): string {
  if (!markdown) return "";

  // 1. Normalize line endings
  let html = markdown.replace(/\r\n/g, "\n");

  // 2. Escape HTML entities
  html = html
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // 3. Fenced code blocks
  html = html.replace(/```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g, (_, lang, code) => {
    return `<pre class="mdCodeBlock"><code class="language-${lang}">${code.trim()}</code></pre>`;
  });

  // 4. Headings
  html = html
    .replace(/^### (.*$)/gim, '<h3 class="mdH3">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="mdH2">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="mdH1">$1</h1>');

  // 5. Blockquotes
  html = html.replace(/^\> (.*$)/gim, '<blockquote class="mdQuote">$1</blockquote>');

  // 6. Horizontal rules
  html = html.replace(/^---$/gim, '<hr class="mdHr" />');

  // 7. Unordered list items
  html = html.replace(/^\- (.*$)/gim, '<li class="mdLi">$1</li>');
  html = html.replace(/((?:<li class="mdLi">.*<\/li>\s*)+)/gim, '<ul class="mdUl">$1</ul>');

  // 8. Images (must be before links)
  html = html.replace(
    /!\[(.*?)\]\((.*?)\)/gim,
    '<figure class="mdFigure"><img src="$2" alt="$1" class="mdImage" /><figcaption class="mdCaption">$1</figcaption></figure>'
  );

  // 9. Links
  html = html.replace(
    /\[(.*?)\]\((.*?)\)/gim,
    '<a href="$2" class="mdLink" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  // 10. Inline styles: bold, italic, code
  html = html
    .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
    .replace(/__(.*?)__/gim, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/gim, "<em>$1</em>")
    .replace(/_(.*?)_/gim, "<em>$1</em>")
    .replace(/`([^`]+)`/gim, '<code class="mdInlineCode">$1</code>');

  // 11. Paragraphs (blocks separated by two or more newlines)
  const blocks = html.split(/\n\n+/);
  html = blocks
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      // If block starts with a tag that shouldn't be wrapped in <p>, return as-is
      if (/^<(h[1-6]|ul|ol|pre|blockquote|figure|hr)/i.test(trimmed)) {
        return trimmed;
      }
      return `<p class="mdParagraph">${trimmed.replace(/\n/g, "<br />")}</p>`;
    })
    .join("\n");

  return html;
}
