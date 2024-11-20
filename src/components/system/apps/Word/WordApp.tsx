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

function WordApp() {
  const userContext = useContext(UserContext);

  const motionProps = useWindowTransitions();

  if (!userContext) {
    throw new Error('userContext is undefined');
  }

  const {
    WordExpand,
    setWordExpand,
    inlineStyleExpand,
    inlineStyle,
    handleSetFocusItemTrue
  } = userContext;

  const maximized = WordExpand.expand;

  const { height, width, updateSize } = useResizable(maximized);
  const { x, y, updatePosition, resetPosition } = useDraggable(maximized);

  return (
    <Rnd
      dragHandleClassName="draggable-titlebar"
      style={
        WordExpand.expand ? inlineStyleExpand('Word') : inlineStyle('Word')
      }
      disableDragging={maximized}
      enableResizing={!maximized}
      size={{ height, width }}
      onResizeStop={updateSize}
      position={{ x, y }}
      onDragStop={updatePosition}
      {...rndDefaults}
      lockAspectRatio={true}
      onDragStart={() => handleSetFocusItemTrue('Word')}
    >
      <motion.section
        className="titlebarContainer window"
        style={
          WordExpand.expand ? inlineStyleExpand('Word') : inlineStyle('Word')
        }
        {...motionProps}
        onClick={() => {
          handleSetFocusItemTrue('Word');
        }}
      >
        <Titlebar
          icon="wordIcon.svg"
          title="Word"
          ResumeExpand={WordExpand}
          setResumeExpand={setWordExpand}
          resetPosition={resetPosition} // Pass resetPosition to Titlebar
        />
        <TinyMCE />
      </motion.section>
    </Rnd>
  );
}

export default WordApp;
