import React from 'react';

const StatusBar = ({ count, onChangeViewStyle, activeViewStyle }) => {
  return (
    <footer className="statusBar">
      <div title="Total item count">{count} items</div>
      <nav className="viewStyle">
        <button
          className={activeViewStyle === 'icon' ? 'active' : ''}
          onClick={() => onChangeViewStyle('icon')}
        >
          <picture>
            <img
              src="listView.ico"
              alt="List view"
              height="16px"
              width="16px"
            />
          </picture>
        </button>
        <button
          className={activeViewStyle === 'list' ? 'active' : ''}
          onClick={() => onChangeViewStyle('list')}
        >
          <picture>
            <img
              src="iconView.ico"
              alt="Icon view"
              height="16px"
              width="16px"
            />
          </picture>
        </button>
      </nav>
    </footer>
  );
};

export default StatusBar;
