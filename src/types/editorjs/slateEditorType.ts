import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';

type CustomText = { text: string }

export type HeadingElement = {
  type: 'heading'
  level: number
  children: CustomText[]
}

export type CustomElement = { type: 'paragraph'; children: CustomText[] } | HeadingElement

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}
