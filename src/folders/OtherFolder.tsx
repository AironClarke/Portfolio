import { useContext } from 'react';
import { Rnd } from 'react-rnd';
import Titlebar from 'src/components/system/window/Titlebar';
import { UserContext } from 'src/context/UserContext';
import useResizable from 'src/hooks/useResizable';
import rndDefaults from 'src/utils/rndDefaults';
import useDraggable from 'src/hooks/useDraggable';
import FileEntry from 'src/files/FileEntry';
import { imageMapping } from 'src/functions/AppFunction';

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
    inlineStyle,
    handleSetFocusItemTrue,
    iconState
  } = userContext;

  const maximized = OtherExpand.expand;
  //  TODO: make window not draggable when its hidden
  // const test = ResumeExpand.hide;

  const { height, width, updateSize } = useResizable(maximized);
  const { x, y, updatePosition, resetPosition } = useDraggable(maximized);

  function handleShow(name: string): void {
    throw new Error('Function not implemented.');
  }

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
      onDragStart={() => handleSetFocusItemTrue('Other')}
    >
      <section
        className="titlebarContainer"
        onClick={() => handleSetFocusItemTrue('Other')}
      >
        <Titlebar
          icon="thisPC.svg"
          title="Other"
          ResumeExpand={OtherExpand}
          setResumeExpand={setOtherExpand}
          resetPosition={resetPosition} // Pass resetPosition to Titlebar
        />
        <ol className="folderFileManager">
          {iconState
            .filter((icon) => icon.folderId == 'Other')
            .map((icon) => (
              // <Rnd
              //   style={style}
              //   default={{
              //     x: 0,
              //     y: 0,
              //     width: 320,
              //     height: 200
              //   }}
              // >
              <FileEntry
                name={icon.name}
                icon={imageMapping(icon.pic) || '|| operator test'}
                onDoubleClick={() => handleShow(icon.name)}
              />
              // </Rnd>
            ))}
        </ol>
      </section>
    </Rnd>
  );
}

export default OtherFolder;
