import React from 'react';

// Subscript & Superscript mapping for Chemistry
const SUB_MAP: Record<string, string> = {
  '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄',
  '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉',
  '+': '₊', '-': '₋', '=': '₌', '(': '₍', ')': '₎',
  'a': 'ₐ', 'e': 'ₑ', 'h': 'ₕ', 'i': 'ᵢ', 'j': 'ⱼ',
  'k': 'ₖ', 'l': 'ₗ', 'm': 'ₘ', 'n': 'ₙ', 'o': 'ₒ',
  'p': 'ₚ', 'r': 'ᵣ', 's': 'ₛ', 't': 'ₜ', 'u': 'ᵤ',
  'v': 'ᵥ', 'x': 'ₓ'
};

const SUP_MAP: Record<string, string> = {
  '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
  '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
  '+': '⁺', '-': '⁻', '=': '⁼', '(': '⁽', ')': '⁾',
  'n': 'ⁿ'
};

export function toSubscript(str: string): string {
  return str.split('').map(c => SUB_MAP[c] || c).join('');
}

export function toSuperscript(str: string): string {
  return str.split('').map(c => SUP_MAP[c] || c).join('');
}

/**
 * Clean all LaTeX formulas, LaTeX arrows, raw markers into pristine Unicode chemistry text.
 */
export function sanitizeChemistryText(rawText: string): string {
  if (!rawText) return '';

  let text = rawText;

  // 1. Convert LaTeX arrows & common math symbols
  text = text
    .replace(/\\rightleftharpoons|\\leftrightharpoons|\\leftrightarrow/g, ' ⇌ ')
    .replace(/\\rightarrow|\\to|\\longrightarrow/g, ' → ')
    .replace(/\\leftarrow|\\longleftarrow/g, ' ← ')
    .replace(/\\uparrow/g, ' ↑ ')
    .replace(/\\downarrow/g, ' ↓ ')
    .replace(/\\times/g, ' × ')
    .replace(/\\cdot/g, ' · ')
    .replace(/\\pm/g, ' ± ')
    .replace(/\\approx/g, ' ≈ ')
    .replace(/\\neq/g, ' ≠ ')
    .replace(/\\leq|\\le/g, ' ≤ ')
    .replace(/\\geq|\\ge/g, ' ≥ ')
    .replace(/\\Delta/g, 'Δ')
    .replace(/\\degree|\\circ/g, '°');

  // 2. Remove LaTeX wrappers like \text{...}, \mathrm{...}, \mathbf{...}, \ce{...}
  text = text
    .replace(/\\(?:text|mathrm|mathbf|ce|mathit)\{([^}]+)\}/g, '$1')
    .replace(/\\(?:text|mathrm|mathbf|ce|mathit)\s+/g, '');

  // 3. Convert phase states: _{(aq)} -> (aq), _{(s)} -> (s), _{(l)} -> (l), _{(g)} -> (g)
  text = text
    .replace(/_\{(aq)\}|_\(aq\)/gi, ' (aq)')
    .replace(/_\{(s)\}|_\(s\)/gi, ' (s)')
    .replace(/_\{(l)\}|_\(l\)/gi, ' (l)')
    .replace(/_\{(g)\}|_\(g\)/gi, ' (g)');

  // 4. Convert LaTeX Superscripts: ^{2+}, ^{3-}, ^{+} -> ²⁺, ³⁻, ⁺
  text = text.replace(/\^\{([^}]+)\}/g, (_, content) => {
    return toSuperscript(content);
  });
  text = text.replace(/\^([0-9\+\-]+)/g, (_, content) => {
    return toSuperscript(content);
  });

  // 5. Convert LaTeX Subscripts: _{2}, _{3}, _2, _3 -> ₂, ₃
  text = text.replace(/_\{([^}]+)\}/g, (_, content) => {
    return toSubscript(content);
  });
  text = text.replace(/_([0-9]+)/g, (_, content) => {
    return toSubscript(content);
  });

  // 6. Clean escaped brackets and dollar signs
  text = text
    .replace(/\$\$/g, '')
    .replace(/\$/g, '')
    .replace(/\\\[/g, '')
    .replace(/\\\]/g, '')
    .replace(/\\\(/g, '(')
    .replace(/\\\)/g, ')');

  // 7. Clean up triple asterisks: ***text*** -> **text** or ***text:** -> **text:**
  text = text
    .replace(/\*\*\*([^*]+)\*\*\*/g, '**$1**')
    .replace(/\*\*\*([^*]+)\*\*/g, '**$1**')
    .replace(/\*\*([^*]+)\*\*\*/g, '**$1**');

  // 8. Fix stray backslashes
  text = text.replace(/\\/g, '');

  // 9. Normalize multiple spaces around arrows
  text = text
    .replace(/\s*→\s*/g, ' → ')
    .replace(/\s*⇌\s*/g, ' ⇌ ');

  return text.trim();
}

/**
 * Format specifically for WhatsApp (WhatsApp uses single *bold*, no ### headers, no raw markdown artifacts).
 */
export function formatForWhatsApp(rawText: string): string {
  let text = sanitizeChemistryText(rawText);

  // Convert markdown headers: ### Header, ## Header, # Header -> *Header*
  text = text.replace(/^(?:#{1,6})\s*(.+)$/gm, '\n*$1*');

  // Convert bold: **text** -> *text* (WhatsApp bold syntax)
  text = text.replace(/\*\*([^*]+)\*\*/g, '*$1*');

  // Clean horizontal rules
  text = text.replace(/^(?:---+|\*\*\*+|___+)\s*$/gm, '───────────────');

  // Clean excessive empty lines (max 2 consecutive newlines)
  text = text.replace(/\n{3,}/g, '\n\n');

  return text.trim();
}

/**
 * React Component for rendering beautifully formatted chemistry messages on the web
 */
export function FormattedChemistryMessage({ text, isTyping }: { text: string; isTyping?: boolean }) {
  const clean = sanitizeChemistryText(text);
  const lines = clean.split('\n');

  return (
    <div className={`space-y-2 text-xs leading-relaxed ${isTyping ? 'typing-cursor' : ''}`}>
      {lines.map((line, idx) => {
        const trimmed = line.trim();

        // Empty line
        if (!trimmed) {
          return <div key={idx} className="h-1" />;
        }

        // Horizontal Rule
        if (/^(?:---+|\*\*\*+|___+)$/.test(trimmed)) {
          return <hr key={idx} className="my-2 border-slate-200" />;
        }

        // Heading 1, 2, 3: ### or ## or #
        const headerMatch = trimmed.match(/^(#{1,4})\s*(.+)$/);
        if (headerMatch) {
          const content = headerMatch[2];
          return (
            <div key={idx} className="pt-2 pb-1">
              <h4 className="font-black text-slate-900 text-xs sm:text-sm flex items-center gap-1.5 text-emerald-800">
                <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full inline-block shrink-0"></span>
                <span>{renderInlineMarkdown(content)}</span>
              </h4>
            </div>
          );
        }

        // Chemical Equation Line (contains → or ⇌ and chemical formulas)
        const isEquation = (trimmed.includes('→') || trimmed.includes('⇌')) && !trimmed.startsWith('*') && !trimmed.startsWith('•');
        if (isEquation) {
          return (
            <div key={idx} className="my-1.5 p-2 bg-emerald-50/70 border border-emerald-200/80 rounded-lg font-mono text-emerald-950 font-bold text-[11px] sm:text-xs text-center direction-ltr">
              {renderInlineMarkdown(trimmed)}
            </div>
          );
        }

        // Bullet list item (•, -, *)
        const bulletMatch = trimmed.match(/^[\*\-•]\s*(.+)$/);
        if (bulletMatch) {
          return (
            <div key={idx} className="flex items-start gap-2 pr-1">
              <span className="text-emerald-600 font-bold text-sm leading-none mt-0.5">•</span>
              <div className="flex-1 text-slate-800 leading-relaxed">
                {renderInlineMarkdown(bulletMatch[1])}
              </div>
            </div>
          );
        }

        // Numbered list item (1., 2., etc.)
        const numberedMatch = trimmed.match(/^(\d+[\.\)])\s*(.+)$/);
        if (numberedMatch) {
          return (
            <div key={idx} className="flex items-start gap-2 pr-1">
              <span className="font-bold text-emerald-700 text-xs min-w-[18px]">{numberedMatch[1]}</span>
              <div className="flex-1 text-slate-800 leading-relaxed">
                {renderInlineMarkdown(numberedMatch[2])}
              </div>
            </div>
          );
        }

        // Regular paragraph
        return (
          <p key={idx} className="text-slate-800 leading-relaxed">
            {renderInlineMarkdown(trimmed)}
          </p>
        );
      })}
    </div>
  );
}

/**
 * Helper to render inline bold, code, and links
 */
function renderInlineMarkdown(text: string): React.ReactNode {
  // Split by bold (**bold**) and inline code (`code`)
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*([^*]+)\*\*|`([^`]+)`)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    if (match[2]) {
      // Bold text
      parts.push(
        <strong key={match.index} className="font-black text-slate-950">
          {match[2]}
        </strong>
      );
    } else if (match[3]) {
      // Code / Formula text
      parts.push(
        <code key={match.index} className="px-1 py-0.5 bg-slate-100 border border-slate-200 rounded font-mono text-[11px] text-emerald-900 font-bold">
          {match[3]}
        </code>
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}
