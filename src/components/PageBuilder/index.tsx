import { BlockType } from "@/types";
import React from "react";

export const PageBuilder: React.FC<{
  blockComponents: Record<string, React.FC<BlockType>>;
  blocks: Array<{ collection: string; sort?: number } & Partial<BlockType>>;
}> = ({ blockComponents, blocks }) => {
  const sortedBlocks = blocks
    .filter((block): block is BlockType => {
      return typeof block.collection === "string" && block.collection in blockComponents;
    })
    .sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0));

  return (
    <>
      {sortedBlocks.map((block) => {
        const BlockComponent = blockComponents[block.collection];
        console.log(block, 'xxx');
        return <BlockComponent key={block.collection} {...block} />;
      })}
    </>
  );
};
