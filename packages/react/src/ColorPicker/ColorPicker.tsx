import { forwardRef, useId, useState, type HTMLAttributes } from 'react';
import { Check } from 'lucide-react';
import './ColorPicker.css';

export interface ColorSwatch {
  /** Any CSS color, usually hex, e.g. "#2563eb". */
  value: string;
  /** Spoken name, e.g. "Blue". */
  name: string;
}

export type ColorPickerSize = 'small' | 'medium';

export interface ColorPickerProps extends Omit<HTMLAttributes<HTMLFieldSetElement>, 'defaultValue' | 'onChange'> {
  /** Names the choice, e.g. "Label color". Shown as the legend. */
  label: string;
  /** Colors to choose from. */
  swatches: ColorSwatch[];
  /** The chosen color (controlled). */
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Adds a "Custom" swatch that opens the system color picker. */
  allowCustom?: boolean;
  /** Words for the custom swatch. Default "Custom color". */
  customLabel?: string;
  /** Hides the legend visually (it is still announced). */
  hideLabel?: boolean;
  /** `small` in menus and toolbars, `medium` (default). */
  size?: ColorPickerSize;
  disabled?: boolean;
}

/**
 * A set of color swatches to choose one from, with an optional custom color. Swatches are
 * native radio inputs, so arrow keys move between them.
 */
export const ColorPicker = forwardRef<HTMLFieldSetElement, ColorPickerProps>(
  (
    {
      label,
      swatches,
      value,
      defaultValue,
      onValueChange,
      allowCustom = false,
      customLabel = 'Custom color',
      hideLabel = false,
      size = 'medium',
      disabled,
      className,
      ...props
    },
    ref,
  ) => {
    const [own, setOwn] = useState(defaultValue ?? swatches[0]?.value ?? '');
    const current = value ?? own;
    const name = useId();
    const choose = (next: string) => {
      setOwn(next);
      onValueChange?.(next);
    };
    const custom = allowCustom && !swatches.some((s) => s.value.toLowerCase() === current.toLowerCase());

    return (
      <fieldset
        ref={ref}
        disabled={disabled}
        className={['ds-color-picker', `ds-color-picker--${size}`, className].filter(Boolean).join(' ')}
        {...props}
      >
        <legend className={hideLabel ? 'ds-color-picker__legend ds-color-picker__legend--hidden' : 'ds-color-picker__legend'}>
          {label}
        </legend>
        <div className="ds-color-picker__swatches">
          {swatches.map((swatch) => {
            const checked = swatch.value.toLowerCase() === current.toLowerCase();
            return (
              <label key={swatch.value} className="ds-color-picker__swatch" title={swatch.name}>
                <input
                  type="radio"
                  className="ds-color-picker__input"
                  name={name}
                  value={swatch.value}
                  checked={checked}
                  aria-label={swatch.name}
                  onChange={() => choose(swatch.value)}
                />
                <span className="ds-color-picker__color" style={{ background: swatch.value }} aria-hidden="true">
                  {checked && <Check className="ds-color-picker__check" />}
                </span>
              </label>
            );
          })}
          {allowCustom && (
            <label className="ds-color-picker__swatch ds-color-picker__swatch--custom" title={customLabel}>
              <input
                type="color"
                className="ds-color-picker__input"
                aria-label={customLabel}
                value={/^#[0-9a-f]{6}$/i.test(current) ? current : '#000000'}
                onChange={(e) => choose(e.target.value)}
              />
              <span
                className="ds-color-picker__color ds-color-picker__color--custom"
                style={custom ? { background: current } : undefined}
                aria-hidden="true"
              >
                {custom && <Check className="ds-color-picker__check" />}
              </span>
            </label>
          )}
        </div>
      </fieldset>
    );
  },
);
ColorPicker.displayName = 'ColorPicker';
