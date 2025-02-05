import { useContext, useEffect, useRef, useState } from 'react';
import { Rnd } from 'react-rnd';
import Titlebar from 'src/components/system/window/Titlebar';
import { UserContext } from 'src/context/UserContext';
import useResizable from 'src/hooks/useResizable';
import rndDefaults from 'src/utils/rndDefaults';
import useDraggable from 'src/hooks/useDraggable';
import FileEntry from 'src/files/FileEntry';
import { imageMapping } from 'src/functions/AppFunction';
import { motion } from 'framer-motion';
import useWindowTransitions from 'src/hooks/useWindowTransitions';
import Navigation from 'src/components/system/fileExplorer/Navigation';
import directoryImage from 'public/folderTest.svg';
import StatusBar from 'src/components/system/fileExplorer/StatusBar';

function CloneFolder() {
  const userContext = useContext(UserContext);

  const motionProps = useWindowTransitions();

  if (!userContext) {
    throw new Error('userContext is undefined');
  }

  const {
    CloneExpand,
    setCloneExpand,
    inlineStyleExpand,
    inlineStyle,
    handleSetFocusItemTrue,
    iconState,
    setFolderCount,
    folderCount,
    handleShow,
    ThisPcExpand
  } = userContext;

  const maximized = CloneExpand.expand;
  const { height, width, updateSize } = useResizable(maximized);
  const { x, y, updatePosition, resetPosition } = useDraggable(maximized);

  const folderOffset = useRef<number | null>(null);
  const [hasMoved, setHasMoved] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false); // New state
  const [key, setKey] = useState(0); // State to trigger re-render

  const directory = ['ThisPc', 'CloneFolder'];
  const directoryImg = (
    <img
      src={directoryImage}
      className="directoryImg"
      alt="Directory Icon"
      width={18}
      height={18}
    />
  );

  useEffect(() => {
    if (CloneExpand.show) {
      // Set the folder offset only if it hasn't been set yet
      if (folderOffset.current === null) {
        setFolderCount((prev) => prev + 1);
        folderOffset.current = folderCount * 26;
      }
      setIsInitialized(true); // Trigger rendering only after offset is set
    } else {
      // Reset offset and movement tracking on close
      if (folderOffset.current !== null) {
        setFolderCount((prev) => prev - 1);
        folderOffset.current = null;
        setHasMoved(false);
        setIsInitialized(false); // Reset initialization on close
      }
    }
  }, [CloneExpand.show]);

  const refreshHandler = () => {
    console.log('Refresh triggered');
    setKey((prevKey) => prevKey + 1);
  }; // Increment key to force re-render

  // Conditionally apply the offset only if the window has not been moved
  const offsetX = hasMoved ? x : x + (folderOffset.current || 0);
  const offsetY = hasMoved ? y : y + (folderOffset.current || 0);

  // Render component only after initialization
  if (!isInitialized) return null;

  return (
    <Rnd
      key={key} // Set key to force component re-creati
      dragHandleClassName="draggable-titlebar"
      disableDragging={maximized}
      enableResizing={!maximized}
      size={{ height, width }}
      onResizeStop={updateSize}
      position={{ x: offsetX, y: offsetY }}
      onDragStart={() => handleSetFocusItemTrue('CloneFolder')}
      onDragStop={(e, data) => {
        updatePosition(e, data);
        if (!hasMoved) setHasMoved(true); // Mark as moved permanently
      }}
      {...rndDefaults}
      style={
        CloneExpand.expand
          ? inlineStyleExpand('CloneFolder')
          : inlineStyle('CloneFolder')
      }
    >
      <motion.section
        className="titlebarContainer window"
        style={
          CloneExpand.expand
            ? inlineStyleExpand('CloneFolder')
            : inlineStyle('CloneFolder')
        }
        {...motionProps}
        onClick={() => handleSetFocusItemTrue('CloneFolder')}
      >
        <Titlebar
          icon="thisPC.svg"
          title="CloneFolder"
          PortfolioExpand={CloneExpand}
          setPortfolioExpand={setCloneExpand}
          resetPosition={resetPosition}
        />
        <Navigation
          directory={directory}
          directoryImg={directoryImg}
          refreshHandler={
            refreshHandler
          } /* Pass refreshHandler to Navigation */
          upOneLevel="ThisPc"
          upOneLevelStyle={ThisPcExpand}
        />
        <ol className="folderFileManager customScrollbar">
          {iconState
            .filter((icon) => icon.folderId == 'ThisPc')
            .map((icon) => (
              <FileEntry
                name={icon.name}
                icon={imageMapping(icon.pic) || '|| operator test'}
                onDoubleClick={() => handleShow(icon.name)}
                onClick={() => console.log(icon)}
              />
            ))}
        </ol>
        <StatusBar
          count={iconState.filter((icon) => icon.folderId == 'ThisPc').length}
        />
      </motion.section>
    </Rnd>
  );
}

export default CloneFolder;
