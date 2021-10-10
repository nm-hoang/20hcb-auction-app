declare module '@editorjs/warning' {
  import {
    BlockTool, BlockToolData,
  } from '@editorjs/editorjs';

  export default class Warning implements BlockTool {
    save(block: HTMLElement): BlockToolData

    render(): HTMLElement
  }
}
