/**
 * Fail the build if a brand's typeface would not actually load.
 *
 * ERA has three brands with three typefaces. When a web font is not shipped the
 * browser falls back to the system stack, every brand still looks plausible,
 * and nothing anywhere reports a problem. The docs site was deployed in exactly
 * that state: correct tokens, correct family names in the stack, zero font
 * files, three brands rendering in one face.
 *
 * Run with a directory argument to check a build output:
 *   node scripts/check-fonts.mjs storybook-static
 *   node scripts/check-fonts.mjs docs/dist
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const problems = [];

const BRANDS = [
  { brand: 'Brand 1', family: 'IBM Plex Sans', pkg: '@fontsource-variable/ibm-plex-sans', slug: 'ibm-plex-sans' },
  { brand: 'Brand 2', family: 'Geist', pkg: '@fontsource-variable/geist', slug: 'geist' },
  { brand: 'Brand 3', family: 'Source Sans 3', pkg: '@fontsource-variable/source-sans-3', slug: 'source-sans-3' },
];

/* 1. Each brand's family is named in the generated token file. */
const cssPath = join(root, 'tokens/generated/era.css');
if (!existsSync(cssPath)) {
  problems.push('tokens/generated/era.css is missing. Run `npm run tokens` first.');
} else {
  const css = readFileSync(cssPath, 'utf8');
  for (const { brand, family } of BRANDS) {
    if (!css.includes(`"${family}"`)) problems.push(`${brand}: era.css never names "${family}"`);
  }
}

/* 2. Each family is imported somewhere that actually ships it. A token naming a
      family does nothing on its own; something has to load the file. */
const ENTRIES = ['.storybook/preview.tsx', 'docs/src/layouts/Shell.astro'];
for (const entry of ENTRIES) {
  const path = join(root, entry);
  if (!existsSync(path)) { problems.push(`missing entry point: ${entry}`); continue; }
  const src = readFileSync(path, 'utf8');
  for (const { brand, pkg } of BRANDS) {
    if (!src.includes(pkg)) problems.push(`${entry} never imports ${pkg}, so ${brand} falls back to the system font`);
  }
}

/* 3. If a build output was named, it must contain a font file per brand. This is
      the check that would have caught the deployed site. */
const target = process.argv[2];
if (target) {
  const dir = join(root, target);
  if (!existsSync(dir)) {
    problems.push(`build output ${target} does not exist`);
  } else {
    const found = [];
    (function walk(d) {
      for (const name of readdirSync(d)) {
        const p = join(d, name);
        if (statSync(p).isDirectory()) walk(p);
        else if (name.endsWith('.woff2')) found.push(name);
      }
    })(dir);
    for (const { brand, slug } of BRANDS) {
      if (!found.some((f) => f.startsWith(slug))) {
        problems.push(`${target} ships no ${slug} font file, so ${brand} would render in the system font`);
      }
    }
    if (!problems.length) console.log(`${target}: ${found.length} font files shipped`);
  }
}

if (problems.length) {
  console.error('\nFont check failed:\n');
  for (const p of problems) console.error('  - ' + p);
  console.error('\nThree brands that silently render in one typeface is the bug this check exists for.\n');
  process.exit(1);
}
console.log('Font check passed: all three brand typefaces are declared, imported and shipped.');
