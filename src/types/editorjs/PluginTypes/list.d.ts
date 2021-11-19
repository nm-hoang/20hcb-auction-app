declare module '@editorjs/list' {
  import {
    BlockTool, BlockToolData,
  } from '@editorjs/editorjs';

  export default class List implements BlockTool {
    save(block: HTMLElement): BlockToolData

    render(): HTMLElement
  }
}
