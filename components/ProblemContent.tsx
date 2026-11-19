"use client";

import katex from "katex";
import { useMemo } from "react";
import { cn } from "@/lib/cn";

type ProblemContentProps = {
  content: string;
  className?: string;
};

function renderMath(text: string): string {
  let result = text;
  
  result = result.replace(/\$\$([\s\S]*?)\$\$/g, (_, math) => {
    try {
      return `<div class="ak-math-block">${katex.renderToString(math.trim(), {
        displayMode: true,
        throwOnError: false,
        trust: true,
        strict: false,
      })}</div>`;
    } catch {
      return `<div class="ak-math-block"><code>${math}</code></div>`;
    }
  });
  
  result = result.replace(/\$([^$\n]+?)\$/g, (_, math) => {
    try {
      return katex.renderToString(math.trim(), {
        displayMode: false,
        throwOnError: false,
        trust: true,
        strict: false,
      });
    } catch {
      return `<code>${math}</code>`;
    }
  });
  
  return result;
}

function renderCodeBlocks(text: string): string {
  return text.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
    const language = lang || "text";
    return `<pre class="ak-code-block" data-language="${language}"><code>${escapeHtml(code.trim())}</code></pre>`;
  });
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderInlineCode(text: string): string {
  return text.replace(/`([^`]+)`/g, '<code class="ak-inline-code">$1</code>');
}

function renderFormatting(text: string): string {
  let result = text;
  result = result.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  result = result.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, "<em>$1</em>");
  return result;
}

function renderParagraphs(text: string): string {
  const blocks = text.split(/\n\n+/);
  return blocks
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      if (trimmed.startsWith("<pre") || trimmed.startsWith("<div class=\"ak-math-block\"")) {
        return trimmed;
      }
      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        const items = trimmed.split(/\n/).map((line) => {
          const content = line.replace(/^[-*]\s*/, "");
          return `<li>${content}</li>`;
        });
        return `<ul class="ak-list">${items.join("")}</ul>`;
      }
      if (/^\d+\.\s/.test(trimmed)) {
        const items = trimmed.split(/\n/).map((line) => {
          const content = line.replace(/^\d+\.\s*/, "");
          return `<li>${content}</li>`;
        });
        return `<ol class="ak-list">${items.join("")}</ol>`;
      }
      const withBreaks = trimmed.replace(/\n/g, "<br />");
      return `<p>${withBreaks}</p>`;
    })
    .filter(Boolean)
    .join("\n");
}

export function ProblemContent({ content, className }: ProblemContentProps) {
  const html = useMemo(() => {
    let processed = content;
    processed = renderCodeBlocks(processed);
    processed = renderMath(processed);
    processed = renderInlineCode(processed);
    processed = renderFormatting(processed);
    processed = renderParagraphs(processed);
    return processed;
  }, [content]);

  return (
    <div
      className={cn("ak-problem-content", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
