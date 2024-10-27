import { useContext } from 'react';
import { Rnd, RndResizeCallback } from 'react-rnd';
import Titlebar from 'src/components/system/window/Titlebar';
import { UserContext } from 'src/context/UserContext';
import useResizable from 'src/hooks/useResizable';
import rndDefaults from 'src/utils/rndDefaults';
import useDraggable from 'src/hooks/useDraggable';

function ResumeFolder() {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error('userContext is undefined');
  }

  const { ResumeExpand, setResumeExpand, inlineStyleExpand, inlineStyle } =
    userContext;

  const maximized = ResumeExpand.expand;
  //  TODO: make window not draggable when its hidden
  // const test = ResumeExpand.hide;

  const { height, width, updateSize } = useResizable(maximized);
  const { x, y, updatePosition, resetPosition } = useDraggable(maximized);

  return (
    <Rnd
      disableDragging={maximized}
      enableResizing={!maximized}
      size={{ height, width }}
      onResizeStop={updateSize}
      position={{ x, y }}
      onDragStop={updatePosition}
      {...rndDefaults}
    >
      <section
        className="window"
        style={
          ResumeExpand.expand
            ? inlineStyleExpand('Resume')
            : inlineStyle('Resume')
        }
      >
        <Titlebar
          icon="folderTest.svg"
          title="test folder"
          ResumeExpand={ResumeExpand}
          setResumeExpand={setResumeExpand}
          resetPosition={resetPosition} // Pass resetPosition to Titlebar
        />
        <h1>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio culpa
          nesciunt error odit, magni quam id dolorum, dolore expedita iste cum
          numquam nostrum eius ut necessitatibus sunt autem, animi aliquam.
        </h1>
      </section>
    </Rnd>
  );
}

export default ResumeFolder;
