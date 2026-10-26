export interface NavLink { href: string; label: string }
export interface NavGroup { title: string; links: NavLink[] }

export const NAV: NavGroup[] = [
  {
    title: 'Start here',
    links: [
      { href: '/', label: 'Overview' },
      { href: '/using-era', label: 'Using ERA' },
      { href: '/tokens', label: 'How tokens work' },
    ],
  },
  {
    title: 'Foundations',
    links: [
      { href: '/foundations/colour', label: 'Colour' },
      { href: '/foundations/typography', label: 'Typography' },
      { href: '/foundations/spacing', label: 'Spacing' },
      { href: '/foundations/shape', label: 'Radius and stroke' },
    ],
  },
  {
    title: 'Patterns',
    links: [
      { href: '/accessibility', label: 'Accessibility' },
      { href: '/components', label: 'Components' },
    ],
  },
];
