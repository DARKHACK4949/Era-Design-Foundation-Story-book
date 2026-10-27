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

762 Figma variables across three collections become 1,505 custom properties. The build fails on any reference that does not resolve, so Figma and code cannot quietly drift apart. It also fails if a brand's typeface would not actually load, because a missing web font falls back to the system stack and three brands then render in one face while looking entirely fine.

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

**Components**, 23 of them: Accordion, Alert, Avatar, Badge, Breadcrumb, Button, Card, Checkbox, EmptyState, Input, Menu, Modal, Pagination, Progress, Radio, Select, Skeleton, Switch, Table, Tabs, TextArea, Toast and Tooltip.

They were picked to cover the hard parts rather than the easy ones: a field with seven states, a table with its own token group, a Menu implementing the full WAI-ARIA menu button pattern with arrow keys, type-ahead and focus return, and a Select built as a listbox so focus stays on the trigger. Where a native element was better it is used, so Modal is a real `<dialog>` and Accordion is `<details>`, which keeps in-page find working.

## Visual regression

A token change is invisible until something renders it, and Brand 2 dark is the
combination nobody looks at, so it is the one that breaks quietly.

`npm run test:visual` screenshots ten stories across all three brands and both
modes, sixty shots in total, chosen to exercise the token layers rather than to
cover every story: the solid brand fill, the ramp as text, borders, status
colour, radius roles, elevation, and the contrast audit that resolves real
computed colours.

Baselines live in `tests/__screenshots__` and are generated in CI, in the
Playwright container, because font rasterisation differs between machines and
locally made baselines fail on the runner for reasons that have nothing to do
with the system. To seed or refresh them, run the **Visual regression**
workflow with *Regenerate baselines* ticked: it commits the result and also
attaches it to the run as the `visual-baselines` artifact, so the shots are
never stranded inside a failed run.

If that push ever fails, the cause is almost always repository settings rather
than the workflow: **Settings > Actions > General > Workflow permissions** has
to be *Read and write permissions* for a job to commit back.

One thing worth knowing if you change the tolerance: it is an absolute pixel
count, not a ratio. A ratio scales with the image, so a colour change confined
to one component is a small fraction of a large screenshot and slips under it.
Recolouring Brand 2's primary button moved 5,174 of 599,040 pixels, which is
0.86%, and a 1% ratio passed it as noise.

## Rules the components follow

- Semantic tokens only. No hex value, pixel radius or raw spacing number lives in a component.
- Nothing below 12px. Anything smaller is text nobody reads.
- A 4px and 8px grid, with 2px kept as one named exception. Some gaps really are smaller than 4px, and naming that is better than leaving people to hardcode it.
- One focus treatment: keyboard only, drawn outside the element so it never changes layout, offset against the surface behind it.
- Colour is never the only signal. Status components carry an icon shape and a label as well as a fill.
- Every state resolves through a token, including hover, pressed, selected, disabled and read-only, so none of them break on dark or in another brand.

## Accessibility

The contrast audit lives in the Storybook rather than in a doc, because it reports what the tokens actually resolve to for whichever brand and mode is selected. Every non-exempt text and surface pair now meets WCAG AA across all three brands and both modes.

Getting there took twelve token changes in the Figma library, from two root causes:

1. **The low end of the neutral ramp was being used for text.** Placeholder sat at 1.57:1, helper text at 1.92:1, field labels at 3.32:1. Those steps exist to draw borders. Only steps 900 and 950 carry body text, which is what Radix intends: it guarantees exactly two text steps per ramp.
2. **The solid brand fill had one global foreground.** Radix splits its step 9 colours into those that carry white text and those that need dark text. Iris is in the first group, Cyan and Jade are in the second, so a white label landed at 2.32:1 on Brand 2 and 3.15:1 on Brand 3. That is now a per-brand role token, `Primary/Roles/On action`, so each brand answers for its own fill.

One pair is deliberately left below 4.5:1: the label on a disabled control. WCAG 1.4.3 exempts inactive controls, and a disabled button that reads at full contrast stops looking disabled. It moved from 1.68:1 to 3.33:1, so it is legible without pretending to be active.

Both fixes were made in Figma first and re-exported, not patched in CSS. Patching the code half is how a design system starts lying about its own source.
