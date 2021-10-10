declare module '@editorjs/embed' {
  import {
    BlockTool, BlockToolData,
  } from '@editorjs/editorjs';

  export default class Embed implements BlockTool {
    save(block: HTMLElement): BlockToolData

    render(): HTMLElement
  }
}
