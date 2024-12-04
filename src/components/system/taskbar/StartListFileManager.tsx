import { useContext } from 'react';
import { UserContext } from 'src/context/UserContext';

import DukeNukem from '/DukeNukem3DIcon.png';
import Portfolio from '/folderFilled.ico';
import TinyMCE from '/tinymcelogo.svg';
import VsCode from '/VSCodeIcon.svg';
import Resume from '/pdfIcon.svg';
import StartMenuFileEntry from './StartMenuFileEntry';

const StartListFileManager = () => {
  const { handleShow } = useContext(UserContext);

  const footerItems = [
    {
      name: 'Portfolio',
      imgSrc: Portfolio,
      imgAlt: 'Portfolio Image',
      onClick: () => handleShow('Portfolio')
    },
    {
      name: 'Resume',
      imgSrc: Resume,
      imgAlt: 'PDF Icon Image',
      onClick: () => handleShow('Resume')
    },
    {
      name: 'Duke Nukem 3D',
      imgSrc: DukeNukem,
      imgAlt: 'Duke Nukem Logo',
      onClick: () => {
        handleShow('TinyMCE'), handleShow('Duke Nukem 3D');
      }
    },
    {
      name: 'TinyMCE',
      imgSrc: TinyMCE,
      imgAlt: 'TinyMCE Logo',
      onClick: () => handleShow('TinyMCE')
    },
    {
      name: 'Monaco Editor',
      imgSrc: VsCode,
      imgAlt: 'Monaco Editor Logo',
      onClick: () => handleShow('Monaco Editor')
    }
  ];

  return (
    <ol className="startListFileManager">
      {footerItems.map((item, index) => (
        <li
          key={index}
          className="startFileEntry"
          onClick={item.onClick}
          title={item.name}
        >
          <StartMenuFileEntry
            name={item.name}
            icon={item.imgSrc || '|| operator test'}
            alt={item.imgAlt}
            onDoubleClick={() => {
              handleShow(item.name);
            }}
          />
        </li>
      ))}
    </ol>
  );
};

export default StartListFileManager;
