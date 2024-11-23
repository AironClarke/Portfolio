import React, { useContext, useState } from 'react';
import { Back, Down, Forward, Refresh, Up } from './NavigationIcons';
import { UserContext } from 'src/context/UserContext';

interface NavigationProps {
  id: string;
  onNavigate?: (path: string) => void;
  onRefresh?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({
  id,
  onNavigate,
  onRefresh
}) => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error('userContext is undefined');
  }

  const { history, setHistory, currentIndex, setCurrentIndex } = userContext;
  const currentFolder = currentIndex >= 0 ? history[currentIndex] : '';

  const [addressBarValue, setAddressBarValue] = useState(currentFolder);

  // Navigate to a new folder
  const navigateToFolder = (newFolder: string) => {
    const updatedHistory = history.slice(0, currentIndex + 1);
    setHistory([...updatedHistory, newFolder]);
    setCurrentIndex(updatedHistory.length);
    setAddressBarValue(newFolder);
    onNavigate?.(newFolder);
  };

  const goBack = () => currentIndex > 0 && setCurrentIndex(currentIndex - 1);
  const goForward = () =>
    currentIndex < history.length - 1 && setCurrentIndex(currentIndex + 1);
  const navigateUpOneLevel = () => {
    if (currentFolder) {
      const parentFolder = currentFolder.substring(
        0,
        currentFolder.lastIndexOf('/')
      );
      navigateToFolder(parentFolder || '/');
    }
  };

  React.useEffect(() => {
    setAddressBarValue(currentFolder);
  }, [currentFolder]);

  return (
    <nav className="customNavigation">
      <button type="button" title="upOneLevel" onClick={navigateUpOneLevel}>
        <Up />
      </button>
      <input
        className="addressBar"
        type="text"
        value={addressBarValue}
        onChange={(e) => setAddressBarValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            navigateToFolder(addressBarValue);
          }
        }}
      />
      <button type="button" title="refresh" onClick={onRefresh}>
        <Refresh />
      </button>
    </nav>
  );
};

export default Navigation;
