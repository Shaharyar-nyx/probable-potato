import { BlockType } from "@/types";
import React from "react";

export const PageBuilder: React.FC<{ blockComponents: Record<string, React.FC<BlockType>>; blocks: BlockType[] }> = ({
  blockComponents,
  blocks,
}) => {
  const sortedBlocks = [...blocks].sort((a, b) => a.sort - b.sort);

  return (
    <>
      {sortedBlocks.map((block) => {
        const BlockComponent = blockComponents[block.collection];
        return <BlockComponent key={block.collection} {...block} />;
      })}
    </>
  );
};
