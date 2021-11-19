declare module '@editorjs/checklist' {
  import {
    BlockTool, BlockToolData,
  } from '@editorjs/editorjs';

  export default class Checklist implements BlockTool {
    save(block: HTMLElement): BlockToolData

    render(): HTMLElement
  }
}
