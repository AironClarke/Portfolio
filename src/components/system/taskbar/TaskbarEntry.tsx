import { useContext } from 'react';
import { UserContext } from 'src/context/UserContext';
import { motion } from 'framer-motion';

type TaskbarEntryProps = {
  icon: string;
  title: string;
};

const TaskbarEntry = ({ icon, title }: TaskbarEntryProps): JSX.Element => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error('userContext not found');
  }

  const { handleHideFolder, imageMapping, StyleHide, tap, ObjectState } =
    userContext;

  // Calculate the current index based on title
  const index = tap.findIndex((entry) => entry.title === title);

  if (index === -1) {
    console.warn(`TaskbarEntry: No entry found for title "${title}"`);
    return null; // or return a fallback JSX if the item is not found
  }

  // Define variants for motion with an exit state
  const variantsList = {
    active: { width: '160px' },
    initial: { width: 0 },
    exit: { width: 0 } // Exit state to animate when the item is removed
  };

  return (
    <motion.li
      className="taskbarEntry"
      onClick={(e) => {
        handleHideFolder(index);
        e.stopPropagation();
      }}
      style={StyleHide(index, tap, ObjectState)}
      animate="active"
      exit="exit"
      initial="initial"
      transition={{
        duration: 0.25
      }}
      variants={variantsList}
    >
      <figure>
        <img
          src={imageMapping(icon) || '|| operator test'}
          alt={title}
          draggable={false}
        />
        <figcaption>{title}</figcaption>
      </figure>
    </motion.li>
  );
};

export default TaskbarEntry;
