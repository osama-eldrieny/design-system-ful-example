import {
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  useContext,
  useId,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  type Ref,
} from 'react';
import './FormField.css';

/** Props FormField gives its control so the label, help text and messages are wired to it. */
export interface FormFieldControlProps {
  id: string;
  'aria-describedby'?: string;
  'aria-invalid'?: true;
  required?: boolean;
  disabled?: boolean;
}

const FormFieldContext = createContext<FormFieldControlProps | null>(null);

/**
 * The control props of the nearest FormField, for building custom controls. Returns null
 * outside a FormField.
 */
export const useFormField = () => useContext(FormFieldContext);

export interface FormFieldProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  /** What the control is for, e.g. "Message". Always required: it names the control. */
  label: ReactNode;
  /** Hides the label visually but keeps it for screen readers. Only when context makes it obvious. */
  hideLabel?: boolean;
  /** Help text, e.g. a format hint. Announced with the control. */
  description?: ReactNode;
  /** Error message. Marks the control invalid and replaces the success message. */
  error?: ReactNode;
  /** Confirmation message, e.g. "Username is available". */
  success?: ReactNode;
  /** Marks the field required: an asterisk after the label and `required` on the control. */
  required?: boolean;
  /** Marks the field optional with text after the label. Use when most fields are required. */
  optional?: boolean;
  /** Text shown for optional fields. Default "(optional)". */
  optionalLabel?: string;
  /** Disables the control (and every control in a group). */
  disabled?: boolean;
  /**
   * For a set of controls answering one question, e.g. checkboxes: renders a fieldset with a
   * legend instead of a label.
   */
  group?: boolean;
  /** Id of the control. Generated when not given. */
  id?: string;
  /**
   * The control. A single element gets the control props (id, aria-describedby,
   * aria-invalid, required, disabled) merged in; or pass a function that receives them.
   */
  children: ReactNode | ((control: FormFieldControlProps, field: { labelId: string }) => ReactNode);
}

/**
 * The label, help text and error or success message around a form control, wired together
 * for assistive technology. Use it to build fields from any control.
 */
export const FormField = forwardRef<HTMLElement, FormFieldProps>(
  (
    {
      label,
      hideLabel = false,
      description,
      error,
      success,
      required,
      optional,
      optionalLabel = '(optional)',
      disabled,
      group = false,
      id,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const autoId = useId();
    const controlId = id ?? autoId;
    // For controls a <label for> can't name (e.g. custom sliders): use aria-labelledby.
    const labelId = `${controlId}-label`;
    const descriptionId = description ? `${controlId}-description` : undefined;
    const messageId = error || success ? `${controlId}-message` : undefined;
    const describedBy = [descriptionId, messageId].filter(Boolean).join(' ') || undefined;

    const control: FormFieldControlProps = {
      id: controlId,
      'aria-describedby': describedBy,
      'aria-invalid': error ? true : undefined,
      required,
      disabled,
    };

    let content: ReactNode;
    if (typeof children === 'function') {
      content = children(control, { labelId });
    } else if (!group && isValidElement(children)) {
      const child = children as ReactElement<Record<string, unknown>>;
      content = cloneElement(child, {
        ...control,
        ...Object.fromEntries(
          Object.entries(child.props).filter(([key, value]) => key in control && value != null),
        ),
      });
    } else {
      content = children;
    }

    const labelContent = (
      <>
        {label}
        {required && (
          <span className="ds-form-field__required" aria-hidden="true">
            {' '}
            *
          </span>
        )}
        {optional && !required && (
          <>
            {' '}
            <span className="ds-form-field__optional">{optionalLabel}</span>
          </>
        )}
      </>
    );
    const labelClass = ['ds-form-field__label', hideLabel && 'ds-form-field__label--hidden']
      .filter(Boolean)
      .join(' ');

    const shared = {
      className: ['ds-form-field', group && 'ds-form-field--group', className]
        .filter(Boolean)
        .join(' '),
      'data-invalid': error ? '' : undefined,
      'data-success': !error && success ? '' : undefined,
      'data-disabled': disabled ? '' : undefined,
    };

    const descriptionNode = description && (
      <span className="ds-form-field__description" id={descriptionId}>
        {description}
      </span>
    );

    const body = (
      <FormFieldContext.Provider value={control}>
        {/* A group's help text belongs to the whole group, so it sits under the legend. */}
        {group && descriptionNode}
        {group ? <div className="ds-form-field__controls">{content}</div> : content}
        {!group && descriptionNode}
        {(error || success) && (
          <span
            className={`ds-form-field__message ds-form-field__message--${error ? 'error' : 'success'}`}
            id={messageId}
          >
            {error ?? success}
          </span>
        )}
      </FormFieldContext.Provider>
    );

    if (group) {
      return (
        <fieldset
          ref={ref as Ref<HTMLFieldSetElement>}
          disabled={disabled}
          aria-describedby={describedBy}
          {...shared}
          {...props}
        >
          <legend className={labelClass} id={labelId}>
            {labelContent}
          </legend>
          {body}
        </fieldset>
      );
    }
    return (
      <div ref={ref as Ref<HTMLDivElement>} {...shared} {...props}>
        <label className={labelClass} htmlFor={controlId} id={labelId}>
          {labelContent}
        </label>
        {body}
      </div>
    );
  },
);
FormField.displayName = 'FormField';
