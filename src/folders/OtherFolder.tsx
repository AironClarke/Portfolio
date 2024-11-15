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

function OtherFolder() {
  const userContext = useContext(UserContext);

  const motionProps = useWindowTransitions();

  if (!userContext) {
    throw new Error('userContext is undefined');
  }

  const {
    OtherExpand,
    setOtherExpand,
    inlineStyleExpand,
    inlineStyle,
    handleSetFocusItemTrue,
    iconState,
    setFolderCount,
    folderCount
  } = userContext;

  const maximized = OtherExpand.expand;
  const { height, width, updateSize } = useResizable(maximized);
  const { x, y, updatePosition, resetPosition } = useDraggable(maximized);

  const folderOffset = useRef<number | null>(null);
  const [hasMoved, setHasMoved] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false); // New state

  useEffect(() => {
    if (OtherExpand.show) {
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
  }, [OtherExpand.show]);

  function handleShow(name: string): void {
    throw new Error('Function not implemented.');
  }

  // Conditionally apply the offset only if the window has not been moved
  const offsetX = hasMoved ? x : x + (folderOffset.current || 0);
  const offsetY = hasMoved ? y : y + (folderOffset.current || 0);

  // Render component only after initialization
  if (!isInitialized) return null;

  return (
    <Rnd
      dragHandleClassName="draggable-titlebar"
      disableDragging={maximized}
      enableResizing={!maximized}
      size={{ height, width }}
      onResizeStop={updateSize}
      position={{ x: offsetX, y: offsetY }}
      onDragStart={() => handleSetFocusItemTrue('Other')}
      onDragStop={(e, data) => {
        updatePosition(e, data);
        if (!hasMoved) setHasMoved(true); // Mark as moved permanently
      }}
      {...rndDefaults}
      style={
        OtherExpand.expand ? inlineStyleExpand('Other') : inlineStyle('Other')
      }
    >
      <motion.section
        className="titlebarContainer window"
        style={
          OtherExpand.expand ? inlineStyleExpand('Other') : inlineStyle('Other')
        }
        {...motionProps}
        onClick={() => handleSetFocusItemTrue('Other')}
      >
        <Titlebar
          icon="thisPC.svg"
          title="Other"
          ResumeExpand={OtherExpand}
          setResumeExpand={setOtherExpand}
          resetPosition={resetPosition}
        />
        <ol className="folderFileManager">
          {iconState
            .filter((icon) => icon.folderId == 'Other')
            .map((icon) => (
              <FileEntry
                name={icon.name}
                icon={imageMapping(icon.pic) || '|| operator test'}
                onDoubleClick={() => handleShow(icon.name)}
              />
            ))}
        </ol>
      </motion.section>
    </Rnd>
  );
}

export default OtherFolder;
