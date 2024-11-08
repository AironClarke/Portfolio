import { useContext, useRef } from 'react';
import { UserContext } from 'src/context/UserContext';
import '../../../css/heroFeature.css';

import { WindowIcon } from 'src/components/system/taskbar/icons';

const StartButton = (): JSX.Element => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error('userContext is undefined');
  }

  const { startActive, setStartActive, startRef } = userContext;

  return (
    <button
      ref={startRef}
      className="startButton"
      title="Start"
      onClick={(e) => {
        setStartActive(!startActive);
        e.stopPropagation();
      }}
    >
      <WindowIcon />
    </button>
  );
};

export default StartButton;
