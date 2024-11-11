import { useContext, useEffect } from 'react';
import { UserContext } from 'src/context/UserContext';
import StartListFileManager from './StartListFileManager';
import StartMenuSidebar from './StartMenuSidebar';

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
        <nav
          className="startMenu"
          style={{ display: startActive ? '' : 'none' }}
        >
          <StartMenuSidebar />
          <StartListFileManager />
        </nav>
      )}
    </>
  );
};

export default StartMenu;
