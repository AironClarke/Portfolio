import { useContext, useEffect } from 'react';
import { UserContext } from 'src/context/UserContext';

import startIcon from '../assets/95icon.png';
import linked from '/folderTest.svg';
import sidebar from '/folderTest.svg';
import display from '../assets/display.png';
import project from '/folderTest.svg';
import resume from '/folderTest.svg';
import settings from '/folderTest.svg';

const StartMenu = (): JSX.Element => {
  const { startActive, setStartActive, handleShow, startRef } =
    useContext(UserContext);

  const footerItems = [
    {
      className: 'sidebar_popup',
      imgSrc: sidebar,
      imgAlt: 'sidebar'
    },
    {
      className: 'linked',
      imgSrc: linked,
      imgAlt: 'linked',
      style: { borderRadius: '5px' },
      spanText: 'Linked'
    },
    {
      className: 'project',
      imgSrc: project,
      imgAlt: 'project',
      spanText: 'Project',
      onClick: () => handleShow('Resume')
    },
    {
      className: 'resume',
      imgSrc: resume,
      imgAlt: 'resume',
      spanText: 'Resume',
      onClick: () => handleShow('Resume')
    },
    {
      className: 'shutdownicon',
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
          {footerItems.map((item, index) => (
            <li
              key={index}
              className={(item.className, 'testSize')}
              onClick={item.onClick}
            >
              {item.imgSrc && (
                <img
                  src={item.imgSrc}
                  alt={item.imgAlt}
                  style={item.style || {}}
                />
              )}
              {item.spanText && <span>{item.spanText}</span>}
            </li>
          ))}
        </nav>
      )}
    </>
  );
};

export default StartMenu;
