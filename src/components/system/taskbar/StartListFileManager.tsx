import { useContext } from 'react';
import { UserContext } from 'src/context/UserContext';

import linked from '/folderTest.svg';
import sidebar from '/folderTest.svg';
import project from '/folderTest.svg';
import Portfolio from '/folderTest.svg';
import settings from '/folderTest.svg';
import StartMenuFileEntry from './StartMenuFileEntry';

const StartListFileManager = () => {
  const { handleShow } = useContext(UserContext);

  const footerItems = [
    {
      name: 'sidebar_popup',
      imgSrc: sidebar,
      imgAlt: 'sidebar'
    },
    {
      name: 'linked',
      imgSrc: linked,
      imgAlt: 'linked',
      style: { borderRadius: '5px' },
      spanText: 'Linked'
    },
    {
      name: 'project',
      imgSrc: project,
      imgAlt: 'project',
      spanText: 'Project',
      onClick: () => handleShow('ThisPc')
    },
    {
      name: 'Portfolio',
      imgSrc: Portfolio,
      imgAlt: 'Portfolio',
      spanText: 'Portfolio',
      onClick: () => handleShow('Portfolio')
    },
    {
      name: 'shutdownicon',
      imgSrc: settings,
      imgAlt: 'shutdownicon',
      spanText: 'Settings',
      onClick: () => handleShow('Portfolio')
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
