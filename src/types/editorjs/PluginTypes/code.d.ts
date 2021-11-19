declare module '@editorjs/code' {
  import {
    BlockTool, BlockToolData,
  } from '@editorjs/editorjs';

  export default class Code implements BlockTool {
    save(block: HTMLElement): BlockToolData

    render(): HTMLElement
  }
}
