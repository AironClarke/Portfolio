import { Editor } from '@tinymce/tinymce-react';
import config from './config';
import { useEffect, useState } from 'react';
import type { Editor as EditorInstance } from 'tinymce';
import ContentLoader from '../../common/ContentLoader';

const TinyMCE = (): JSX.Element => {
  const [editor, setEditor] = useState<EditorInstance>();
  const [isLoading, setIsLoading] = useState(true);

  const TinyApi = import.meta.env.VITE_TINYNCE;

  return (
    <div className="wordEditor">
      {isLoading && <ContentLoader />}
      <Editor
        apiKey={TinyApi}
        onInit={(_event, activeEditor) => {
          setEditor(activeEditor);
          setIsLoading(false); // Hide loader when editor is ready
        }}
        init={{
          ...config,
          plugins: 'lists link',
          branding: false,
          statusbar: false
        }}
      />
    </div>
  );
};

export default TinyMCE;
