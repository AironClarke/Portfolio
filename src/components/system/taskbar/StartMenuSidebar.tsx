import { useContext } from 'react';
import { UserContext } from 'src/context/UserContext';

import Github from '/githubLogo.svg';
import Linkedin from '/linkedinLogo.svg';
import OffButton from '/offIcon.svg';

const StartMenuSidebar = () => {
  const { handleDoubleClickEnterLink } = useContext(UserContext);

  const footerSidebarItems = [
    {
      name: 'Github',
      imgSrc: Github,
      imgAlt: 'Github Icon',
      onClick: () => handleDoubleClickEnterLink('Github')
    },
    {
      name: 'Linkedin',
      imgSrc: Linkedin,
      imgAlt: 'Linkedin Icon',
      onClick: () => handleDoubleClickEnterLink('Linkedin')
    },
    {
      name: 'Restart',
      imgSrc: OffButton,
      imgAlt: 'Off Button Logo',
      onClick: () => window.location.reload() // Refresh the whole app
    }
  ];

  return (
    <ol className="startMenuSidebar">
      {footerSidebarItems.map((item, index) => (
        <li
          key={index}
          className="startMenuSidebarIcon"
          onClick={item.onClick}
          title={item.name}
        >
          <img
            src={item.imgSrc}
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

export default StartMenuSidebar;
