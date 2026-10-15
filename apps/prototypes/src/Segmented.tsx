import { useState } from 'react';
import { Tab, TabList, Tabs } from '@ds/react';

/**
 * Pick one of a few options, e.g. Day / Week / Month: the design system's segmented Tabs with
 * just the tab row. Options are values, or [value, label] pairs.
 */
export function Segmented<V extends string>({
  label,
  options,
  value,
  defaultValue,
  onChange,
  size = 'small',
  className,
}: {
  label: string;
  options: readonly (V | readonly [V, string])[];
  value?: V;
  defaultValue?: V;
  onChange?: (value: V) => void;
  size?: 'small' | 'medium';
  className?: string;
}) {
  const items = options.map((o) => (typeof o === 'string' ? ([o, o] as const) : o));
  const [own, setOwn] = useState<V>(defaultValue ?? items[0][0]);
  const current = value ?? own;
  return (
    <Tabs
      appearance="segmented"
      panels={false}
      size={size}
      value={current}
      onValueChange={(v) => {
        setOwn(v as V);
        onChange?.(v as V);
      }}
      className={className}
    >
      <TabList label={label} className="segmented__list">
        {items.map(([v, l]) => (
          <Tab key={v} value={v}>
            {l}
          </Tab>
        ))}
      </TabList>
    </Tabs>
  );
}
