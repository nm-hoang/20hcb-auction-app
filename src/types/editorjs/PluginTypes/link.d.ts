declare module '@editorjs/link' {
  import {
    BlockTool, BlockToolData,
  } from '@editorjs/editorjs';

  export default class Link implements BlockTool {
    save(block: HTMLElement): BlockToolData

    render(): HTMLElement
  }
}
