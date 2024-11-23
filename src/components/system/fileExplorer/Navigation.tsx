// import { Back, Down, Forward, Refresh, Up } from './NavigationIcons';
// import { useEffect, useRef, useState, useContext } from 'react';
// import { UserContext } from 'src/context/UserContext';

// const Navigation = ({ id }: NavigationProps): JSX.Element => {
//   const userContext = useContext(UserContext);

//   if (!userContext) {
//     throw new Error('userContext is undefined');
//   }

//   const { history, setHistory, currentIndex, setCurrentIndex } = userContext;

//   // Current folder based on history and index
//   const currentFolder = currentIndex >= 0 ? history[currentIndex] : null;

//   // Function to navigate to a new folder
//   const navigateToFolder = (newFolder) => {
//     // Remove any "forward" history
//     const updatedHistory = history.slice(0, currentIndex + 1);
//     setHistory([...updatedHistory, newFolder]);
//     setCurrentIndex(updatedHistory.length); // Move pointer to the new folder
//   };

//   // Function to go back
//   const goBack = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1);
//     }
//   };

//   // Function to go forward
//   const goForward = () => {
//     if (currentIndex < history.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//     }
//   };
//   return (
//     <nav className="customNavigation">
//       <button type="button" title="back">
//         <Back />
//       </button>
//       <button title="foward">
//         <Forward />
//       </button>
//       <button title="recentLocations">
//         <Down />
//       </button>
//       <button title="upOneLevel">
//         <Up />
//       </button>
//       <input className="addressBar" type="text" />
//       <button type="button" title="refresh">
//         <Refresh />
//       </button>
//     </nav>
//   );
// };
// export default Navigation;
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
      <button
        type="button"
        title="back"
        onClick={goBack}
        disabled={currentIndex <= 0}
      >
        <Back />
      </button>
      <button
        type="button"
        title="forward"
        onClick={goForward}
        disabled={currentIndex >= history.length - 1}
      >
        <Forward />
      </button>
      <button type="button" title="recentLocations">
        <Down />
      </button>
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
