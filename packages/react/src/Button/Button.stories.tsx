import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowRight, Download, Pencil, Plus, Trash2, X } from 'lucide-react';
import type { CSSProperties, ReactNode } from 'react';
import { expect, fn, userEvent } from 'storybook/test';
import { Button, type ButtonAppearance, type ButtonSize, type ButtonVariant } from './Button';
import { IconButton } from './IconButton';
import { ThemeProvider } from '../ThemeProvider';

const VARIANTS: ButtonVariant[] = ['primary', 'secondary', 'success', 'danger', 'warning'];
const APPEARANCES: ButtonAppearance[] = ['filled', 'outline', 'ghost', 'text'];
const SIZES: ButtonSize[] = ['small', 'medium', 'large'];

const Row = ({ children, style }: { children: ReactNode; style?: CSSProperties }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', ...style }}>
    {children}
  </div>
);

const meta = {
  title: 'Components/Actions/Button',
  component: Button,
  subcomponents: { IconButton },
  tags: ['!autodocs'],
  args: {
    children: 'Save changes',
    variant: 'primary',
    appearance: 'filled',
    size: 'medium',
    loading: false,
    disabled: false,
    fullWidth: false,
    onClick: fn(),
  },
  argTypes: {
    iconStart: { control: false },
    iconEnd: { control: false },
  },
  parameters: {
    a11y: { test: 'error' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Change the props in the Controls panel to try every combination. */
export const Playground: Story = {};

/** What kind of action it is. */
export const Variants: Story = {
  render: (args) => (
    <Row>
      {VARIANTS.map((variant) => (
        <Button key={variant} {...args} variant={variant}>
          {variant[0].toUpperCase() + variant.slice(1)}
        </Button>
      ))}
    </Row>
  ),
};

/** How much attention it draws, for every variant. */
export const Appearances: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      {APPEARANCES.map((appearance) => (
        <Row key={appearance}>
          {VARIANTS.map((variant) => (
            <Button key={variant} {...args} variant={variant} appearance={appearance}>
              {appearance[0].toUpperCase() + appearance.slice(1)}
            </Button>
          ))}
        </Row>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <Row>
      {SIZES.map((size) => (
        <Button key={size} {...args} size={size}>
          {size[0].toUpperCase() + size.slice(1)}
        </Button>
      ))}
    </Row>
  ),
};

/**
 * Hover, focus and pressed are real browser states. This story forces them so all can be
 * seen at once.
 */
export const States: Story = {
  render: (args) => (
    <Row>
      <Button {...args}>Default</Button>
      <Button {...args} id="state-hover">
        Hover
      </Button>
      <Button {...args} id="state-focus">
        Focus
      </Button>
      <Button {...args} id="state-pressed">
        Pressed
      </Button>
      <Button {...args} disabled>
        Disabled
      </Button>
      <Button {...args} loading>
        Loading
      </Button>
    </Row>
  ),
  parameters: {
    pseudo: {
      hover: ['#state-hover'],
      focusVisible: ['#state-focus'],
      active: ['#state-pressed'],
    },
  },
};

export const WithIcons: Story = {
  render: (args) => (
    <Row>
      <Button {...args} iconStart={<Download />}>
        Download report
      </Button>
      <Button {...args} appearance="outline" iconEnd={<ArrowRight />}>
        Continue
      </Button>
      <Button {...args} variant="danger" appearance="ghost" iconStart={<Trash2 />}>
        Delete
      </Button>
    </Row>
  ),
};

/** The spinner replaces the start icon; the button ignores clicks until loading ends. */
export const Loading: Story = {
  args: { loading: true, iconStart: <Download /> },
};

export const FullWidth: Story = {
  args: { fullWidth: true, children: 'Create account' },
  render: (args) => (
    <div style={{ maxInlineSize: 360 }}>
      <Button {...args} />
    </div>
  ),
};

/** Icon-only buttons need a label: it is the accessible name and the tooltip. */
export const IconButtons: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      {SIZES.map((size) => (
        <Row key={size}>
          <IconButton {...args} size={size} icon={<Plus />} label="Add item" />
          <IconButton {...args} size={size} appearance="outline" icon={<Pencil />} label="Edit" />
          <IconButton
            {...args}
            size={size}
            variant="secondary"
            appearance="ghost"
            icon={<X />}
            label="Close"
          />
          <IconButton {...args} size={size} variant="danger" icon={<Trash2 />} label="Delete" />
        </Row>
      ))}
    </div>
  ),
};

/** Padding and icons use logical sides, so the start icon moves to the right in Arabic. */
export const RightToLeft: Story = {
  globals: { language: 'ar' },
  render: (args) => (
    <Row>
      <Button {...args} iconStart={<Download />}>
        تنزيل التقرير
      </Button>
      <Button {...args} appearance="outline" iconEnd={<ArrowRight />}>
        متابعة
      </Button>
    </Row>
  ),
};

/**
 * Every variant and appearance in every brand × mode, so the accessibility check (including
 * color contrast) covers all themes, not only the default.
 */
export const AllThemes: Story = {
  tags: ['test', '!dev'],
  render: (args) => (
    <div style={{ display: 'grid', gap: 16 }}>
      {(['diamond', 'amber', 'opal'] as const).flatMap((brand) =>
        (['light', 'dark'] as const).map((mode) => (
          <ThemeProvider key={`${brand}-${mode}`} theme={{ brand, mode }} className="ds-canvas">
            {APPEARANCES.map((appearance) => (
              <Row key={appearance} style={{ marginBlockEnd: 8 }}>
                {VARIANTS.map((variant) => (
                  <Button key={variant} {...args} variant={variant} appearance={appearance}>
                    {`${brand} ${mode} ${variant}`}
                  </Button>
                ))}
              </Row>
            ))}
          </ThemeProvider>
        )),
      )}
    </div>
  ),
};

/** Interaction test: pointer and keyboard activate the button; loading and disabled block it. */
export const KeyboardAndPointer: Story = {
  tags: ['test'],
  play: async ({ args, canvas, step }) => {
    const button = canvas.getByRole('button', { name: 'Save changes' });
    await step('Click activates', async () => {
      await userEvent.click(button);
      await expect(args.onClick).toHaveBeenCalledTimes(1);
    });
    await step('Enter and Space activate', async () => {
      button.focus();
      await userEvent.keyboard('{Enter}');
      await userEvent.keyboard(' ');
      await expect(args.onClick).toHaveBeenCalledTimes(3);
    });
    await step('Focus is visible and on the button', async () => {
      await expect(button).toHaveFocus();
    });
  },
};
