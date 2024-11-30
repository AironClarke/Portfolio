import { useContext, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import Titlebar from 'src/components/system/window/Titlebar';
import { UserContext } from 'src/context/UserContext';
import useResizable from 'src/hooks/useResizable';
import rndDefaults from 'src/utils/rndDefaults';
import useDraggable from 'src/hooks/useDraggable';
import { motion } from 'framer-motion';
import useWindowTransitions from 'src/hooks/useWindowTransitions';
import { openMessage, closeMessage } from './dosFunctions';

function DukeNukem3D() {
  const userContext = useContext(UserContext);

  const motionProps = useWindowTransitions();

  if (!userContext) {
    throw new Error('userContext is undefined');
  }

  const {
    Duke3DExpand,
    setDuke3DExpand,
    inlineStyleExpand,
    inlineStyle,
    handleSetFocusItemTrue
  } = userContext;

  useEffect(() => {
    openMessage();

    return () => {
      closeMessage();
    };
  }, []);

  const maximized = Duke3DExpand.expand;

  const { height, width, updateSize } = useResizable(maximized);
  const { x, y, updatePosition, resetPosition } = useDraggable(maximized);

  return (
    <Rnd
      dragHandleClassName="draggable-titlebar"
      style={
        Duke3DExpand.expand
          ? inlineStyleExpand('Duke Nukem 3D')
          : inlineStyle('Duke Nukem 3D')
      }
      disableDragging={maximized}
      enableResizing={!maximized}
      size={{ height, width }}
      onResizeStop={updateSize}
      position={{ x, y }}
      onDragStop={updatePosition}
      {...rndDefaults}
      lockAspectRatio={true}
      onDragStart={() => handleSetFocusItemTrue('Duke Nukem 3D')}
    >
      <motion.section
        className="titlebarContainer window"
        style={
          Duke3DExpand.expand
            ? inlineStyleExpand('Duke Nukem 3D')
            : inlineStyle('Duke Nukem 3D')
        }
        {...motionProps}
        onClick={() => {
          handleSetFocusItemTrue('Duke Nukem 3D');
        }}
      >
        <Titlebar
          icon="DukeNukem3DIcon.png"
          title="Duke Nukem 3D"
          PortfolioExpand={Duke3DExpand}
          setPortfolioExpand={setDuke3DExpand}
          resetPosition={resetPosition} // Pass resetPosition to Titlebar
        />
        <div className="canvas">
          <div id="dos"></div>
        </div>
      </motion.section>
    </Rnd>
  );
}

export default DukeNukem3D;
