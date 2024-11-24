import React, { useContext, useState } from 'react';
import { Refresh, Up } from './NavigationIcons';
import { UserContext } from 'src/context/UserContext';
import { Forward } from './NavigationIcons';

interface NavigationProps {
  directory: string[]; // Array of text values
  directoryImg: React.ReactNode; // Unique image for the first item
}

const Navigation: React.FC<NavigationProps> = ({ directory, directoryImg }) => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error('userContext is undefined');
  }

  const navigateUpOneLevel = () => {};

  const onRefresh = () => {};

  return (
    <nav className="customNavigation">
      <button type="button" title="upOneLevel" onClick={navigateUpOneLevel}>
        <Up />
      </button>
      <div className="addressBar">
        {directory.map((text, index) => (
          <React.Fragment key={index}>
            {index === 0 && directoryImg && (
              <div className="uniqueImageWrapper">{directoryImg}</div>
            )}
            <span className="textItem">{text}</span>
            {index < directory.length - 1 && <Forward />}
          </React.Fragment>
        ))}
      </div>
      <button type="button" title="refresh" onClick={onRefresh}>
        <Refresh />
      </button>
    </nav>
  );
};

export default Navigation;
