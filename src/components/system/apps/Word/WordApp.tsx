import React, { useContext, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import Titlebar from '../../../../../src/components/system/window/Titlebar';
import { UserContext } from '../../../../../src/context/UserContext';
import useResizable from '../../../../../src/hooks/useResizable';
import rndDefaults from '../../../../../src/utils/rndDefaults';
import useDraggable from '../../../../../src/hooks/useDraggable';
import { motion } from 'framer-motion';
import useWindowTransitions from '../../../../../src/hooks/useWindowTransitions';
import TextEditor from './index';
import TinyMCE from './index';

function TinyMCEApp() {
  const userContext = useContext(UserContext);

  const motionProps = useWindowTransitions();

  if (!userContext) {
    throw new Error('userContext is undefined');
  }

  const {
    TinyMCEExpand,
    setTinyMCEExpand,
    inlineStyleExpand,
    inlineStyle,
    handleSetFocusItemTrue
  } = userContext;

  const maximized = TinyMCEExpand.expand;

  const { height, width, updateSize } = useResizable(maximized);
  const { x, y, updatePosition, resetPosition } = useDraggable(maximized);

  return (
    <Rnd
      dragHandleClassName="draggable-titlebar"
      style={
        TinyMCEExpand.expand
          ? inlineStyleExpand('TinyMCE')
          : inlineStyle('TinyMCE')
      }
      disableDragging={maximized}
      enableResizing={!maximized}
      size={{ height, width }}
      onResizeStop={updateSize}
      position={{ x, y }}
      onDragStop={updatePosition}
      {...rndDefaults}
      lockAspectRatio={true}
      onDragStart={() => handleSetFocusItemTrue('TinyMCE')}
    >
      <motion.section
        className="titlebarContainer window"
        style={
          TinyMCEExpand.expand
            ? inlineStyleExpand('TinyMCE')
            : inlineStyle('TinyMCE')
        }
        {...motionProps}
        onClick={() => {
          handleSetFocusItemTrue('TinyMCE');
        }}
      >
        <Titlebar
          icon="tinymcelogo.svg"
          title="TinyMCE"
          PortfolioExpand={TinyMCEExpand}
          setPortfolioExpand={setTinyMCEExpand}
          resetPosition={resetPosition} // Pass resetPosition to Titlebar
        />
        <TinyMCE />
      </motion.section>
    </Rnd>
  );
}

export default TinyMCEApp;
