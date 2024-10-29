import { useContext } from 'react';
import { Rnd } from 'react-rnd';
import Titlebar from 'src/components/system/window/Titlebar';
import { UserContext } from 'src/context/UserContext';
import useResizable from 'src/hooks/useResizable';
import rndDefaults from 'src/utils/rndDefaults';
import useDraggable from 'src/hooks/useDraggable';

function OtherFolder() {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error('userContext is undefined');
  }

  const {
    OtherExpand,
    ResumeExpand,
    setOtherExpand,
    inlineStyleExpand,
    inlineStyle
  } = userContext;

  const maximized = OtherExpand.expand;
  //  TODO: make window not draggable when its hidden
  // const test = ResumeExpand.hide;

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
      className="window"
      style={
        OtherExpand.expand ? inlineStyleExpand('Other') : inlineStyle('Other')
      }
    >
      <section>
        <Titlebar
          icon="thisPC.svg"
          title="Other"
          ResumeExpand={OtherExpand}
          setResumeExpand={setOtherExpand}
          resetPosition={resetPosition} // Pass resetPosition to Titlebar
        />
        <h1>test folder no.2</h1>
      </section>
    </Rnd>
  );
}

export default OtherFolder;
