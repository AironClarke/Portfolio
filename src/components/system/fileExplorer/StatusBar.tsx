import React from 'react';

const StatusBar = ({ count }) => {
  return (
    <footer className="statusBar">
      <div title="Total item count">{count} items</div>
    </footer>
  );
};

export default StatusBar;
