import { BlockType } from "@/types";
import React from "react";
import { Bounce, ToastContainer } from "react-toastify";

export const PageBuilder: React.FC<{
  blockComponents: Record<string, React.FC<BlockType>>;
  blocks: Array<{ collection: string; sort?: number } & Partial<BlockType>>;
}> = ({ blockComponents, blocks }) => {
 const sortedBlocks = blocks
    .filter((block): block is BlockType => {
      const key = block.collection || block.__typename;
      return typeof key === "string" && key in blockComponents;
    })
    .sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0));

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={10000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
       {sortedBlocks.map((block, i) => {
        const key = block.collection || block.__typename;
        const BlockComponent = blockComponents[key!];
        if (!BlockComponent) {
          return (
            <div key={i} style={{ color: "red" }}>
              Missing component for: {key}
            </div>
          );
        }
        return <BlockComponent key={i} {...block} />;
      })}
    </>
  );
};