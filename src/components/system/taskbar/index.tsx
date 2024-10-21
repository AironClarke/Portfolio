import '../../../css/heroFeature.css';
import StartButton from './StartButton';
import Clock from './Clock';
import TaskbarEntries from './TaskbarEntries';

const Taskbar = (): JSX.Element => (
  <nav className="taskbar">
    <StartButton />
    <TaskbarEntries />
    <Clock />
  </nav>
);

export default Taskbar;
