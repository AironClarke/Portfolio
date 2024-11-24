import React, { useContext, useState } from 'react';
import { Refresh, Up } from './NavigationIcons';
import { UserContext } from 'src/context/UserContext';

const Navigation: React.FC = () => {
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
      <div className="addressBar"></div>
      <button type="button" title="refresh" onClick={onRefresh}>
        <Refresh />
      </button>
    </nav>
  );
};

export default Navigation;
