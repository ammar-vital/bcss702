/** Typed representation of the body copy migrated out of the WordPress theme. */

export type InlineNode =
  | { type: 'text'; text: string }
  | { type: 'strong'; text: string }
  | { type: 'em'; text: string }
  | { type: 'link'; text: string; href: string; external?: boolean };

export type ContentBlock =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; content: InlineNode[] }
  | { type: 'list'; items: InlineNode[][] };
