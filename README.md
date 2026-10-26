# ERA

A multi-brand design system. Three brands and two modes come out of one set of components, and no component knows which brand or mode it is in.

This repo is the code half: the Figma library exported to tokens, a Storybook for the foundations, and a slice of components built on those tokens.

## The three layers

Everything here follows from how the tokens are layered.

| Layer | What it is | Example |
| --- | --- | --- |
| **Primitives** | Raw values with no opinion about use. 11-step ramps, a 4px spacing scale, type sizes, radius steps, stroke weights. Nothing in the product reads these. | `--colors-iris-700: #5b5bd6` |
| **Brand** | Re-points primitives per brand. Also holds radius roles, so a brand can shape buttons differently from cards without a component changing. | `--brand-primary-scale-700: var(--colors-iris-700)` |
| **Semantics** | Re-points the brand layer per mode. The only layer a component may read. | `--sem-primary-bg: var(--brand-primary-roles-action)` |

Switching is two attributes:

```html
<html data-brand="brand-2" data-theme="dark">
```

Brand 1 is IBM Plex Sans on Iris, Brand 2 is Geist on Cyan, Brand 3 is Source Sans 3 on Jade. They differ in typeface, accent ramp and corner treatment and share everything else.

## Tokens

Tokens are not hand-written. They are exported from the ERA Figma library into `tokens/src/*.txt` and built from there:

```bash
npm run tokens
```

| Output | What it is |
| --- | --- |
| `tokens/generated/era.css` | CSS custom properties, layered `:root` → `[data-brand]` → `[data-theme]` |
| `tokens/generated/tokens.json` | W3C design-token format, with every brand and mode under `$extensions`, for Style Dictionary or any other transform |

758 Figma variables across three collections become 1,493 custom properties. The build fails on any reference that does not resolve, so Figma and code cannot quietly drift apart.

## Running it

```bash
npm install
npm run dev        # Storybook on :6006
npm run build      # rebuild tokens, then a static Storybook
npm run typecheck
```

## What is in the Storybook

**Getting started** has the overview and a side-by-side of all six brand and mode combinations, rendering the same markup each time.

**Foundations** are generated from the live tokens, so the pages cannot go stale: colour ramps and semantic colour, the type scale, spacing, radius scale and radius roles, stroke weights, and a contrast audit that resolves real computed colours for whichever brand and mode is selected.

**Components** are Button, Input, Badge, Switch, Alert and Table. They were picked to cover the hard parts rather than the easy ones, which is why the set includes a field with seven states and a table with its own token group instead of six simple blocks.

## Rules the components follow

- Semantic tokens only. No hex value, pixel radius or raw spacing number lives in a component.
- Nothing below 12px. Anything smaller is text nobody reads.
- A 4px and 8px grid, with 2px kept as one named exception. Some gaps really are smaller than 4px, and naming that is better than leaving people to hardcode it.
- One focus treatment: keyboard only, drawn outside the element so it never changes layout, offset against the surface behind it.
- Colour is never the only signal. Status components carry an icon shape and a label as well as a fill.
- Every state resolves through a token, including hover, pressed, selected, disabled and read-only, so none of them break on dark or in another brand.

## Open accessibility gaps

The contrast audit is in the Storybook rather than in a doc because it reports what the tokens actually resolve to. Two groups are below AA today:

1. **The low end of the neutral ramp.** Placeholder (1.57:1), helper text (1.92:1) and field labels (3.32:1) sit on steps built to be borders, not text.
2. **The solid brand fill on two of three brands.** Radix splits its step 9 colours into those that carry white text and those that need dark text. Cyan and Jade are in the second group, so a white label on the Brand 2 and Brand 3 action colour lands at 2.32:1 and 3.15:1. The fix is a per-brand foreground token rather than one global white.

Both are fixes in the Figma library first, then a token re-export. They are listed here rather than quietly patched in CSS, because patching the code half is exactly how a design system starts lying about itself.
