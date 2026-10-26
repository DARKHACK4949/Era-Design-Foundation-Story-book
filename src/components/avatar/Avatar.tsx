import { useState } from 'react';
import { cn } from '../../lib/cn';
import './avatar.css';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps {
  /** The person or thing. Used for the initials, the tone and the alt text. */
  name: string;
  src?: string;
  size?: AvatarSize;
  shape?: 'circle' | 'square';
  className?: string;
}

/** First letters of the first and last word. Two letters is the most that fits
 *  legibly at the small sizes, and one is ambiguous in a list. */
function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/** Deterministic, so one person keeps one colour everywhere. */
function tone(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return (h % 5) + 1;
}

export function Avatar({ name, src, size = 'md', shape = 'circle', className }: AvatarProps) {
  const [broken, setBroken] = useState(false);
  const showImage = src && !broken;

  return (
    <span
      className={cn('era-avatar', `era-avatar--${size}`, shape === 'square' && 'era-avatar--square', !showImage && `era-avatar--tone-${tone(name)}`, className)}
      // The initials are decoration once the name is already in the label.
      role="img"
      aria-label={name}
      title={name}
    >
      {showImage ? (
        <img className="era-avatar__img" src={src} alt="" onError={() => setBroken(true)} />
      ) : (
        <span aria-hidden="true">{initials(name)}</span>
      )}
    </span>
  );
}

export interface AvatarGroupProps {
  people: Array<{ name: string; src?: string }>;
  /** Anything past this collapses into a +N chip. */
  max?: number;
  size?: AvatarSize;
  className?: string;
}

export function AvatarGroup({ people, max = 4, size = 'md', className }: AvatarGroupProps) {
  const shown = people.slice(0, max);
  const rest = people.length - shown.length;

  return (
    <span className={cn('era-avatar-group', className)} role="group" aria-label={`${people.length} people`}>
      {shown.map((p) => (
        <Avatar key={p.name} name={p.name} src={p.src} size={size} />
      ))}
      {rest > 0 && (
        <span className={cn('era-avatar', `era-avatar--${size}`, 'era-avatar-group__overflow')} role="img" aria-label={`${rest} more`}>
          <span aria-hidden="true">+{rest}</span>
        </span>
      )}
    </span>
  );
}
