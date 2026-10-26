export interface NavLink { href: string; label: string }
export interface NavGroup { title: string; links: NavLink[] }

/** Primary nav. Four items, so it stays on one line at desktop. */
export const PRIMARY: NavLink[] = [
  { href: '/foundations', label: 'Foundations' },
  { href: '/components', label: 'Components' },
  { href: '/accessibility', label: 'Accessibility' },
  { href: '/using-era', label: 'Adopt' },
];

/** The sidebar is contextual: it shows the section you are inside, not the
 *  whole site. A docs sidebar that lists everything is a sitemap, not a guide. */
export const SECTIONS: Record<string, NavGroup[]> = {
  foundations: [
    {
      title: 'Foundations',
      links: [
        { href: '/foundations', label: 'Overview' },
        { href: '/foundations/colour', label: 'Colour' },
        { href: '/foundations/typography', label: 'Typography' },
        { href: '/foundations/spacing', label: 'Spacing' },
        { href: '/foundations/shape', label: 'Radius and stroke' },
      ],
    },
    { title: 'Underneath', links: [{ href: '/tokens', label: 'How tokens work' }] },
  ],
  components: [
    { title: 'Components', links: [{ href: '/components', label: 'All components' }] },
    { title: 'Related', links: [{ href: '/accessibility', label: 'Accessibility' }, { href: '/using-era', label: 'Adopting ERA' }] },
  ],
  about: [
    {
      title: 'Start here',
      links: [
        { href: '/tokens', label: 'How tokens work' },
        { href: '/accessibility', label: 'Accessibility' },
        { href: '/using-era', label: 'Adopting ERA' },
      ],
    },
    { title: 'Reference', links: [{ href: '/foundations', label: 'Foundations' }, { href: '/components', label: 'Components' }] },
  ],
};
