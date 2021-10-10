declare module '@editorjs/inline-code' {
  import {
    BlockTool, BlockToolData,
  } from '@editorjs/editorjs';

  export default class InlineCode implements BlockTool {
    save(block: HTMLElement): BlockToolData

    render(): HTMLElement
  }
}
