import React, { useState } from 'react';
import FileEntryList from 'src/files/FileEntryList';

function FileManagerContainerList({ iconState, imageMapping, handleShow }) {
  const [sortedIcons, setSortedIcons] = useState(iconState);
  const [sortKey, setSortKey] = useState(null); // Optional: Track the active sort key for UI

  const handleSort = (key) => {
    console.log(`Sorting by: ${key}`);

    const sorted = [...sortedIcons]
      .filter((icon) => icon.folderId === 'ThisPc')
      .sort((a, b) => {
        console.log(`Comparing: ${key}`);
        console.log(`a[${key}] = ${a[key]}, b[${key}] = ${b[key]}`);

        if (key === 'size') {
          // Ensure sizes are numeric (in KB)
          const sizeA = parseInt(a[key], 10) || 0; // Use 0 if undefined or invalid
          const sizeB = parseInt(b[key], 10) || 0; // Use 0 if undefined or invalid

          console.log(`Size comparison: ${sizeA} vs ${sizeB}`);
          return sizeB - sizeA; // Handle numeric comparison of sizes
        } else if (key === 'dateMod') {
          // Compare only the date part (ignoring time)
          const dateA = new Date(a[key]).toISOString().split('T')[0];
          const dateB = new Date(b[key]).toISOString().split('T')[0];
          console.log(`Date comparison: ${dateA} vs ${dateB}`);
          return new Date(dateA) - new Date(dateB);
        } else {
          // Handle strings (name, type)
          console.log(`String comparison: ${a[key]} vs ${b[key]}`);
          return (a[key] || '').localeCompare(b[key] || '');
        }
      });

    console.log('Sorted Array:', sorted);
    setSortedIcons(sorted);
    setSortKey(key); // Update the active sort key
  };

  return (
    <ol className="folderFileManagerList customScrollbar">
      <span>
        <ol className="fileManagerList">
          <li className="fileListHeader">
            <button
              className={sortKey === 'name' ? 'selected' : ''}
              onClick={() => handleSort('name')}
              title="Sort by name"
            >
              <div className="name">Name</div>
              <span className="resize"></span>
            </button>
          </li>
          <li className="fileListHeader">
            <button
              className={sortKey === 'dateMod' ? 'selected' : ''}
              onClick={() => handleSort('dateMod')}
              title="Sort by date created"
            >
              <div className="name">Date modified</div>
              <span className="resize"></span>
            </button>
          </li>
          <li className="fileListHeader">
            <button
              className={sortKey === 'type' ? 'selected' : ''}
              onClick={() => handleSort('type')}
              title="Sort by type"
            >
              <div className="name">Type</div>
              <span className="resize"></span>
            </button>
          </li>
          <li className="fileListHeader">
            <button
              className={sortKey === 'size' ? 'selected' : ''}
              onClick={() => handleSort('size')}
              title="Sort by size"
            >
              <div className="name">Size</div>
              <span className="resize"></span>
            </button>
          </li>
        </ol>
      </span>
      <li className="fileListItem">
        {sortedIcons
          .filter((icon) => icon.folderId === 'ThisPc')
          .map((icon) => (
            <FileEntryList
              key={icon.id} // Always include a unique key
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
