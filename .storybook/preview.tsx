import type { Decorator, Preview } from '@storybook/react';
import React, { useEffect } from 'react';
import '../tokens/generated/era.css';
import '../src/styles/base.css';

/**
 * ERA ships three brands and two modes. Nothing about a component changes when
 * you switch either one: the component reads semantic tokens, and the two
 * attributes below decide what those tokens resolve to. The toolbar is the
 * fastest honest test of that claim, so it sits in front of every story.
 */
const BRANDS = [
  { value: 'brand-1', title: 'Brand 1 · Iris' },
  { value: 'brand-2', title: 'Brand 2 · Cyan' },
  { value: 'brand-3', title: 'Brand 3 · Jade' },
];

const withEraTheme: Decorator = (Story, context) => {
  const brand = context.globals.brand ?? 'brand-1';
  const theme = context.globals.theme ?? 'light';

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-brand', brand);
    root.setAttribute('data-theme', theme);
    root.style.colorScheme = theme;
  }, [brand, theme]);

  return (
    <div data-era-canvas style={{ padding: 'var(--spacing-space-24)' }}>
      <Story />
    </div>
  );
};

const preview: Preview = {
  globalTypes: {
    brand: {
      description: 'Which brand the Brand layer resolves to',
      defaultValue: 'brand-1',
      toolbar: { title: 'Brand', icon: 'paintbrush', items: BRANDS, dynamicTitle: true },
    },
    theme: {
      description: 'Which mode the Semantic layer resolves to',
      defaultValue: 'light',
      toolbar: {
        title: 'Mode',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [withEraTheme],
  parameters: {
    layout: 'fullscreen',
    controls: { expanded: true, sort: 'requiredFirst' },
    a11y: { test: 'error' },
    options: {
      storySort: {
        order: ['Getting started', 'Foundations', ['Colour', 'Typography', 'Spacing & layout', 'Radius & stroke', 'Elevation'], 'Components', 'Patterns'],
      },
    },
  },
};

export default preview;
