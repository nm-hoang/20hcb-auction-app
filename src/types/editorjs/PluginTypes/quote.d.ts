declare module '@editorjs/quote' {
  import {
    BlockTool, BlockToolData,
  } from '@editorjs/editorjs';

  export default class Quote implements BlockTool {
    save(block: HTMLElement): BlockToolData

    render(): HTMLElement
  }
}
