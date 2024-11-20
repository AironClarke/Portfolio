import type { Editor as EditorInstance } from 'tinymce';

export const setReadOnlyMode = (editor: EditorInstance): void => {
  const ONE_TIME_PASSIVE_EVENT = {
    once: true,
    passive: true
  } as AddEventListenerOptions;

  const toolbars = editor.editorContainer?.querySelector('.tox-editor-header');

  if (toolbars instanceof HTMLDivElement) {
    toolbars.title = 'Click toolbar item to switch to design mode.';
    toolbars.addEventListener(
      'click',
      () => {
        toolbars.removeAttribute('title');
        editor.setMode('design');
      },
      ONE_TIME_PASSIVE_EVENT
    );
  }

  editor.setMode('readonly');
};
