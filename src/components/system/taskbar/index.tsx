import '../../../css/heroFeature.css';
import StartButton from './StartButton';
import Clock from './Clock';
import TaskbarEntries from './TaskbarEntries';
import StartMenu from './StartMenu';

const Taskbar = (): JSX.Element => (
  <nav className="taskbar">
    <StartButton />
    <StartMenu />
    <TaskbarEntries />
    <Clock />
  </nav>
);

export default Taskbar;
