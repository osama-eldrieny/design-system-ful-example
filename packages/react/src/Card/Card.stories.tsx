import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Button } from '../Button';
import { ThemeProvider } from '../ThemeProvider';
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardMedia,
  CardTitle,
  type CardAppearance,
} from './Card';

const APPEARANCES: CardAppearance[] = ['elevated', 'outlined', 'filled'];

const Article = (props: Partial<React.ComponentProps<typeof Card>>) => (
  <Card {...props} style={{ maxInlineSize: 300, ...props.style }}>
    <CardMedia alt="" />
    <CardBody>
      <CardTitle>Design tokens in practice</CardTitle>
      <CardDescription>How one CSS file themes three brands, two modes and Arabic.</CardDescription>
    </CardBody>
  </Card>
);

const meta = {
  title: 'Components/Data display/Card',
  component: Card,
  subcomponents: { CardMedia, CardBody, CardTitle, CardDescription, CardFooter },
  tags: ['!autodocs'],
  args: { appearance: 'elevated', orientation: 'vertical', children: null },
  argTypes: { children: { control: false } },
  parameters: { a11y: { test: 'error' } },
  render: (args) => <Article appearance={args.appearance} orientation={args.orientation} />,
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Appearances: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
      {APPEARANCES.map((a) => (
        <Article key={a} appearance={a} />
      ))}
    </div>
  ),
};

export const Orientation: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <Article orientation="vertical" />
      <Article orientation="horizontal" style={{ maxInlineSize: 520 }} />
    </div>
  ),
};

export const Clickable: Story = {
  render: () => (
    <Card href="#article" appearance="outlined" style={{ maxInlineSize: 300 }}>
      <CardMedia alt="" />
      <CardBody>
        <CardTitle>Design tokens in practice</CardTitle>
        <CardDescription>8 min read</CardDescription>
      </CardBody>
      <CardFooter>
        <Button size="small" appearance="outline" variant="secondary">
          Save for later
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
      <Article href="#a" appearance="outlined" />
      <Article href="#b" appearance="outlined" id="card-hover" />
      <Article href="#c" appearance="outlined" id="card-focus" />
    </div>
  ),
  parameters: {
    pseudo: { hover: ['#card-hover'], focusWithin: ['#card-focus'] },
  },
};

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  render: () => (
    <Card orientation="horizontal" style={{ maxInlineSize: 520 }}>
      <CardMedia alt="" />
      <CardBody>
        <CardTitle>رموز التصميم عمليًا</CardTitle>
        <CardDescription>كيف يغيّر ملف CSS واحد مظهر ثلاث علامات تجارية.</CardDescription>
      </CardBody>
    </Card>
  ),
};

export const AllThemes: Story = {
  tags: ['test', '!dev'],
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      {(['diamond', 'amber', 'opal'] as const).flatMap((brand) =>
        (['light', 'dark'] as const).map((mode) => (
          <ThemeProvider key={`${brand}-${mode}`} theme={{ brand, mode }} className="ds-canvas">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {APPEARANCES.map((a) => (
                <Article key={a} appearance={a} href="#" />
              ))}
            </div>
          </ThemeProvider>
        )),
      )}
    </div>
  ),
};

/** A clickable card is one link named by its title. */
export const LinkName: Story = {
  tags: ['test'],
  render: () => <Article href="#article" />,
  play: async ({ canvas }) => {
    const links = canvas.getAllByRole('link');
    await expect(links).toHaveLength(1);
    await expect(links[0]).toHaveAccessibleName('Design tokens in practice');
  },
};
