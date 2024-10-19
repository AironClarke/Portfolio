import { useContext } from 'react';
import FileEntry from './FileEntry';
import { UserContext, UserContextType } from 'src/context/UserContext';
import Draggable from 'react-draggable';

const FileManager = (): JSX.Element => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error('no user context found');
  }

  const { iconState, imageMapping, handleShow } = userContext;

  return (
    <ol className="fileManager">
      {iconState.map((icon) => (
        <Draggable
          key={icon.name}
          cancel=""
          axis="both"
          handle={'.icon'}
          grid={[10, 10]}
          scale={1}
          bounds=".bound"
        >
          <FileEntry
            name={icon.name}
            icon={imageMapping(icon.pic) || '|| operator test'}
            onDoubleClick={() => handleShow(icon.name)}
          />
        </Draggable>
      ))}
    </ol>
  );
};

export default FileManager;
