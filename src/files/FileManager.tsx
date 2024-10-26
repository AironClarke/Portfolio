import { useContext } from 'react';
import FileEntry from './FileEntry';
import { UserContext, UserContextType } from 'src/context/UserContext';
import { Rnd } from 'react-rnd';

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
      {iconState.map((icon) => (
        // <Rnd
        //   style={style}
        //   default={{
        //     x: 0,
        //     y: 0,
        //     width: 320,
        //     height: 200
        //   }}
        // >
        <FileEntry
          name={icon.name}
          icon={imageMapping(icon.pic) || '|| operator test'}
          onDoubleClick={() => handleShow(icon.name)}
        />
        // </Rnd>
      ))}
    </ol>
  );
};

export default FileManager;
