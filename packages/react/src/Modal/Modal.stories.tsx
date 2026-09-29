import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, screen, userEvent, waitFor } from 'storybook/test';
import { Button } from '../Button';
import { InputField } from '../InputField';
import { ThemeProvider } from '../ThemeProvider';
import { Modal, ModalClose, ModalContent, ModalFooter, ModalTrigger } from './Modal';

const Example = ({
  size,
  role,
}: {
  size?: 'small' | 'medium' | 'large';
  role?: 'dialog' | 'alertdialog';
}) => (
  <Modal>
    <ModalTrigger asChild>
      <Button>Rename file</Button>
    </ModalTrigger>
    <ModalContent
      size={size}
      role={role}
      title="Rename file"
      description="Names must be unique in this folder."
    >
      <InputField label="Name" defaultValue="Quarterly report" />
      <ModalFooter>
        <ModalClose asChild>
          <Button appearance="outline" variant="secondary">
            Cancel
          </Button>
        </ModalClose>
        <Button>Save</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

const meta = {
  title: 'Components/Overlays/Modal',
  component: Modal,
  tags: ['!autodocs'],
  parameters: { a11y: { test: 'error' } },
  render: () => <Example />,
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      <Example size="small" />
      <Example size="medium" />
      <Example size="large" />
    </div>
  ),
};

export const ConfirmDelete: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="danger">Delete project</Button>
      </ModalTrigger>
      <ModalContent
        role="alertdialog"
        size="small"
        title="Delete project?"
        description="This can’t be undone."
      >
        <ModalFooter>
          <ModalClose asChild>
            <Button appearance="outline" variant="secondary">
              Cancel
            </Button>
          </ModalClose>
          <Button variant="danger">Delete project</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

export const RightToLeft: Story = {
  globals: { language: 'ar' },
  render: () => (
    <Modal defaultOpen>
      <ModalContent title="إعادة تسمية الملف" closeLabel="إغلاق">
        <InputField label="الاسم" defaultValue="التقرير الفصلي" />
      </ModalContent>
    </Modal>
  ),
};

/** Every theme; rendered in the page flow (non-modal) so all six can be checked at once. */
export const AllThemes: Story = {
  tags: ['test', '!dev'],
  render: () => (
    <>
      {(['diamond', 'amber', 'opal'] as const).flatMap((brand) =>
        (['light', 'dark'] as const).map((mode) => (
          <ThemeProvider key={`${brand}-${mode}`} theme={{ brand, mode }} className="ds-canvas">
            <Modal defaultOpen modal={false}>
              <ModalContent
                title={`${brand} ${mode}`}
                description="Description text."
                style={{ position: 'static', translate: 'none', marginBlock: 12 }}
              >
                <ModalFooter>
                  <Button>Save</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </ThemeProvider>
        )),
      )}
    </>
  ),
};

/** Opens with focus inside, is named and described, and returns focus on Escape. */
export const Focus: Story = {
  tags: ['test'],
  play: async ({ canvas }) => {
    const trigger = canvas.getByRole('button', { name: 'Rename file' });
    await userEvent.click(trigger);
    const dialog = await screen.findByRole('dialog', { name: 'Rename file' });
    await expect(dialog).toHaveAccessibleDescription('Names must be unique in this folder.');
    await waitFor(() => expect(dialog).toContainElement(document.activeElement as HTMLElement));
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
    await expect(trigger).toHaveFocus();
  },
};
