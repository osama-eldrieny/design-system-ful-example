import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Tab, TabList, TabPanel, Tabs } from './Tabs';

const renderTabs = (onValueChange = vi.fn()) =>
  render(
    <Tabs defaultValue="a" onValueChange={onValueChange}>
      <TabList label="Sections">
        <Tab value="a">Alpha</Tab>
        <Tab value="b">Beta</Tab>
        <Tab value="c" disabled>
          Gamma
        </Tab>
      </TabList>
      <TabPanel value="a">Alpha panel</TabPanel>
      <TabPanel value="b">Beta panel</TabPanel>
    </Tabs>,
  );

describe('Tabs', () => {
  it('vertical: marks the list vertical and moves with the Down arrow', async () => {
    render(
      <Tabs defaultValue="a" orientation="vertical">
        <TabList label="Settings">
          <Tab value="a">A</Tab>
          <Tab value="b">B</Tab>
        </TabList>
        <TabPanel value="a">Panel A</TabPanel>
        <TabPanel value="b">Panel B</TabPanel>
      </Tabs>,
    );
    expect(screen.getByRole('tablist')).toHaveAttribute('aria-orientation', 'vertical');
    screen.getByRole('tab', { name: 'A' }).focus();
    await userEvent.keyboard('{ArrowDown}');
    expect(screen.getByRole('tab', { name: 'B' })).toHaveFocus();
  });

  it('is a labelled tablist with linked panels', () => {
    renderTabs();
    expect(screen.getByRole('tablist', { name: 'Sections' })).toBeInTheDocument();
    const alpha = screen.getByRole('tab', { name: 'Alpha' });
    expect(alpha).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Alpha panel');
    expect(screen.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', alpha.id);
  });

  it('switches panels when a tab is chosen', async () => {
    const onChange = vi.fn();
    renderTabs(onChange);
    await userEvent.click(screen.getByRole('tab', { name: 'Beta' }));
    expect(onChange).toHaveBeenCalledWith('b');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Beta panel');
  });

  it('ignores disabled tabs', async () => {
    const onChange = vi.fn();
    renderTabs(onChange);
    await userEvent.click(screen.getByRole('tab', { name: 'Gamma' }));
    expect(onChange).not.toHaveBeenCalled();
  });
});
