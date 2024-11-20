import React, { useContext, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import Titlebar from '../../window/Titlebar';
import { UserContext } from '../../../../context/UserContext';
import useResizable from '../../../../hooks/useResizable';
import rndDefaults from '../../../../utils/rndDefaults';
import useDraggable from '../../../../hooks/useDraggable';
import { motion } from 'framer-motion';
import useWindowTransitions from '../../../../hooks/useWindowTransitions';
import MonacoEditor from './index';

function MonacoApp() {
  const userContext = useContext(UserContext);

  const motionProps = useWindowTransitions();

  if (!userContext) {
    throw new Error('userContext is undefined');
  }

  const {
    MonacoExpand,
    setMonacoExpand,
    inlineStyleExpand,
    inlineStyle,
    handleSetFocusItemTrue
  } = userContext;

  const maximized = MonacoExpand.expand;

  const { height, width, updateSize } = useResizable(maximized);
  const { x, y, updatePosition, resetPosition } = useDraggable(maximized);

  return (
    <Rnd
      dragHandleClassName="draggable-titlebar"
      style={
        MonacoExpand.expand
          ? inlineStyleExpand('Monaco Editor')
          : inlineStyle('Monaco Editor')
      }
      disableDragging={maximized}
      enableResizing={!maximized}
      size={{ height, width }}
      onResizeStop={updateSize}
      position={{ x, y }}
      onDragStop={updatePosition}
      {...rndDefaults}
      lockAspectRatio={true}
      onDragStart={() => handleSetFocusItemTrue('Monaco Editor')}
    >
      <motion.section
        className="titlebarContainer window"
        style={
          MonacoExpand.expand
            ? inlineStyleExpand('Monaco Editor')
            : inlineStyle('Monaco Editor')
        }
        {...motionProps}
        onClick={() => {
          handleSetFocusItemTrue('Monaco Editor');
        }}
      >
        <Titlebar
          icon="VSCodeIcon.svg"
          title="Monaco Editor"
          ResumeExpand={MonacoExpand}
          setResumeExpand={setMonacoExpand}
          resetPosition={resetPosition} // Pass resetPosition to Titlebar
        />
        <MonacoEditor />
      </motion.section>
    </Rnd>
  );
}

export default MonacoApp;
