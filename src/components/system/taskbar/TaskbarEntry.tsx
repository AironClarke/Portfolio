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

  const { handleHideFolder, imageMapping, StyleHide, tap, ObjectState } =
    userContext;

  return (
    <li
      className="taskbarEntry"
      onClick={(e) => {
        handleHideFolder(index);
        e.stopPropagation();
      }}
      style={StyleHide(index, tap, ObjectState)}
    >
      <figure>
        <img
          src={imageMapping(icon) || '|| operator test'}
          alt={title}
          draggable={false}
        />
        <figcaption>{title}</figcaption>
      </figure>
    </li>
  );
};

export default TaskbarEntry;
