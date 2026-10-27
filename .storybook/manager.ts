import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';

/* The sidebar carries the same mark as the docs site and the case study, so
   the three surfaces read as one system rather than three projects. */
addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'ERA design system',
    brandUrl: 'https://darkhack4949.github.io/Era-Design-Foundation-Story-book/',
    brandImage: './brand.svg',
    brandTarget: '_self',
  }),
});
