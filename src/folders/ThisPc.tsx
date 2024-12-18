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
import directoryImage from 'public/thisPC.svg';
import StatusBar from 'src/components/system/fileExplorer/StatusBar';
import FileEntryList from 'src/files/FileEntryList';
import FileManagerContainer from './FolderManagerContainer';
import FileManagerContainerList from './FileManagerContainerList';

function ThisPc() {
  const userContext = useContext(UserContext);

  const motionProps = useWindowTransitions();

  if (!userContext) {
    throw new Error('userContext is undefined');
  }

  const {
    ThisPcExpand,
    setThisPcExpand,
    inlineStyleExpand,
    inlineStyle,
    handleSetFocusItemTrue,
    iconState,
    setFolderCount,
    folderCount,
    handleShow,
    viewStyle,
    setViewStyle,
    handleViewStyleChange
  } = userContext;

  const maximized = ThisPcExpand.expand;
  const { height, width, updateSize } = useResizable(maximized);
  const { x, y, updatePosition, resetPosition } = useDraggable(maximized);

  const folderOffset = useRef<number | null>(null);
  const [hasMoved, setHasMoved] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false); // New state
  const [key, setKey] = useState(0); // State to trigger re-render

  const directory = ['This PC'];
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
    if (ThisPcExpand.show) {
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
  }, [ThisPcExpand.show]);

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
      onDragStart={() => handleSetFocusItemTrue('ThisPc')}
      onDragStop={(e, data) => {
        updatePosition(e, data);
        if (!hasMoved) setHasMoved(true); // Mark as moved permanently
      }}
      {...rndDefaults}
      style={
        ThisPcExpand.expand
          ? inlineStyleExpand('ThisPc')
          : inlineStyle('ThisPc')
      }
    >
      <motion.section
        className="titlebarContainer window"
        style={
          ThisPcExpand.expand
            ? inlineStyleExpand('ThisPc')
            : inlineStyle('ThisPc')
        }
        {...motionProps}
        onClick={() => handleSetFocusItemTrue('ThisPc')}
      >
        <Titlebar
          icon="thisPC.svg"
          title="This PC"
          PortfolioExpand={ThisPcExpand}
          setPortfolioExpand={setThisPcExpand}
          resetPosition={resetPosition}
        />
        <Navigation
          directory={directory}
          directoryImg={directoryImg}
          refreshHandler={refreshHandler}
        />

        {viewStyle === 'list' ? (
          <FileManagerContainer
            iconState={iconState}
            imageMapping={imageMapping}
            handleShow={handleShow}
          />
        ) : (
          <FileManagerContainerList
            iconState={iconState}
            imageMapping={imageMapping}
            handleShow={handleShow}
          />
        )}

        <StatusBar
          count={iconState.filter((icon) => icon.folderId == 'ThisPc').length}
          onChangeViewStyle={handleViewStyleChange}
          activeViewStyle={viewStyle}
        />
      </motion.section>
    </Rnd>
  );
}

export default ThisPc;
