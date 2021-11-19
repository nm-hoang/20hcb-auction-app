declare module '@editorjs/simple-image' {
  import {
    BlockTool, BlockToolData,
  } from '@editorjs/editorjs';

  export default class SimpleImage implements BlockTool {
    save(block: HTMLElement): BlockToolData

    render(): HTMLElement
  }
}
