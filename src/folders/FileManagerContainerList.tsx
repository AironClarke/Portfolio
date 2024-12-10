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
          // Extract numeric value from size strings (e.g., "22 KB" -> 22)
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
    setSortKey(key);
  };

  return (
    <ol className="folderFileManagerList customScrollbar">
      <span>
        <ol className="fileManagerList">
          <li className="fileListHeader">
            <button>
              <div
                className="name"
                onClick={() => handleSort('name')}
                style={{ cursor: 'pointer' }}
              >
                Name
              </div>
              <span className="resize"></span>
            </button>
          </li>
          <li className="fileListHeader">
            <button>
              <div className="name" onClick={() => handleSort('dateMod')}>
                Date modified
              </div>
              <span className="resize"></span>
            </button>
          </li>
          <li className="fileListHeader">
            <button>
              <div
                className="name"
                onClick={() => handleSort('type')}
                style={{ cursor: 'pointer' }}
              >
                Type
              </div>
              <span className="resize"></span>
            </button>
          </li>
          <li className="fileListHeader">
            <button>
              <div
                className="name"
                onClick={() => handleSort('size')}
                style={{ cursor: 'pointer' }}
              >
                Size
              </div>
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
