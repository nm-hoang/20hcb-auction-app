declare module '@editorjs/image' {
  import {
    BlockTool, BlockToolData,
  } from '@editorjs/editorjs';

  export default class Image implements BlockTool {
    save(block: HTMLElement): BlockToolData

    render(): HTMLElement
  }
}
