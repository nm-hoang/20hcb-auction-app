declare module '@editorjs/table' {
  import {
    BlockTool, BlockToolData,
  } from '@editorjs/editorjs';

  export default class Table implements BlockTool {
    save(block: HTMLElement): BlockToolData

    render(): HTMLElement
  }
}
