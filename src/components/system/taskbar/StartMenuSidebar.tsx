import { useContext } from 'react';
import { UserContext } from 'src/context/UserContext';

import linked from '/folderTest.svg';
import sidebar from '/folderTest.svg';
import StartMenuFileEntry from './StartMenuFileEntry';

const StartMenuSidebar = () => {
  const { handleShow } = useContext(UserContext);

  const footerSidebarItems = [
    {
      name: 'Folder',
      imgSrc: linked,
      imgAlt: 'linked'
    },
    {
      name: 'Power',
      imgSrc: sidebar,
      imgAlt: 'placeholder'
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
