import { useCallback, useContext, useState } from 'react';
import { Rnd, RndResizeCallback } from 'react-rnd';
import Titlebar from 'src/components/system/window/Titlebar';
import { UserContext } from 'src/context/UserContext';
import useResizable from 'src/hooks/useResizable';
import rndDefaults from 'src/utils/rndDefaults';

function ResumeFolder() {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error('userContext is undefined');
  }

  const { ResumeExpand, setResumeExpand, inlineStyleExpand, inlineStyle } =
    userContext;

  const maximized = ResumeExpand.expand;

  const { height, width, updateSize } = useResizable(maximized);

  console.log(maximized);

  return (
    <Rnd
      enableResizing={!maximized}
      size={{ height, width }}
      onResizeStop={updateSize}
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
