import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import * as Menu from '@radix-ui/react-dropdown-menu';
import { Check, ChevronRight, Dot } from 'lucide-react';
import { usePortalThemeAttributes } from '../ThemeProvider';
import './DropdownMenu.css';

const cx = (...parts: (string | false | undefined)[]) => parts.filter(Boolean).join(' ');

/**
 * A menu of actions or options that opens from a button. Arrow keys move through items,
 * typing jumps to an item, Escape closes it and focus returns to the trigger.
 */
export const DropdownMenu = Menu.Root;

/**
 * The element that opens the menu. Use asChild with a Button so the trigger keeps its
 * styling: `<DropdownMenuTrigger asChild><Button>Options</Button></DropdownMenuTrigger>`.
 */
export const DropdownMenuTrigger = Menu.Trigger;

export interface DropdownMenuContentProps extends ComponentPropsWithoutRef<typeof Menu.Content> {
  /** Distance from the trigger in px. */
  sideOffset?: number;
}

/** The menu panel. Positions itself next to the trigger and stays inside the viewport. */
export const DropdownMenuContent = forwardRef<HTMLDivElement, DropdownMenuContentProps>(
  ({ className, sideOffset = 4, children, ...props }, ref) => {
    // Rendered at the end of <body>: carry the theme of the place the menu opened from.
    const themeAttrs = usePortalThemeAttributes();
    return (
      <Menu.Portal>
        <Menu.Content
          ref={ref}
          sideOffset={sideOffset}
          className={cx('ds-menu', className)}
          {...themeAttrs}
          {...props}
        >
          {children}
        </Menu.Content>
      </Menu.Portal>
    );
  },
);
DropdownMenuContent.displayName = 'DropdownMenuContent';

interface ItemExtras {
  /** Icon before the label. Hidden from screen readers. */
  icon?: ReactNode;
  /** Keyboard shortcut hint shown at the end, e.g. "⌘D". Only a hint; wire the shortcut yourself. */
  shortcut?: string;
}

const ItemInner = ({ icon, shortcut, children }: ItemExtras & { children: ReactNode }) => (
  <>
    {icon && (
      <span className="ds-menu__icon" aria-hidden="true">
        {icon}
      </span>
    )}
    <span className="ds-menu__label">{children}</span>
    {shortcut && (
      <span className="ds-menu__shortcut" aria-hidden="true">
        {shortcut}
      </span>
    )}
  </>
);

export interface DropdownMenuItemProps
  extends ComponentPropsWithoutRef<typeof Menu.Item>, ItemExtras {
  /** `danger` for destructive actions such as Delete. */
  variant?: 'default' | 'danger';
}

/** An action. Use onSelect to run it; the menu closes afterwards. */
export const DropdownMenuItem = forwardRef<HTMLDivElement, DropdownMenuItemProps>(
  ({ icon, shortcut, variant = 'default', className, children, ...props }, ref) => (
    <Menu.Item
      ref={ref}
      className={cx('ds-menu__item', variant === 'danger' && 'ds-menu__item--danger', className)}
      {...props}
    >
      <ItemInner icon={icon} shortcut={shortcut}>
        {children}
      </ItemInner>
    </Menu.Item>
  ),
);
DropdownMenuItem.displayName = 'DropdownMenuItem';

export interface DropdownMenuCheckboxItemProps
  extends ComponentPropsWithoutRef<typeof Menu.CheckboxItem>, Omit<ItemExtras, 'icon'> {}

/** An option that can be turned on or off independently. */
export const DropdownMenuCheckboxItem = forwardRef<HTMLDivElement, DropdownMenuCheckboxItemProps>(
  ({ shortcut, className, children, ...props }, ref) => (
    <Menu.CheckboxItem ref={ref} className={cx('ds-menu__item', className)} {...props}>
      <span className="ds-menu__icon">
        <Menu.ItemIndicator>
          <Check aria-hidden="true" />
        </Menu.ItemIndicator>
      </span>
      <ItemInner shortcut={shortcut}>{children}</ItemInner>
    </Menu.CheckboxItem>
  ),
);
DropdownMenuCheckboxItem.displayName = 'DropdownMenuCheckboxItem';

/** Groups radio items so only one can be selected. */
export const DropdownMenuRadioGroup = Menu.RadioGroup;

export interface DropdownMenuRadioItemProps
  extends ComponentPropsWithoutRef<typeof Menu.RadioItem>, Omit<ItemExtras, 'icon'> {}

/** One exclusive option inside a DropdownMenuRadioGroup, e.g. a sort order. */
export const DropdownMenuRadioItem = forwardRef<HTMLDivElement, DropdownMenuRadioItemProps>(
  ({ shortcut, className, children, ...props }, ref) => (
    <Menu.RadioItem ref={ref} className={cx('ds-menu__item', className)} {...props}>
      <span className="ds-menu__icon">
        <Menu.ItemIndicator>
          <Dot aria-hidden="true" />
        </Menu.ItemIndicator>
      </span>
      <ItemInner shortcut={shortcut}>{children}</ItemInner>
    </Menu.RadioItem>
  ),
);
DropdownMenuRadioItem.displayName = 'DropdownMenuRadioItem';

/** A heading for a group of items. Not interactive. */
export const DropdownMenuLabel = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof Menu.Label>
>(({ className, ...props }, ref) => (
  <Menu.Label ref={ref} className={cx('ds-menu__group-label', className)} {...props} />
));
DropdownMenuLabel.displayName = 'DropdownMenuLabel';

/** A line between groups of items. */
export const DropdownMenuSeparator = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof Menu.Separator>
>(({ className, ...props }, ref) => (
  <Menu.Separator ref={ref} className={cx('ds-menu__separator', className)} {...props} />
));
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';

/** Groups items that belong together (without a visible label). */
export const DropdownMenuGroup = Menu.Group;

/** A nested menu. Contains a DropdownMenuSubTrigger and a DropdownMenuSubContent. */
export const DropdownMenuSub = Menu.Sub;

export interface DropdownMenuSubTriggerProps
  extends ComponentPropsWithoutRef<typeof Menu.SubTrigger>, Omit<ItemExtras, 'shortcut'> {}

/** The item that opens a nested menu (with the right arrow key, hover or click). */
export const DropdownMenuSubTrigger = forwardRef<HTMLDivElement, DropdownMenuSubTriggerProps>(
  ({ icon, className, children, ...props }, ref) => (
    <Menu.SubTrigger ref={ref} className={cx('ds-menu__item', className)} {...props}>
      <ItemInner icon={icon}>{children}</ItemInner>
      <span className="ds-menu__chevron" aria-hidden="true">
        <ChevronRight />
      </span>
    </Menu.SubTrigger>
  ),
);
DropdownMenuSubTrigger.displayName = 'DropdownMenuSubTrigger';

/** The nested menu panel. */
export const DropdownMenuSubContent = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof Menu.SubContent>
>(({ className, ...props }, ref) => {
  const themeAttrs = usePortalThemeAttributes();
  return (
    <Menu.Portal>
      <Menu.SubContent ref={ref} className={cx('ds-menu', className)} {...themeAttrs} {...props} />
    </Menu.Portal>
  );
});
DropdownMenuSubContent.displayName = 'DropdownMenuSubContent';
