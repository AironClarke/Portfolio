import { useContext } from 'react';
import FileEntry from './FileEntry';
import { UserContext, UserContextType } from 'src/context/UserContext';
import { Rnd } from 'react-rnd';
import rndDefaults from 'src/utils/rndDefaults';

const FileManager = (): JSX.Element => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error('no user context found');
  }

  const { iconState, imageMapping, handleShow } = userContext;

  const style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'solid 1px #ddd',
    background: '#f0f0f0'
  };

  return (
    <ol className="fileManager">
      {iconState
        .filter((icon) => icon.folderId == 'Desktop')
        .map((icon) => (
          <div>
            <Rnd
              key={icon.name}
              enableResizing={false}
              bounds={'.fullscreen'}
              className="fileEntry"
            >
              <FileEntry
                name={icon.name}
                icon={imageMapping(icon.pic) || '|| operator test'}
                onDoubleClick={() => {
                  handleShow(icon.name);
                }}
              />
            </Rnd>
          </div>
        ))}
    </ol>
  );
};

export default FileManager;
