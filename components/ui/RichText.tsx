import { Fragment } from 'react';

import { SmartLink } from '@/components/ui/SmartLink';
import type { ContentBlock, InlineNode } from '@/types/content';

function Inline({ nodes }: { nodes: InlineNode[] }) {
  return (
    <>
      {nodes.map((node, index) => {
        const key = `${node.type}-${index}`;
        if (node.type === 'strong') return <strong key={key}>{node.text}</strong>;
        if (node.type === 'em') return <em key={key}>{node.text}</em>;
        if (node.type === 'link') {
          return (
            <SmartLink key={key} href={node.href}>
              {node.text}
            </SmartLink>
          );
        }
        return <Fragment key={key}>{node.text}</Fragment>;
      })}
    </>
  );
}

/**
 * Renders migrated body copy as real React elements. The WordPress HTML was
 * parsed into typed blocks at migration time, so nothing here needs
 * `dangerouslySetInnerHTML`.
 */
export function RichText({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`;
        if (block.type === 'heading') return <h2 key={key}>{block.text}</h2>;
        if (block.type === 'paragraph') {
          return (
            <p key={key}>
              <Inline nodes={block.content} />
            </p>
          );
        }
        return (
          <ul key={key}>
            {block.items.map((item, itemIndex) => (
              <li key={itemIndex}>
                <Inline nodes={item} />
              </li>
            ))}
          </ul>
        );
      })}
    </>
  );
}
