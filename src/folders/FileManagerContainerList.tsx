import React, { useState } from 'react';
import FileEntryList from 'src/files/FileEntryList';

function FileManagerContainerList({ iconState, imageMapping, handleShow }) {
  const [sortedIcons, setSortedIcons] = useState(iconState);
  const [sortKey, setSortKey] = useState(null); // Optional: Track the active sort key for UI

  const handleSort = (key) => {
    const sorted = [...sortedIcons].sort((a, b) => {
      if (key === 'size') {
        return (a[key] || 0) - (b[key] || 0); // Handle size (numeric comparison)
      } else if (key === 'dateModified') {
        return new Date(a[key]) - new Date(b[key]); // Handle date comparison
      } else {
        return (a[key] || '').localeCompare(b[key] || ''); // Handle strings (name, type)
      }
    });
    setSortedIcons(sorted);
    setSortKey(key);
  };

  return (
    <ol className="folderFileManagerList customScrollbar">
      <span>
        <ol className="fileManagerList">
          <li className="fileListHeader">
            <button onClick={() => handleSort('name')}>
              <div className="name">Name</div>
              <span className="resize"></span>
            </button>
          </li>
          <li className="fileListHeader">
            <button onClick={() => handleSort('dateModified')}>
              <div className="name">Date modified</div>
              <span className="resize"></span>
            </button>
          </li>
          <li className="fileListHeader">
            <button onClick={() => handleSort('type')}>
              <div className="name">Type</div>
              <span className="resize"></span>
            </button>
          </li>
          <li className="fileListHeader">
            <button onClick={() => handleSort('size')}>
              <div className="name">Size</div>
              <span className="resize"></span>
            </button>
          </li>
        </ol>
      </span>
      <li className="fileListItem">
        {sortedIcons
          .filter((icon) => icon.folderId == 'ThisPc')
          .map((icon) => (
            <FileEntryList
              icon={icon}
              image={imageMapping(icon.pic) || '|| operator test'}
              onDoubleClick={() => handleShow(icon.name)}
            />
          ))}
      </li>
    </ol>
  );
}

export default FileManagerContainerList;
