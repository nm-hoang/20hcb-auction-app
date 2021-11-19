declare module '@editorjs/marker' {
  import {
    BlockTool, BlockToolData,
  } from '@editorjs/editorjs';

  export default class Marker implements BlockTool {
    save(block: HTMLElement): BlockToolData

    render(): HTMLElement
  }
}
