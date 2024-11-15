import '../../../css/heroFeature.css';
import StartButton from './StartButton';
import Clock from './Clock';
import TaskbarEntries from './TaskbarEntries';
import StartMenu from './StartMenu';
import { AnimatePresence } from 'framer-motion';

const Taskbar = (): JSX.Element => (
  <nav className="taskbar">
    <AnimatePresence>
      <StartButton />
      <StartMenu />
      <TaskbarEntries />
      <Clock />
    </AnimatePresence>
  </nav>
);

export default Taskbar;
