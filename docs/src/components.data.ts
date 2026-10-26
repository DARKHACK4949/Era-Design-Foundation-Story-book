export interface ComponentDoc {
  name: string;
  story: string;
  group: string;
  purpose: string;
  use: string[];
  avoid: string[];
  note?: string;
}

/** One entry per component. `use` and `avoid` are the part worth reading:
 *  most component mistakes are choosing the wrong component, not styling it badly. */
export const COMPONENTS: ComponentDoc[] = [
  {
    name: 'Button', story: 'components-button--intents', group: 'Actions',
    purpose: 'Starts an action. Five intents, chosen by where the action sits in the hierarchy rather than by how it should look.',
    use: ['One primary per view, for the action the view exists to perform', 'Outline on a toolbar, where a filled button would dominate', 'Ghost for anything repeated in a row or a table cell', 'Danger only for an action that destroys or spends something'],
    avoid: ['Two primary buttons on one screen. If both matter, one of them is not primary', 'A button for navigation. If it changes the URL it is a link', 'Danger for anything reversible. Save the weight for what it is for'],
  },
  {
    name: 'Menu', story: 'components-menu--default', group: 'Actions',
    purpose: 'A list of commands opened from a trigger. Every item does something when chosen.',
    use: ['Row actions in a table, where buttons would crowd every row', 'Secondary actions that do not deserve space in the toolbar', 'Grouping destructive actions behind a separator'],
    avoid: ['Choosing a value. That is a Select, and it uses different roles for a reason', 'Primary navigation. A menu is for commands, not for where you are', 'Hiding the main action of a screen behind it'],
  },
  {
    name: 'Input', story: 'components-input--states', group: 'Forms',
    purpose: 'A single-line field. The field, its label, its help and its error are one component, because splitting them is how a label ends up unlinked from the input it describes.',
    use: ['Any single-line value', 'Help text that says where to find the value, not what the field is called', 'An adornment for a unit or a currency symbol'],
    avoid: ['Placeholder as the label. It disappears the moment someone types', 'An error that only says "invalid". Say what will fix it'],
  },
  {
    name: 'Text area', story: 'components-text-area--states', group: 'Forms',
    purpose: 'Multi-line text, with an optional live character counter.',
    use: ['Notes, reasons, descriptions', 'A counter when the limit is real and enforced downstream'],
    avoid: ['A counter on a field with a generous limit. It turns writing into accounting', 'Using it for a single line to make the field look bigger'],
  },
  {
    name: 'Select', story: 'components-select--with-hints', group: 'Forms',
    purpose: 'Choose one value from a known list. A combobox trigger over a listbox, on the same popup surface as Menu.',
    use: ['Between roughly 5 and 25 options', 'Options that need a second line of context', 'When the current value matters as much as the choice'],
    avoid: ['Two or three options. Use Radio, so all of them are visible', 'Hundreds of options. That needs search, which is a different component', 'Commands. Those are a Menu'],
  },
  {
    name: 'Checkbox', story: 'components-checkbox--select-all', group: 'Forms',
    purpose: 'A pending change. Nothing happens until something else is submitted.',
    use: ['Any number of independent on/off choices', 'A parent with indeterminate state when its children disagree', 'Consent and acknowledgement, which must never be pre-checked'],
    avoid: ['A change that takes effect immediately. That is a Switch', 'A single checkbox for a choice that is really two options. Use Radio'],
  },
  {
    name: 'Radio', story: 'components-radio--default', group: 'Forms',
    purpose: 'One of several mutually exclusive options, all visible at once.',
    use: ['Two to five options where comparing them matters', 'When each option deserves a line of explanation'],
    avoid: ['A single radio. One that cannot be unchecked is a checkbox with a trap', 'More than about five options. Use a Select'],
  },
  {
    name: 'Switch', story: 'components-switch--states', group: 'Forms',
    purpose: 'A setting that applies the moment it moves.',
    use: ['Settings that save themselves', 'Turning a whole feature on or off'],
    avoid: ['Anything inside a form with a save button. That is a Checkbox', 'A choice between two named things. A switch has no label for its off state'],
  },
  {
    name: 'Table', story: 'components-table--default', group: 'Data display',
    purpose: 'Rows of comparable records. Has its own token group, because a table needs decisions nothing else does.',
    use: ['Data people scan down a column rather than read across', 'Money and dates, which are right-aligned with tabular figures', 'Sorting, announced through aria-sort rather than an arrow alone'],
    avoid: ['Layout. A table is for data, not for arranging a page', 'More than about seven columns before you ask what people are really looking for'],
  },
  {
    name: 'Card', story: 'components-card--elevations', group: 'Data display',
    purpose: 'A container. Three elevations for three different jobs.',
    use: ['Flat among its own kind, where a shadow on each would read as noise', 'Outlined as the default, and on busy surfaces', 'Raised for the one card that should be read first'],
    avoid: ['Nesting cards. If a card needs a card inside it, the outer one is a section', 'A div with a click handler. Pass onActivate and get a real button'],
  },
  {
    name: 'Badge', story: 'components-badge--matrix', group: 'Data display',
    purpose: 'States a status in words, with colour helping you find it faster.',
    use: ['The subtle fill in lists, which is almost always', 'The dot variant in dense rows where filled badges read as noise'],
    avoid: ['A badge as a button. If it is clickable it needs to look and behave like one', 'Colour carrying the meaning on its own'],
  },
  {
    name: 'Avatar', story: 'components-avatar--group', group: 'Data display',
    purpose: 'A person or an organisation. Falls back from image to initials.',
    use: ['Lists of people, where the fallback matters more than the photo', 'A group with a +N overflow when space is tight'],
    avoid: ['Initials as the only identifier. The name goes in the accessible label', 'Avatars as decoration on rows where nobody needs to know who'],
  },
  {
    name: 'Tabs', story: 'components-tabs--default', group: 'Navigation',
    purpose: 'Switches between views of the same subject without leaving the page.',
    use: ['Two to six peer views of one thing', 'A count on a tab when the number is the reason to look'],
    avoid: ['Steps in a sequence. That is a wizard, and tabs let people skip', 'Tabs that change the URL to a different resource. That is navigation'],
  },
  {
    name: 'Breadcrumb', story: 'components-breadcrumb--collapsed', group: 'Navigation',
    purpose: 'Says where you are in a hierarchy.',
    use: ['Three or more levels deep', 'When people arrive from search and have no idea where they landed'],
    avoid: ['A flat app with no hierarchy. It is then just decoration', 'Making the last crumb a link to the page you are already on'],
  },
  {
    name: 'Pagination', story: 'components-pagination--many-pages', group: 'Navigation',
    purpose: 'Moves through pages of results at a constant width, whether there are 5 pages or 500.',
    use: ['Results people need to return to, since a page number is a place', 'Alongside a count, so the total is visible'],
    avoid: ['Feeds, where infinite scroll fits the behaviour better', 'Hiding the total. "Page 3 of ?" tells nobody anything'],
  },
  {
    name: 'Accordion', story: 'components-accordion--default', group: 'Navigation',
    purpose: 'Collapsible sections, built on details and summary so in-page find still works.',
    use: ['Reference content people dip into, like FAQs', 'Long forms split into stages'],
    avoid: ['Hiding something people need every time. Collapsing is a cost', 'Exclusive mode when people need to compare two sections'],
  },
  {
    name: 'Alert', story: 'components-alert--tones', group: 'Feedback',
    purpose: 'An inline message about the thing on screen.',
    use: ['Something that applies to the view, not to the whole app', 'An action in the alert when there is something to do about it'],
    avoid: ['Alerts stacked three deep. If everything is flagged, nothing is', 'Error tone for something that is merely unusual'],
  },
  {
    name: 'Modal', story: 'components-modal--confirm', group: 'Feedback',
    purpose: 'Interrupts to ask for a decision or to hold a short focused task. A real dialog element.',
    use: ['A decision that cannot be undone', 'A short task that would lose context if it took you off the page'],
    avoid: ['A modal opening a modal', 'Long forms. If it scrolls a lot it wanted a page', 'Backdrop dismissal when losing the content would hurt'],
  },
  {
    name: 'Toast', story: 'components-toast--default', group: 'Feedback',
    purpose: 'A short confirmation that something happened.',
    use: ['Confirming an action that moved the user somewhere else', 'Errors with duration 0, so they wait to be read'],
    avoid: ['Anything the person must act on. A toast disappears, an action does not wait', 'Toasts for every save. Routine success is better shown in place'],
  },
  {
    name: 'Tooltip', story: 'components-tooltip--default', group: 'Feedback',
    purpose: 'Names a control.',
    use: ['Icon-only buttons, always', 'A short label, two or three words'],
    avoid: ['Anything needed to finish a task. It is unreachable by touch', 'A sentence. If it needs a comma it belongs on the page'],
  },
  {
    name: 'Progress', story: 'components-progress--variants', group: 'Feedback',
    purpose: 'Shows how far along something is, or that it is running at all.',
    use: ['Determinate when the end is genuinely known', 'Indeterminate when it is not, which leaves aria-valuenow off on purpose'],
    avoid: ['A made-up percentage. People time themselves against it', 'Progress for anything under about a second'],
  },
  {
    name: 'Skeleton', story: 'components-skeleton--loading-a-card', group: 'Feedback',
    purpose: 'A placeholder shaped like the thing that is loading.',
    use: ['Content whose layout you already know, so nothing jumps when it lands', 'Wrapped in SkeletonGroup, which marks the region busy'],
    avoid: ['Waits under about 300ms. The flash is worse than the wait', 'A skeleton that does not match the real layout'],
  },
  {
    name: 'Empty state', story: 'components-empty-state--three-reasons', group: 'Feedback',
    purpose: 'Explains why there is nothing here, and what to do next.',
    use: ['first-run, with the action that creates the first item', 'no-results, with a way out of the filter', 'error, with a retry and a line saying nothing was lost'],
    avoid: ['"No results" for all three. That is how people get stuck', 'An illustration and no next step'],
  },
];
