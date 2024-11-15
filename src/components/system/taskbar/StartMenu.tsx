import { useContext, useEffect } from 'react';
import { UserContext } from 'src/context/UserContext';
import StartListFileManager from './StartListFileManager';
import StartMenuSidebar from './StartMenuSidebar';
import { motion } from 'framer-motion';
import useStartMenuTransition from 'src/hooks/useStartMenuTransition';

const StartMenu = (): JSX.Element => {
  const { startActive, setStartActive, startRef } = useContext(UserContext);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the start button
      if (startRef.current && !startRef.current.contains(event.target)) {
        setStartActive(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <>
      {startActive && (
        <motion.nav
          className="startMenu"
          style={{ display: startActive ? '' : 'none' }}
          {...useStartMenuTransition()}
        >
          <StartMenuSidebar />
          <StartListFileManager />
        </motion.nav>
      )}
    </>
  );
};

export default StartMenu;
