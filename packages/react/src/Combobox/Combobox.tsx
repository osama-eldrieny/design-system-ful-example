import { forwardRef, useMemo, useState, type ReactNode } from 'react';
import { useCombobox, useMultipleSelection } from 'downshift';
import { Check, ChevronDown, X } from 'lucide-react';
import { FormField, type FormFieldControlProps } from '../FormField';
import './Combobox.css';

export interface ComboboxOption {
  value: string;
  /** Text shown and matched. */
  label: string;
  disabled?: boolean;
}

export type ComboboxSize = 'small' | 'medium' | 'large';

interface ComboboxBaseProps {
  /** What to choose, e.g. "Country". Always required: it names the field. */
  label: ReactNode;
  hideLabel?: boolean;
  description?: ReactNode;
  error?: ReactNode;
  success?: ReactNode;
  required?: boolean;
  optional?: boolean;
  placeholder?: string;
  /** All options, or for async search the current results. */
  options: ComboboxOption[];
  /**
   * How typed text filters options. Default: case-insensitive “contains” on the label.
   * Pass false when options are already filtered, e.g. by a server.
   */
  filter?: ((option: ComboboxOption, query: string) => boolean) | false;
  /** Typed text (controlled), e.g. to fetch results. */
  inputValue?: string;
  /** Called with the typed text. */
  onInputChange?: (query: string) => void;
  /** Shows the loading message instead of options, e.g. while fetching. */
  loading?: boolean;
  /** Text when nothing matches. Default "No results". */
  emptyMessage?: string;
  /** Text while loading. Default "Loading…". */
  loadingMessage?: string;
  /** Accessible name of each chip's remove button, for translation. */
  removeLabel?: (label: string) => string;
  size?: ComboboxSize;
  disabled?: boolean;
  /** Form field name; selected values are submitted as hidden inputs. */
  name?: string;
  id?: string;
  className?: string;
}

export interface ComboboxSingleProps extends ComboboxBaseProps {
  multiple?: false;
  /** Selected value (controlled). */
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
}

export interface ComboboxMultipleProps extends ComboboxBaseProps {
  /** Lets people pick several options, shown as removable chips. */
  multiple: true;
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
}

export type ComboboxProps = ComboboxSingleProps | ComboboxMultipleProps;

const defaultFilter = (option: ComboboxOption, query: string) =>
  option.label.toLowerCase().includes(query.trim().toLowerCase());

/**
 * A text field with a list of suggestions: type to filter, then pick one option (or several,
 * as chips). Supports async results.
 */
export const Combobox = forwardRef<HTMLInputElement, ComboboxProps>((props, ref) => {
  const {
    label,
    hideLabel,
    description,
    error,
    success,
    required,
    optional,
    size = 'medium',
    disabled,
    id,
    className,
  } = props;
  return (
    <FormField
      id={id}
      label={label}
      hideLabel={hideLabel}
      description={description}
      error={error}
      success={success}
      required={required}
      optional={optional}
      disabled={disabled}
      className={['ds-combobox', `ds-combobox--${size}`, className].filter(Boolean).join(' ')}
    >
      {(control, { labelId }) => (
        <ComboboxControl {...props} inputRef={ref} control={control} labelId={labelId} />
      )}
    </FormField>
  );
});
Combobox.displayName = 'Combobox';

interface ControlProps {
  control: FormFieldControlProps;
  labelId: string;
  inputRef: React.ForwardedRef<HTMLInputElement>;
}

function ComboboxControl(props: ComboboxProps & ControlProps) {
  const {
    options,
    filter = defaultFilter,
    inputValue: controlledInput,
    onInputChange,
    loading = false,
    emptyMessage = 'No results',
    loadingMessage = 'Loading…',
    removeLabel = (label: string) => `Remove ${label}`,
    placeholder,
    disabled,
    name,
    control,
    labelId,
    inputRef,
  } = props;
  const multiple = props.multiple === true;

  // Selected values: one list for both modes.
  const initial = props.defaultValue ?? (multiple ? [] : null);
  const [uncontrolled, setUncontrolled] = useState<string[]>(
    Array.isArray(initial) ? initial : initial ? [initial] : [],
  );
  const selectedValues =
    props.value === undefined
      ? uncontrolled
      : Array.isArray(props.value)
        ? props.value
        : props.value
          ? [props.value]
          : [];
  const byValue = useMemo(() => new Map(options.map((o) => [o.value, o])), [options]);
  const [known, setKnown] = useState(new Map<string, ComboboxOption>());
  const optionFor = (value: string) =>
    byValue.get(value) ?? known.get(value) ?? { value, label: value };
  const selectedOptions = selectedValues.map(optionFor);

  const setSelected = (next: ComboboxOption[]) => {
    setKnown((prev) => new Map([...prev, ...next.map((o) => [o.value, o] as const)]));
    const values = next.map((o) => o.value);
    setUncontrolled(values);
    if (multiple) (props.onValueChange as ((v: string[]) => void) | undefined)?.(values);
    else (props.onValueChange as ((v: string | null) => void) | undefined)?.(values[0] ?? null);
  };

  const [uncontrolledInput, setUncontrolledInput] = useState(
    multiple ? '' : (selectedOptions[0]?.label ?? ''),
  );
  const query = controlledInput ?? uncontrolledInput;
  const updateQuery = (next: string) => {
    setUncontrolledInput(next);
    onInputChange?.(next);
  };

  const visible = options.filter(
    (o) =>
      (!multiple || !selectedValues.includes(o.value)) &&
      (filter === false ||
        !query ||
        (!multiple && query === selectedOptions[0]?.label) ||
        filter(o, query)),
  );

  const multi = useMultipleSelection<ComboboxOption>({
    selectedItems: multiple ? selectedOptions : [],
    onSelectedItemsChange: ({ selectedItems }) => multiple && setSelected(selectedItems ?? []),
  });

  const combobox = useCombobox<ComboboxOption>({
    items: loading ? [] : visible,
    itemToString: (o) => o?.label ?? '',
    isItemDisabled: (o) => !!o.disabled,
    inputId: control.id,
    labelId,
    inputValue: query,
    selectedItem: multiple ? null : (selectedOptions[0] ?? null),
    stateReducer: (_state, { type, changes }) => {
      if (!multiple) return changes;
      // Keep the list open and the text empty after picking, to pick more.
      if (
        type === useCombobox.stateChangeTypes.InputKeyDownEnter ||
        type === useCombobox.stateChangeTypes.ItemClick
      ) {
        return {
          ...changes,
          isOpen: true,
          highlightedIndex: _state.highlightedIndex,
          inputValue: '',
        };
      }
      return changes;
    },
    onStateChange: ({ type, selectedItem, inputValue }) => {
      if (inputValue !== undefined && type === useCombobox.stateChangeTypes.InputChange) {
        updateQuery(inputValue);
        if (!multiple && inputValue === '') setSelected([]);
      }
      if (
        selectedItem !== undefined &&
        (type === useCombobox.stateChangeTypes.InputKeyDownEnter ||
          type === useCombobox.stateChangeTypes.ItemClick ||
          type === useCombobox.stateChangeTypes.InputBlur)
      ) {
        if (!selectedItem) return;
        if (multiple) {
          setSelected([...selectedOptions, selectedItem]);
          updateQuery('');
        } else {
          setSelected([selectedItem]);
          updateQuery(selectedItem.label);
        }
      }
    },
  });

  const describedBy = control['aria-describedby'];
  const inputProps = combobox.getInputProps(
    multiple
      ? multi.getDropdownProps({ preventKeyAction: combobox.isOpen, ref: inputRef })
      : { ref: inputRef },
  );

  return (
    <div className="ds-combobox__field">
      <div className="ds-combobox__control" data-disabled={disabled ? '' : undefined}>
        {multiple &&
          selectedOptions.map((option, index) => (
            <span
              key={option.value}
              className="ds-combobox__chip"
              {...multi.getSelectedItemProps({ selectedItem: option, index })}
            >
              {option.label}
              <button
                type="button"
                className="ds-combobox__chip-remove"
                aria-label={removeLabel(option.label)}
                disabled={disabled}
                onClick={(event) => {
                  event.stopPropagation();
                  multi.removeSelectedItem(option);
                }}
              >
                <X aria-hidden="true" />
              </button>
            </span>
          ))}
        <input
          className="ds-combobox__input"
          placeholder={multiple && selectedOptions.length ? undefined : placeholder}
          disabled={disabled}
          required={props.required && selectedValues.length === 0}
          aria-invalid={control['aria-invalid']}
          {...inputProps}
          aria-describedby={describedBy}
        />
        <button
          type="button"
          className="ds-combobox__toggle"
          disabled={disabled}
          {...combobox.getToggleButtonProps({ 'aria-label': 'Show options' })}
        >
          <ChevronDown aria-hidden="true" />
        </button>
      </div>
      <ul
        className="ds-combobox__content"
        {...combobox.getMenuProps({ 'aria-labelledby': labelId })}
        hidden={!combobox.isOpen}
      >
        {combobox.isOpen &&
          (loading ? (
            <li className="ds-combobox__message" role="presentation">
              {loadingMessage}
            </li>
          ) : visible.length === 0 ? (
            <li className="ds-combobox__message" role="presentation">
              {emptyMessage}
            </li>
          ) : (
            visible.map((option, index) => (
              <li
                key={option.value}
                className="ds-combobox__item"
                data-highlighted={combobox.highlightedIndex === index ? '' : undefined}
                data-selected={selectedValues.includes(option.value) ? '' : undefined}
                data-disabled={option.disabled ? '' : undefined}
                {...combobox.getItemProps({ item: option, index })}
              >
                {option.label}
                {selectedValues.includes(option.value) && (
                  <Check className="ds-combobox__indicator" aria-hidden="true" />
                )}
              </li>
            ))
          ))}
      </ul>
      <span className="ds-combobox__status" role="status">
        {combobox.isOpen && !loading
          ? `${visible.length} ${visible.length === 1 ? 'result' : 'results'}`
          : ''}
      </span>
      {name &&
        selectedValues.map((value) => (
          <input key={value} type="hidden" name={name} value={value} />
        ))}
    </div>
  );
}
