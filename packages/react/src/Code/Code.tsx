import { forwardRef, useState, type HTMLAttributes } from 'react';
import { Check, Copy } from 'lucide-react';
import './Code.css';

export interface CodeProps extends HTMLAttributes<HTMLElement> {
  /** The code as text. */
  children: string;
  /** Multi-line code in its own block, with a copy button. Default inline. */
  block?: boolean;
  /** Language, shown above a block and set as data-language, e.g. "tsx". */
  language?: string;
  /** Shows the copy button on a block. Default true. */
  copyable?: boolean;
  /** Accessible name of the copy button. Default "Copy code". */
  copyLabel?: string;
  /** Announced after copying. Default "Copied". */
  copiedLabel?: string;
}

/** Code shown inline in text, or as a block that can be copied. No syntax highlighting. */
export const Code = forwardRef<HTMLElement, CodeProps>(
  (
    {
      children,
      block = false,
      language,
      copyable = true,
      copyLabel = 'Copy code',
      copiedLabel = 'Copied',
      className,
      ...props
    },
    ref,
  ) => {
    const [copied, setCopied] = useState(false);
    if (!block) {
      return (
        <code ref={ref} className={['ds-code', className].filter(Boolean).join(' ')} {...props}>
          {children}
        </code>
      );
    }
    const copy = async () => {
      try {
        await navigator.clipboard.writeText(children);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        setCopied(false);
      }
    };
    return (
      <div className={['ds-code-block', className].filter(Boolean).join(' ')}>
        {(language || copyable) && (
          <div className="ds-code-block__header">
            {language && <span className="ds-code-block__language">{language}</span>}
            {copyable && (
              <button
                type="button"
                className="ds-code-block__copy"
                onClick={copy}
                aria-label={copyLabel}
              >
                {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
              </button>
            )}
            <span className="ds-code-block__status" role="status">
              {copied ? copiedLabel : ''}
            </span>
          </div>
        )}
        {/* Focusable so wide code can be scrolled from the keyboard (axe
            scrollable-region-focusable), which jsx-a11y doesn't know about. */}
        <pre
          className="ds-code-block__pre"
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={0}
          role="group"
          aria-label={language ? `${language} code` : 'Code'}
        >
          <code ref={ref} data-language={language} {...props}>
            {children}
          </code>
        </pre>
      </div>
    );
  },
);
Code.displayName = 'Code';
