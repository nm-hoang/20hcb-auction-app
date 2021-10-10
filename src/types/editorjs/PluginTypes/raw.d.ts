declare module '@editorjs/raw' {
  import {
    BlockTool, BlockToolData,
  } from '@editorjs/editorjs';

  export default class Raw implements BlockTool {
    save(block: HTMLElement): BlockToolData

    render(): HTMLElement
  }
}
