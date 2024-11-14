import { useContext } from 'react';
import { Rnd } from 'react-rnd';
import Titlebar from 'src/components/system/window/Titlebar';
import { UserContext } from 'src/context/UserContext';
import useResizable from 'src/hooks/useResizable';
import rndDefaults from 'src/utils/rndDefaults';
import useDraggable from 'src/hooks/useDraggable';

function DukeNukem3D() {
  const userContext = useContext(UserContext);

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

  const maximized = Duke3DExpand.expand;

  const { height, width, updateSize } = useResizable(maximized);
  const { x, y, updatePosition, resetPosition } = useDraggable(maximized);

  return (
    <Rnd
      dragHandleClassName="draggable-titlebar"
      disableDragging={maximized}
      enableResizing={!maximized}
      size={{ height, width }}
      onResizeStop={updateSize}
      position={{ x, y }}
      onDragStop={updatePosition}
      {...rndDefaults}
      lockAspectRatio={true}
      className="window"
      style={
        Duke3DExpand.expand
          ? inlineStyleExpand('Duke Nukem 3D')
          : inlineStyle('Duke Nukem 3D')
      }
      onDragStart={() => handleSetFocusItemTrue('Duke Nukem 3D')}
    >
      <section
        className="titlebarContainer"
        onClick={() => {
          handleSetFocusItemTrue('Duke Nukem 3D');
        }}
      >
        <Titlebar
          icon="DukeNukem3DIcon.png"
          title="Duke Nukem 3D"
          ResumeExpand={Duke3DExpand}
          setResumeExpand={setDuke3DExpand}
          resetPosition={resetPosition} // Pass resetPosition to Titlebar
        />
        <div className="canvas">
          <div id="dos"></div>
        </div>
      </section>
    </Rnd>
  );
}

export default DukeNukem3D;
