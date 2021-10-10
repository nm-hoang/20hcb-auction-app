import React, { useCallback, useRef } from 'react';
import EditorJsContainer from 'react-editor-js';
import { Button } from 'antd';
import { toolsType } from '../../types/editorjs/toolsType';

export interface IEditorProps {
  readOnly?: boolean
  data?: any
}

function Editor(props: IEditorProps) {
  const { readOnly, data } = props;
  const editorRef = useRef<EditorJsContainer>();

  // const editor: any = new EditorJsContainer({
  //   holder: 'editorjs',
  //   instanceRef: () => editor,
  //   onReady: () => {
  //     console.log('Ready');
  //     editor.save().then((outputData: OutputData) => {
  //       console.log(JSON.stringify(outputData));
  //     }).catch((error: any) => {
  //       console.log(error.message);
  //     });
  //   },
  //   onChange: (api, newData) => {
  //     console.log('Changed');
  //     console.log(JSON.stringify(newData));
  //   },
  //   minHeight: 50,
  // });

  editorRef.current?.instance?.isReady.then((dData) => {
    console.log(dData);
  });

  const handleSave = useCallback(async () => {
    console.log('Saving');
    // @ts-ignore
    editorRef.current?.handleChange((api) => {
      console.log(api);
    });

    // editorRef.current?.save().then(async (outputData: OutputData) => {
    //   console.log('No error');
    //   console.log(outputData);
    //   console.log(JSON.stringify(outputData));
    // }).catch((error: any) => {
    //   console.log('Error');
    //   console.log(error.message);
    // });
  }, []);

  return (
    <>
      <EditorJsContainer
        tools={toolsType}
        readOnly={readOnly}
        data={data}
        instanceRef={() => editorRef}
      />

      {readOnly || (
      <Button
        type="primary"
        onClick={handleSave}
      >
        Save
      </Button>
      )}
    </>
  );
}

export default Editor;
