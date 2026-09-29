import { forwardRef, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { FormField } from '../FormField';
import './Slider.css';

export interface SliderMark {
  value: number;
  /** Text under the track. Defaults to the formatted value. */
  label?: ReactNode;
}

export interface SliderProps {
  /** What is being set, e.g. "Volume". Always required: it names the slider. */
  label: ReactNode;
  /** Hides the label visually but keeps it for screen readers. */
  hideLabel?: boolean;
  /** Help text under the slider. */
  description?: ReactNode;
  /** Error message. */
  error?: ReactNode;
  /** One number for a single value, two for a range, e.g. [20, 80]. Controlled. */
  value?: number[];
  /** Initial value(s) when uncontrolled. Default [min]. */
  defaultValue?: number[];
  /** Called continuously while dragging. */
  onValueChange?: (value: number[]) => void;
  /** Called once when the person lets go or finishes with the keyboard. */
  onValueCommit?: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  /** Labelled positions under the track, e.g. the ends or common values. */
  marks?: SliderMark[];
  /** Shows the current value(s) next to the label. */
  showValue?: boolean;
  /** Formats values for display and screen readers, e.g. (v) => `$${v}`. */
  formatValue?: (value: number) => string;
  /** Names of the two thumbs in a range, for screen readers. Default ["Minimum", "Maximum"]. */
  thumbLabels?: [string, string];
  disabled?: boolean;
  /** Form field name; each value is submitted. */
  name?: string;
  id?: string;
  className?: string;
}

/**
 * Picks a number, or a range, by dragging along a track. Arrow keys step, Page Up/Down
 * step by ten, Home/End jump to the ends.
 */
export const Slider = forwardRef<HTMLSpanElement, SliderProps>(
  (
    {
      label,
      hideLabel,
      description,
      error,
      value,
      defaultValue,
      onValueChange,
      onValueCommit,
      min = 0,
      max = 100,
      step = 1,
      marks,
      showValue = false,
      formatValue = String,
      thumbLabels = ['Minimum', 'Maximum'],
      disabled,
      name,
      id,
      className,
    },
    ref,
  ) => {
    const [uncontrolled, setUncontrolled] = useState(defaultValue ?? [min]);
    // Radix needs the direction as a prop; take it from the page (e.g. Arabic sets dir="rtl").
    const probe = useRef<HTMLSpanElement>(null);
    const [dir, setDir] = useState<'ltr' | 'rtl'>('ltr');
    useLayoutEffect(() => {
      const found = probe.current?.closest('[dir]')?.getAttribute('dir');
      setDir(found === 'rtl' ? 'rtl' : 'ltr');
    }, []);
    const current = value ?? uncontrolled;
    const range = current.length > 1;
    const percent = (v: number) => ((v - min) / (max - min)) * 100;

    return (
      <FormField
        id={id}
        label={label}
        hideLabel={hideLabel}
        description={description}
        error={error}
        disabled={disabled}
        className={['ds-slider', className].filter(Boolean).join(' ')}
      >
        {(control, { labelId }) => (
          <>
            <span ref={probe} hidden />
            {showValue && (
              <output className="ds-slider__value" htmlFor={control.id} aria-live="off">
                {current.map(formatValue).join(' – ')}
              </output>
            )}
            <SliderPrimitive.Root
              ref={ref}
              className="ds-slider__root"
              dir={dir}
              value={value}
              defaultValue={value ? undefined : current}
              onValueChange={(next) => {
                setUncontrolled(next);
                onValueChange?.(next);
              }}
              onValueCommit={onValueCommit}
              min={min}
              max={max}
              step={step}
              disabled={disabled}
              name={name}
            >
              <SliderPrimitive.Track className="ds-slider__track">
                <SliderPrimitive.Range className="ds-slider__range" />
              </SliderPrimitive.Track>
              {current.map((v, i) => (
                <SliderPrimitive.Thumb
                  key={i}
                  id={i === 0 ? control.id : undefined}
                  className="ds-slider__thumb"
                  aria-labelledby={range ? `${labelId} ${control.id}-thumb-${i}` : labelId}
                  aria-describedby={control['aria-describedby']}
                  aria-invalid={control['aria-invalid']}
                  aria-valuetext={formatValue(v)}
                >
                  {range && (
                    <span className="ds-slider__hidden" id={`${control.id}-thumb-${i}`}>
                      {thumbLabels[i]}
                    </span>
                  )}
                </SliderPrimitive.Thumb>
              ))}
            </SliderPrimitive.Root>
            {marks && marks.length > 0 && (
              <div className="ds-slider__marks" aria-hidden="true">
                {marks.map((mark) => (
                  <span
                    key={mark.value}
                    className="ds-slider__mark"
                    style={{ insetInlineStart: `${percent(mark.value)}%` }}
                  >
                    {mark.label ?? formatValue(mark.value)}
                  </span>
                ))}
              </div>
            )}
          </>
        )}
      </FormField>
    );
  },
);
Slider.displayName = 'Slider';
