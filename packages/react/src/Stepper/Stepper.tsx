import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { Check, X } from 'lucide-react';
import './Stepper.css';

export type StepStatus = 'complete' | 'current' | 'upcoming' | 'error';

export interface StepperStep {
  label: ReactNode;
  description?: ReactNode;
  /** Marks a step with a problem. Other statuses come from `current`. */
  error?: boolean;
  /** Icon for the step, shown with marker="icon". */
  icon?: ReactNode;
}

export interface StepperProps extends HTMLAttributes<HTMLOListElement> {
  /** The steps, in order. */
  steps: StepperStep[];
  /** Index of the current step (0-based). Earlier steps are complete. */
  current: number;
  /** `horizontal` (default) for a few short steps; `vertical` for many or long ones. */
  orientation?: 'horizontal' | 'vertical';
  /** What marks each step: `number` (default), `icon` (each step's icon in a tile), `dot`. */
  marker?: 'number' | 'icon' | 'dot';
  /** `small` for compact flows and dialogs, `medium` (default). */
  size?: 'small' | 'medium';
  /** Lets people go back to a completed step by clicking it. */
  onStepClick?: (index: number) => void;
  /** Words announced for each status, for translation. */
  statusLabels?: Partial<Record<StepStatus, string>>;
  /** Names the list, e.g. "Checkout steps". */
  'aria-label': string;
}

const defaultLabels: Record<StepStatus, string> = {
  complete: 'completed',
  current: 'current step',
  upcoming: 'not started',
  error: 'has a problem',
};

/** Shows progress through a multi-step task, such as checkout, and which step is current. */
export const Stepper = forwardRef<HTMLOListElement, StepperProps>(
  (
    {
      steps,
      current,
      orientation = 'horizontal',
      marker = 'number',
      size = 'medium',
      onStepClick,
      statusLabels,
      className,
      ...props
    },
    ref,
  ) => {
    const labels = { ...defaultLabels, ...statusLabels };
    return (
      <ol
        ref={ref}
        className={[
          'ds-stepper',
          `ds-stepper--${orientation}`,
          marker !== 'number' && `ds-stepper--${marker}`,
          size === 'small' && 'ds-stepper--small',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        {steps.map((step, i) => {
          const status: StepStatus = step.error
            ? 'error'
            : i < current
              ? 'complete'
              : i === current
                ? 'current'
                : 'upcoming';
          const indicator =
            marker === 'dot' ? null : marker === 'icon' && step.icon ? (
              step.icon
            ) : status === 'complete' ? (
              <Check />
            ) : status === 'error' ? (
              <X />
            ) : (
              <span>{i + 1}</span>
            );
          const body = (
            <>
              <span className="ds-stepper__indicator" aria-hidden="true">
                {indicator}
              </span>
              <span className="ds-stepper__text">
                <span className="ds-stepper__label">
                  {step.label}
                  <span className="ds-stepper__status">, {labels[status]}</span>
                </span>
                {step.description && (
                  <span className="ds-stepper__description">{step.description}</span>
                )}
              </span>
            </>
          );
          return (
            <li
              key={i}
              className={`ds-stepper__step ds-stepper__step--${status}`}
              aria-current={status === 'current' ? 'step' : undefined}
            >
              {onStepClick && status === 'complete' ? (
                <button type="button" className="ds-stepper__button" onClick={() => onStepClick(i)}>
                  {body}
                </button>
              ) : (
                <div className="ds-stepper__button">{body}</div>
              )}
            </li>
          );
        })}
      </ol>
    );
  },
);
Stepper.displayName = 'Stepper';
