import { useContext, useEffect, useRef, useState } from 'react';
import { Rnd } from 'react-rnd';
import Titlebar from 'src/components/system/window/Titlebar';
import { UserContext } from 'src/context/UserContext';
import useResizable from 'src/hooks/useResizable';
import rndDefaults from 'src/utils/rndDefaults';
import useDraggable from 'src/hooks/useDraggable';
import { motion } from 'framer-motion';
import useWindowTransitions from 'src/hooks/useWindowTransitions';
import directoryImage from 'public/folderTest.svg';

function AboutMe() {
  const userContext = useContext(UserContext);

  const motionProps = useWindowTransitions();

  if (!userContext) {
    throw new Error('userContext is undefined');
  }

  const {
    AboutMeExpand,
    setAboutMeExpand,
    inlineStyleExpand,
    inlineStyle,
    handleSetFocusItemTrue,
    folderCount,
    setFolderCount
  } = userContext;

  const maximized = AboutMeExpand.expand;
  //  TODO: make window not draggable when its hidden
  // const test = PortfolioExpand.hide;
  const folderOffset = useRef<number | null>(null);
  const [hasMoved, setHasMoved] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false); // New state
  const [key, setKey] = useState(0); // State to trigger re-render

  useEffect(() => {
    if (AboutMeExpand.show) {
      if (folderOffset.current === null) {
        setFolderCount((prev) => prev + 1); // Update shared folder count
        folderOffset.current = folderCount * 26; // Calculate and store unique offset for this instance
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
  }, [AboutMeExpand.show]);

  const refreshHandler = () => {
    console.log('Refresh triggered');
    setKey((prevKey) => prevKey + 1);
  }; // Increment key to force re-render

  const { height, width, updateSize } = useResizable(maximized);
  const { x, y, updatePosition, resetPosition } = useDraggable(maximized);

  // Conditionally apply the offset only if the window has not been moved
  const offsetX = hasMoved ? x : x + (folderOffset.current || 0);
  const offsetY = hasMoved ? y : y + (folderOffset.current || 0);

  // Render component only after initialization
  if (!isInitialized) return null;

  return (
    <Rnd
      key={key} // Set key to force component re-creati
      dragHandleClassName="draggable-titlebar"
      style={
        AboutMeExpand.expand
          ? inlineStyleExpand('AboutMe')
          : inlineStyle('AboutMe')
      }
      disableDragging={maximized}
      enableResizing={!maximized}
      size={{ height, width }}
      onResizeStop={updateSize}
      position={{ x: offsetX, y: offsetY }}
      onDragStop={(e, data) => {
        updatePosition(e, data);
        if (!hasMoved) setHasMoved(true); // Mark as moved permanently
      }}
      {...rndDefaults}
      onDragStart={() => handleSetFocusItemTrue('AboutMe')}
    >
      <motion.section
        className="titlebarContainer window"
        style={
          AboutMeExpand.expand
            ? inlineStyleExpand('AboutMe')
            : inlineStyle('AboutMe')
        }
        {...motionProps}
        onClick={() => handleSetFocusItemTrue('AboutMe')}
      >
        <Titlebar
          icon="aboutMeIcon.ico"
          title="About Me"
          PortfolioExpand={AboutMeExpand}
          setPortfolioExpand={setAboutMeExpand}
          resetPosition={resetPosition} // Pass resetPosition to Titlebar
        />
        <h1 className="Portfolio customScrollbar">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio culpa
          nesciunt error odit, magni quam id dolorum, dolore expedita iste cum
          numquam nostrum eius ut necessitatibus sunt autem, animi aliquam.
        </h1>
      </motion.section>
    </Rnd>
  );
}

export default AboutMe;
