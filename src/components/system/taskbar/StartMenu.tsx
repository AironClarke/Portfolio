import { useContext, useEffect } from 'react';
import { UserContext } from 'src/context/UserContext';

import startIcon from '../assets/95icon.png';
import linked from '/folderTest.svg';
import sidebar from '/folderTest.svg';
import display from '../assets/display.png';
import project from '/folderTest.svg';
import resume from '/folderTest.svg';
import settings from '/folderTest.svg';
import FileEntry from 'src/files/FileEntry';
import StartMenuFileEntry from './StartMenuFileEntry';

const StartMenu = (): JSX.Element => {
  const { startActive, setStartActive, handleShow, startRef } =
    useContext(UserContext);

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
      onClick: () => handleShow('Resume')
    },
    {
      name: 'resume',
      imgSrc: resume,
      imgAlt: 'resume',
      spanText: 'Resume',
      onClick: () => handleShow('Resume')
    },
    {
      name: 'shutdownicon',
      imgSrc: settings,
      imgAlt: 'shutdownicon',
      spanText: 'Settings',
      onClick: () => handleShow('Resume')
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the start button
      if (startRef.current && !startRef.current.contains(event.target)) {
        setStartActive(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <>
      {startActive && (
        <nav
          className="startMenu"
          style={{ display: startActive ? '' : 'none' }}
        >
          <ol className="startListFileManager">
            {footerItems.map((item, index) => (
              <li key={index} className="startFileEntry" onClick={item.onClick}>
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
        </nav>
      )}
    </>
  );
};

export default StartMenu;
