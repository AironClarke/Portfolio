import { useContext } from 'react';
import { UserContext } from 'src/context/UserContext';

import TaskbarEntry from './TaskbarEntry';

const TaskbarEntries = (): JSX.Element => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error('userContext not found');
  }

  const { tap } = userContext;

  console.log(tap);

  return (
    <ol className="taskbarEntries">
      {tap.map(({ title, icon }, index) => (
        <TaskbarEntry key={index} icon={icon} title={title} index={index} />
      ))}
    </ol>
  );
};

export default TaskbarEntries;
