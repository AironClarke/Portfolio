import { useContext, useEffect, useState } from 'react';
import FileEntry from './FileEntry';
import { UserContext, UserContextType } from 'src/context/UserContext';
import { Rnd } from 'react-rnd';
import rndDefaults from 'src/utils/rndDefaults';

const FileManager = (): JSX.Element => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error('no user context found');
  }

  const {
    iconState,
    imageMapping,
    handleShow,
    isTouchDevice,
    handleShowMobile,
    hoveredIcon,
    setHoveredIcon,
    lastTapTime,
    setLastTapTime,
    openedIcon,
    setOpenedIcon
  } = userContext;

  const style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'solid 1px #ddd',
    background: '#f0f0f0'
  };

  // Ensure no item is hovered after a refresh
  useEffect(() => {
    setHoveredIcon(null);
  }, []); // Runs only once on component mount

  const handleOpenIcon = (iconName: string) => {
    // Briefly change background color for opened icon
    setOpenedIcon(iconName);

    // Reset the background color after a short delay (500ms)
    setTimeout(() => {
      setOpenedIcon(null);
    }, 200);

    // Open the icon content
    if (iconName === 'Duke Nukem 3D') {
      handleShow('Monaco Editor');
    } else {
      handleShow(iconName);
    }
  };

  const handleOpenIconMobile = (iconName: string) => {
    // Open the icon content
    console.log('ON TOUCH WORSK !!!!!!!!!!11');
    if (iconName == 'Duke Nukem 3D') {
      setHoveredIcon(iconName); // Update hovered icon
      handleShowMobile('Monaco Editor');
    }
    setHoveredIcon(iconName); // Update hovered icon
    handleShowMobile(iconName);
  };

  return (
    <ol className={`fileManager ${isTouchDevice ? 'touchDevice' : ''}`}>
      {iconState
        .filter((icon) => icon.folderId == 'Desktop')
        .map((icon) => (
          <div>
            <Rnd key={icon.name} enableResizing={false} bounds={'.fullscreen'}>
              <FileEntry
                className={`fileEntry ${hoveredIcon === icon.name ? 'hovered' : ''} ${openedIcon === icon.name ? 'opened' : ''}`}
                name={icon.name}
                icon={imageMapping(icon.pic) || '|| operator test'}
                onDoubleClick={() => {
                  console.log(icon.name);
                  handleOpenIcon(icon.name);
                }}
                onClick={
                  !isTouchDevice
                    ? (e) => {
                        e.stopPropagation();
                        setHoveredIcon(icon.name); // Update hovered icon
                      }
                    : undefined
                }
                onTouchStart={() => {
                  handleOpenIconMobile(icon.name);
                }}
              />
            </Rnd>
          </div>
        ))}
    </ol>
  );
};

export default FileManager;
