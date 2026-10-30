import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  staticDirs: ['.'],   // serves brand.svg and favicon.svg from .storybook

  /* Storybook ships its own pink logo as the tab icon, so without this the
     third surface of the system is the one wearing somebody else's mark. */
  managerHead: (head) => `${head}
    <link rel="icon" type="image/svg+xml" href="./favicon.svg" />`,
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-a11y'],
  framework: { name: '@storybook/react-vite', options: {} },
  core: { disableTelemetry: true },
  typescript: { reactDocgen: 'react-docgen-typescript' },
};

export default config;
