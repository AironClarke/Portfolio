import { useContext } from 'react';
import { UserContext } from 'src/context/UserContext';
import { AnimatePresence } from 'framer-motion';

import TaskbarEntry from './TaskbarEntry';

const TaskbarEntries = (): JSX.Element => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error('userContext not found');
  }

  const { tap } = userContext;

  return (
    <ol className="taskbarEntries">
      <AnimatePresence>
        {tap.map(({ title, icon }) => (
          <TaskbarEntry key={title} icon={icon} title={title} />
        ))}
      </AnimatePresence>
    </ol>
  );
};

export default TaskbarEntries;
