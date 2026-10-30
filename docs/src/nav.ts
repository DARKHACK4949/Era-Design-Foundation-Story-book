import { COMPONENTS, slugify } from './components.data';

export interface NavLink { href: string; label: string }
export interface NavGroup { title: string; links: NavLink[] }
export interface NavSection { href: string; label: string; groups: NavGroup[] }

/* The navigation is two levels and they are generated from one list, so they
   cannot drift apart. Level one is the rail. Level two is the panel that opens
   beside it. Every page belongs to exactly one section: a page with two homes
   makes the panel lie about where you are. */
export const SECTIONS: NavSection[] = [
  {
    href: '/foundations',
    label: 'Foundations',
    groups: [
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
  },
  {
    href: '/components',
    label: 'Components',
    groups: [
      { title: 'All', links: [{ href: '/components', label: 'All components' }] },
      ...[...new Set(COMPONENTS.map((c) => c.group))].map((group) => ({
        title: group,
        links: COMPONENTS.filter((c) => c.group === group).map((c) => ({
          href: `/components/${slugify(c.name)}`,
          label: c.name,
        })),
      })),
    ],
  },
  {
    href: '/accessibility',
    label: 'Accessibility',
    groups: [
      { title: 'Accessibility', links: [{ href: '/accessibility', label: 'What ERA checks' }] },
    ],
  },
  {
    href: '/using-era',
    label: 'Adopt',
    groups: [
      { title: 'Adopt', links: [{ href: '/using-era', label: 'Adopting ERA' }] },
    ],
  },
];

/** Level one, which is also the order of the rail. */
export const PRIMARY: NavLink[] = SECTIONS.map(({ href, label }) => ({ href, label }));

/** Which section a path belongs to, by the longest matching link. A page is in
 *  a section because the section lists it, not because its URL looks right. */
export function sectionFor(path: string): string | null {
  let best: string | null = null;
  let bestLen = -1;
  for (const s of SECTIONS)
    for (const g of s.groups)
      for (const l of g.links)
        if ((path === l.href || path.startsWith(l.href + '/')) && l.href.length > bestLen) {
          best = s.href;
          bestLen = l.href.length;
        }
  return best;
}

/** Components has six groups and twenty three links, so its groups collapse.
 *  Two short groups do not earn a disclosure: opening them is pure friction. */
export const collapsible = (s: NavSection) => s.groups.length > 2;
