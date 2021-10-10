declare module '@editorjs/delimiter' {
  import {
    BlockTool, BlockToolData,
  } from '@editorjs/editorjs';

  export default class Delimiter implements BlockTool {
    save(block: HTMLElement): BlockToolData

    render(): HTMLElement
  }
}
