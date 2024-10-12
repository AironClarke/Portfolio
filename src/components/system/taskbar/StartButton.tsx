import 'src/css/heroFeature/taskbar.css';

import WindowIcon from 'src/components/system/taskbar/icons';

const StartButton = (): JSX.Element => (
  <button className="startButton" title="Start">
    <WindowIcon />
  </button>
);

export default StartButton;
