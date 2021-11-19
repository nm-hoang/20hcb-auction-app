import React, { useMemo, useState } from 'react';
import { createEditor, Descendant } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { CustomElement } from '../../types/editorjs/slateEditorType';

function SlateEditor(): JSX.Element {
  const initialValue: CustomElement[] = [{ type: 'paragraph', children: [{ text: 'What' }] }];
  const [value, setValue] = useState<Descendant[]>(initialValue);
  const editor = useMemo(() => withReact(createEditor()), []);

  return (
    <>
      <Slate editor={editor} value={value} onChange={setValue}>
        <Editable />
      </Slate>
    </>
  );
}

export default SlateEditor;
