import React, { act, useContext, useState } from 'react';
import { Refresh, Up } from './NavigationIcons';
import { UserContext } from 'src/context/UserContext';
import { Forward } from './NavigationIcons';

interface NavigationProps {
  directory: string[]; // Array of text values
  directoryImg: React.ReactNode; // Unique image for the first item
  refreshHandler: () => void; // New prop to handle refresh
}

const Navigation: React.FC<NavigationProps> = ({
  directory,
  directoryImg,
  refreshHandler,
  upOneLevel,
  active
}) => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error('userContext is undefined');
  }

  const { handleShow } = userContext;

  const navigateUpOneLevel = () => {};

  return (
    <nav className="customNavigation">
      <button
        type="button"
        title="upOneLevel"
        onClick={() => {
          handleShow(upOneLevel); // First function call
        }}
      >
        <Up active={active} />
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
      <button type="button" title="refresh" onClick={refreshHandler}>
        <Refresh />
      </button>
    </nav>
  );
};

export default Navigation;
