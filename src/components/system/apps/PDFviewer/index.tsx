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
import PDFReader from './PDFReader';

function PDFViewer() {
  const userContext = useContext(UserContext);

  const motionProps = useWindowTransitions();

  console.log('PDFVIEWER TRIGGERED');

  if (!userContext) {
    throw new Error('userContext is undefined');
  }

  const {
    PDFExpand,
    setPDFExpand,
    inlineStyleExpand,
    inlineStyle,
    handleSetFocusItemTrue,
    iconState,
    setFolderCount,
    folderCount,
    handleShow
  } = userContext;

  const maximized = PDFExpand.expand;

  const { height, width, updateSize } = useResizable(maximized);
  const { x, y, updatePosition, resetPosition } = useDraggable(maximized);

  const folderOffset = useRef<number | null>(null);
  const [hasMoved, setHasMoved] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false); // New state
  const [key, setKey] = useState(0); // State to trigger re-render
  const [isLoading, setIsLoading] = useState(true);

  const directory = ['PDFviewer'];
  const directoryImg = (
    <img
      src={directoryImage}
      className="directoryImg"
      alt="Directory Icon"
      width={16}
      height={16}
    />
  );

  useEffect(() => {
    if (PDFExpand.show) {
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
  }, [PDFExpand.show]);

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
      onDragStart={() => handleSetFocusItemTrue('PDFViewer')}
      onDragStop={(e, data) => {
        updatePosition(e, data);
        if (!hasMoved) setHasMoved(true); // Mark as moved permanently
      }}
      {...rndDefaults}
      style={
        PDFExpand.expand
          ? inlineStyleExpand('PDFViewer')
          : inlineStyle('PDFViewer')
      }
    >
      <motion.section
        className="titlebarContainer window"
        style={
          PDFExpand.expand
            ? inlineStyleExpand('PDFViewer')
            : inlineStyle('PDFViewer')
        }
        {...motionProps}
        onClick={() => handleSetFocusItemTrue('PDFViewer')}
      >
        <Titlebar
          icon="pdfIcon.svg"
          title="PDFViewer"
          PortfolioExpand={PDFExpand}
          setPortfolioExpand={setPDFExpand}
          resetPosition={resetPosition}
        />

        {/* <div className="pdfViewer">
          <iframe src="https://drive.google.com/file/d/1Orh0R7ZaMdt6hozwF_JAB__anJq2rrlz/preview"></iframe>
        </div> */}
        {/*
        <div className="pdfViewer">
          {isLoading && (
            <div className="loading-circle">{}</div>
          )}
          <div
            className="pdfViewer customScrollbar"
            style={{ position: 'relative' }}
          >
            <iframe
              src="https://drive.google.com/file/d/18Nj0Es7Nw8nO815kbl5PHJr-rSaSP1Tu/preview"
              loading='lazy'
              onLoad={() => setIsLoading(false)}
              style={
                isLoading ? { visibility: 'hidden' } : { visibility: 'visible' }
              }
            ></iframe>
          </div>
        </div> */}

        <PDFReader />
      </motion.section>
    </Rnd>
  );
}

export default PDFViewer;
