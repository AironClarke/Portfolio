import { useContext } from 'react';
import { UserContext } from 'src/context/UserContext';

import Github from '/githubLogo.svg';
import Linkedin from '/linkedinLogo.svg';
import OffButton from '/offIcon.svg';

const StartMenuSidebar = () => {
  const { handleShow } = useContext(UserContext);

  const footerSidebarItems = [
    {
      name: 'Github',
      imgSrc: Github,
      imgAlt: 'Github Icon'
    },
    {
      name: 'Linkedin',
      imgSrc: Linkedin,
      imgAlt: 'Linkedin Icon'
    },
    {
      name: 'Restart',
      imgSrc: OffButton,
      imgAlt: 'Off Button Logo'
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
