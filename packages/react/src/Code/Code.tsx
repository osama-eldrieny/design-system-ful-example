import { forwardRef, useState, type HTMLAttributes } from 'react';
import { Check, Copy } from 'lucide-react';
import { Tab, TabList, TabPanel, Tabs } from '../Tabs';
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

export interface CodeTabsProps extends HTMLAttributes<HTMLDivElement> {
  /** One tab per variant, e.g. npm / pnpm / yarn, or one per file. */
  tabs: { label: string; code: string; language?: string }[];
  /** What the tabs switch between, e.g. "Package manager". Names the tab list. */
  label: string;
  /** Tab shown first. Default the first. */
  defaultTab?: string;
  /** Accessible name of each copy button. Default "Copy code". */
  copyLabel?: string;
}

/** The same snippet in a few variants, e.g. per package manager or per file, one tab each. */
export const CodeTabs = forwardRef<HTMLDivElement, CodeTabsProps>(
  ({ tabs, label, defaultTab, copyLabel, className, ...props }, ref) => (
    <div ref={ref} className={['ds-code-tabs', className].filter(Boolean).join(' ')} {...props}>
      <Tabs appearance="line" size="small" defaultValue={defaultTab ?? tabs[0]?.label}>
        <TabList label={label}>
          {tabs.map((t) => (
            <Tab key={t.label} value={t.label}>
              {t.label}
            </Tab>
          ))}
        </TabList>
        {tabs.map((t) => (
          <TabPanel key={t.label} value={t.label} className="ds-code-tabs__panel">
            <Code block language={t.language} copyLabel={copyLabel}>
              {t.code}
            </Code>
          </TabPanel>
        ))}
      </Tabs>
    </div>
  ),
);
CodeTabs.displayName = 'CodeTabs';
