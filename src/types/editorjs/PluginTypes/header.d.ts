declare module '@editorjs/header' {
  import {
    BlockTool, BlockToolData,
  } from '@editorjs/editorjs';

  export default class Header implements BlockTool {
    save(block: HTMLElement): BlockToolData

    render(): HTMLElement
  }
}
