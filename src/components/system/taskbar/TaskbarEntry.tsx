import { useContext } from 'react';
import { UserContext } from 'src/context/UserContext';

type TaskbarEntryProps = {
  icon: string;
  title: string;
  index: number;
};

const TaskbarEntry = ({
  icon,
  title,
  index
}: TaskbarEntryProps): JSX.Element => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error('userContext not found');
  }

  const { handleHideFolder, imageMapping } = userContext;

  console.log(icon);

  return (
    <li
      className="taskbarEntry"
      onClick={(e) => {
        handleHideFolder(index);
        e.stopPropagation();
      }}
    >
      <figure>
        <img src={imageMapping(icon) || '|| operator test'} alt={title} />
        <figcaption>{title}</figcaption>
      </figure>
    </li>
  );
};

export default TaskbarEntry;
