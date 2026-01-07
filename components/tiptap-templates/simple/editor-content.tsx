import React from "react";
import "@/components/tiptap-node/blockquote-node/blockquote-node.scss";
import "@/components/tiptap-node/code-block-node/code-block-node.scss";
import "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss";
import "@/components/tiptap-node/list-node/list-node.scss";
import "@/components/tiptap-node/image-node/image-node.scss";
import "@/components/tiptap-node/heading-node/heading-node.scss";
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss";
import "@/components/tiptap-templates/simple/simple-editor.scss";

const ContentEditor = ({ content }: { content: string }) => {
  return (
    <div className='simple-editor-content max-w-full!'>
      <div
        className='text-sm tiptap ProseMirror simple-editor text-muted-foreground proseMirror prose-neutral'
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default ContentEditor;
