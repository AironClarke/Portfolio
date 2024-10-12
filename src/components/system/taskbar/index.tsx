import StartButton from './StartButton';
import Clock from './Clock';

const Taskbar = (): JSX.Element => (
  <nav className="taskbar">
    <StartButton />
    <Clock />
  </nav>
);

export default Taskbar;
