import type { ReactNode } from "react";

const BULLET = /^(?:[-*•] |\d+\. )/;

function inline(text: string): ReactNode[] {
  // Handles [label](url), **bold** and bare http(s) URLs.
  return text.split(/(\[[^\]]+\]\(https?:\/\/[^\s)]+\)|\*\*[^*]+\*\*|https?:\/\/[^\s)]+)/g).map((chunk, i) => {
    const link = chunk.match(/^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/);
    if (link) {
      return (
        <a key={i} href={link[2]} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
          {link[1].replace(/^https?:\/\//, "")}
        </a>
      );
    }
    if (chunk.startsWith("**") && chunk.endsWith("**")) return <strong key={i}>{chunk.slice(2, -2)}</strong>;
    if (/^https?:\/\//.test(chunk)) {
      // Trailing sentence punctuation belongs to the prose, not the URL.
      const url = chunk.replace(/[.,;:!?]+$/, "");
      const tail = chunk.slice(url.length);
      return (
        <span key={i}>
          <a href={url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
            {url.replace(/^https?:\/\//, "")}
          </a>
          {tail}
        </span>
      );
    }
    return chunk;
  });
}

function block(raw: string, key: number): ReactNode {
  const text = raw.trim();
  if (!text) return null;

  if (text.startsWith("### ")) return <h3 key={key}>{inline(text.slice(4))}</h3>;
  if (text.startsWith("## ")) return <h2 key={key}>{inline(text.slice(3))}</h2>;

  const lines = text.split("\n");
  const isUl = lines.every((l) => /^[-*•] /.test(l));
  const isOl = lines.every((l) => /^\d+\. /.test(l));

  if (isUl || isOl) {
    const Tag = isUl ? "ul" : "ol";
    return (
      <Tag key={key}>
        {lines.map((l, i) => (
          <li key={i}>{inline(l.replace(BULLET, ""))}</li>
        ))}
      </Tag>
    );
  }

  // A paragraph followed directly by list lines (no blank line between).
  const firstList = lines.findIndex((l) => BULLET.test(l));
  if (firstList > 0) {
    return (
      <div key={key} className="contents">
        {block(lines.slice(0, firstList).join("\n"), key * 10)}
        {block(lines.slice(firstList).join("\n"), key * 10 + 1)}
      </div>
    );
  }

  return <p key={key}>{inline(text)}</p>;
}

export default function Markdown({ source, className }: { source: string; className?: string }) {
  const nodes = source.split(/\n\s*\n/).map((chunk, i) => block(chunk, i));
  return className ? <div className={className}>{nodes}</div> : <>{nodes}</>;
}
