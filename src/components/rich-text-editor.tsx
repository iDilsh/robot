'use client';

import { useCallback, useRef } from 'react';
import {
  MDXEditor,
  MDXEditorMethods,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  linkPlugin,
  imagePlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  tablePlugin,
  toolbarPlugin,
  BoldItalicUnderlineToggles,
  StrikeThroughSupSubToggles,
  ListsToggle,
  BlockTypeSelect,
  CreateLink,
  InsertImage,
  InsertThematicBreak,
  InsertCodeBlock,
  InsertTable,
  UndoRedo,
  diffSourcePlugin,
  DiffSourceToggleWrapper,
  Separator,
  linkDialogPlugin,
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';

interface RichTextEditorProps {
  markdown: string;
  onChange: (markdown: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ markdown, onChange, placeholder }: RichTextEditorProps) {
  const editorRef = useRef<MDXEditorMethods>(null);

  const handleEditorChange = useCallback(
    (newMarkdown: string) => {
      onChange(newMarkdown);
    },
    [onChange]
  );

  return (
    <div className="rich-text-editor-wrapper">
      <style>{`
        .rich-text-editor-wrapper {
          --accentColor: #7C3AED;
          --accentColor2: #6D28D9;
          --primaryTextColor: #1e293b;
          --secondaryTextColor: #64748b;
          --backgroundColor: #ffffff;
          --borderColor: #e2e8f0;
          --fontFamily: 'Inter', system-ui, -apple-system, sans-serif;
        }

        .rich-text-editor-wrapper [class*="_rootContentEditableWrapper"] {
          min-height: 350px;
          padding: 1rem;
          font-size: 0.875rem;
          line-height: 1.7;
        }

        .rich-text-editor-wrapper [class*="_rootContentEditableWrapper"]:focus-within {
          border-color: #7C3AED;
          box-shadow: 0 0 0 1px #7C3AED;
        }

        .rich-text-editor-wrapper .mdxeditor {
          border: 1px solid #e2e8f0;
          border-radius: 0.5rem;
          overflow: hidden;
          font-family: var(--fontFamily);
        }

        .rich-text-editor-wrapper .mdxeditor-toolbar {
          background: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
          padding: 0.375rem 0.5rem;
          gap: 0.125rem;
          flex-wrap: wrap;
        }

        .rich-text-editor-wrapper .mdxeditor-toolbar button {
          color: #475569;
          border-radius: 0.375rem;
          padding: 0.375rem;
          min-width: 2rem;
          height: 2rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s ease;
          border: none;
          background: transparent;
          cursor: pointer;
          font-size: 0.8125rem;
        }

        .rich-text-editor-wrapper .mdxeditor-toolbar button:hover {
          background: #f1f5f9;
          color: #7C3AED;
        }

        .rich-text-editor-wrapper .mdxeditor-toolbar button[data-state="active"],
        .rich-text-editor-wrapper .mdxeditor-toolbar button.active {
          background: #ede9fe;
          color: #7C3AED;
        }

        .rich-text-editor-wrapper .mdxeditor-toolbar select {
          border: 1px solid #e2e8f0;
          border-radius: 0.375rem;
          padding: 0.25rem 0.5rem;
          font-size: 0.8125rem;
          color: #475569;
          background: white;
          cursor: pointer;
          outline: none;
        }

        .rich-text-editor-wrapper .mdxeditor-toolbar select:focus {
          border-color: #7C3AED;
          box-shadow: 0 0 0 1px #7C3AED;
        }

        .rich-text-editor-wrapper [class*="_divider"] {
          background: #e2e8f0;
          width: 1px;
          height: 1.25rem;
          margin: 0 0.25rem;
        }

        /* Content area styling */
        .rich-text-editor-wrapper .mdxeditor-root-contenteditable {
          min-height: 350px;
        }

        .rich-text-editor-wrapper .mdxeditor-root-contenteditable h1 {
          font-size: 1.75rem;
          font-weight: 700;
          color: #1e293b;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          line-height: 1.3;
        }

        .rich-text-editor-wrapper .mdxeditor-root-contenteditable h2 {
          font-size: 1.375rem;
          font-weight: 700;
          color: #1e293b;
          margin-top: 1.25rem;
          margin-bottom: 0.5rem;
          line-height: 1.35;
          padding-bottom: 0.375rem;
          border-bottom: 1px solid #f1f5f9;
        }

        .rich-text-editor-wrapper .mdxeditor-root-contenteditable h3 {
          font-size: 1.125rem;
          font-weight: 600;
          color: #1e293b;
          margin-top: 1rem;
          margin-bottom: 0.5rem;
          line-height: 1.4;
        }

        .rich-text-editor-wrapper .mdxeditor-root-contenteditable h4 {
          font-size: 1rem;
          font-weight: 600;
          color: #334155;
          margin-top: 0.75rem;
          margin-bottom: 0.375rem;
        }

        .rich-text-editor-wrapper .mdxeditor-root-contenteditable p {
          margin-bottom: 0.75rem;
          color: #374151;
        }

        .rich-text-editor-wrapper .mdxeditor-root-contenteditable strong {
          font-weight: 700;
          color: #1e293b;
        }

        .rich-text-editor-wrapper .mdxeditor-root-contenteditable em {
          font-style: italic;
        }

        .rich-text-editor-wrapper .mdxeditor-root-contenteditable blockquote {
          border-left: 4px solid #7C3AED;
          background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%);
          padding: 0.875rem 1.25rem;
          margin: 1rem 0;
          border-radius: 0 0.5rem 0.5rem 0;
          color: #4c1d95;
          font-style: normal;
        }

        .rich-text-editor-wrapper .mdxeditor-root-contenteditable blockquote p {
          color: #4c1d95;
          margin-bottom: 0;
        }

        .rich-text-editor-wrapper .mdxeditor-root-contenteditable ul {
          list-style: none;
          padding-left: 1.25rem;
          margin: 0.75rem 0;
        }

        .rich-text-editor-wrapper .mdxeditor-root-contenteditable ul li {
          position: relative;
          padding-left: 1rem;
          margin-bottom: 0.375rem;
          color: #374151;
        }

        .rich-text-editor-wrapper .mdxeditor-root-contenteditable ul li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.5rem;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #7C3AED;
        }

        .rich-text-editor-wrapper .mdxeditor-root-contenteditable ol {
          padding-left: 1.5rem;
          margin: 0.75rem 0;
          list-style: decimal;
        }

        .rich-text-editor-wrapper .mdxeditor-root-contenteditable ol li {
          margin-bottom: 0.375rem;
          color: #374151;
          padding-left: 0.25rem;
        }

        .rich-text-editor-wrapper .mdxeditor-root-contenteditable ol li::marker {
          color: #7C3AED;
          font-weight: 600;
        }

        .rich-text-editor-wrapper .mdxeditor-root-contenteditable hr {
          border: none;
          height: 2px;
          background: linear-gradient(to right, transparent, #7C3AED, transparent);
          margin: 1.5rem 0;
        }

        .rich-text-editor-wrapper .mdxeditor-root-contenteditable code {
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          border-radius: 0.25rem;
          padding: 0.125rem 0.375rem;
          font-size: 0.8125rem;
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
          color: #7C3AED;
        }

        .rich-text-editor-wrapper .mdxeditor-root-contenteditable pre {
          background: #1e293b;
          border-radius: 0.5rem;
          padding: 1rem;
          margin: 1rem 0;
          overflow-x: auto;
        }

        .rich-text-editor-wrapper .mdxeditor-root-contenteditable pre code {
          background: transparent;
          border: none;
          color: #e2e8f0;
          padding: 0;
          font-size: 0.8125rem;
        }

        .rich-text-editor-wrapper .mdxeditor-root-contenteditable a {
          color: #7C3AED;
          text-decoration: underline;
          text-underline-offset: 2px;
        }

        .rich-text-editor-wrapper .mdxeditor-root-contenteditable a:hover {
          color: #6D28D9;
        }

        .rich-text-editor-wrapper .mdxeditor-root-contenteditable img {
          border-radius: 0.5rem;
          max-width: 100%;
          margin: 0.75rem 0;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
        }

        .rich-text-editor-wrapper .mdxeditor-root-contenteditable table {
          width: 100%;
          border-collapse: collapse;
          margin: 1rem 0;
          font-size: 0.8125rem;
        }

        .rich-text-editor-wrapper .mdxeditor-root-contenteditable table th,
        .rich-text-editor-wrapper .mdxeditor-root-contenteditable table td {
          border: 1px solid #e2e8f0;
          padding: 0.5rem 0.75rem;
          text-align: left;
        }

        .rich-text-editor-wrapper .mdxeditor-root-contenteditable table th {
          background: #f8fafc;
          font-weight: 600;
          color: #1e293b;
        }

        /* Source mode styling */
        .rich-text-editor-wrapper [class*="_sourceEditor"] {
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
          font-size: 0.8125rem;
          min-height: 350px;
          padding: 1rem;
          border: none;
          outline: none;
          width: 100%;
          resize: vertical;
          color: #1e293b;
          background: #fafafa;
        }

        /* Placeholder styling */
        .rich-text-editor-wrapper [class*="_placeholder"] {
          color: #94a3b8;
          font-style: italic;
        }

        /* Dialog/popover styling for link and image insertion */
        .rich-text-editor-wrapper [class*="_dialogContent"],
        .rich-text-editor-wrapper [role="dialog"] {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 0.75rem;
          box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
          padding: 1.5rem;
        }

        .rich-text-editor-wrapper [class*="_dialogContent"] input,
        .rich-text-editor-wrapper [role="dialog"] input {
          border: 1px solid #e2e8f0;
          border-radius: 0.375rem;
          padding: 0.5rem 0.75rem;
          font-size: 0.8125rem;
          width: 100%;
          outline: none;
        }

        .rich-text-editor-wrapper [class*="_dialogContent"] input:focus,
        .rich-text-editor-wrapper [role="dialog"] input:focus {
          border-color: #7C3AED;
          box-shadow: 0 0 0 1px #7C3AED;
        }

        .rich-text-editor-wrapper [class*="_dialogContent"] button[class*="primary"],
        .rich-text-editor-wrapper [role="dialog"] button[class*="primary"] {
          background: #7C3AED;
          color: white;
          border: none;
          border-radius: 0.375rem;
          padding: 0.5rem 1rem;
          cursor: pointer;
          font-size: 0.8125rem;
        }

        .rich-text-editor-wrapper [class*="_dialogOverlay"] {
          background: rgba(0,0,0,0.3);
        }
      `}</style>
      <MDXEditor
        ref={editorRef}
        markdown={markdown}
        onChange={handleEditorChange}
        placeholder={placeholder || 'Start writing your blog post... Use the toolbar to format text, add headings, lists, quotes, and more.'}
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          thematicBreakPlugin(),
          markdownShortcutPlugin(),
          linkPlugin(),
          linkDialogPlugin(),
          imagePlugin({
            imageAutocompleteSource: async () => [],
          }),
          codeBlockPlugin({ defaultCodeBlockLanguage: 'js' }),
          codeMirrorPlugin({
            codeBlockLanguages: {
              js: 'JavaScript',
              css: 'CSS',
              html: 'HTML',
              tsx: 'TypeScript',
              ts: 'TypeScript',
              python: 'Python',
              json: 'JSON',
              bash: 'Bash',
              sql: 'SQL',
            },
          }),
          tablePlugin(),
          diffSourcePlugin({
            viewMode: 'rich-text',
          }),
          toolbarPlugin({
            toolbarContents: () => (
              <>
                <UndoRedo />
                <Separator />
                <BlockTypeSelect />
                <Separator />
                <BoldItalicUnderlineToggles />
                <StrikeThroughSupSubToggles />
                <Separator />
                <ListsToggle />
                <Separator />
                <CreateLink />
                <InsertImage />
                <Separator />
                <InsertThematicBreak />
                <InsertCodeBlock />
                <InsertTable />
                <Separator />
                <DiffSourceToggleWrapper>
                  <></>
                </DiffSourceToggleWrapper>
              </>
            ),
          }),
        ]}
        contentEditableClassName="prose-editor"
      />
    </div>
  );
}
