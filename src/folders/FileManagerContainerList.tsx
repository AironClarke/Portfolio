import FileEntryList from 'src/files/FileEntryList';

function FileManagerContainerList({ iconState, imageMapping, handleShow }) {
  return (
    <ol className="folderFileManagerList customScrollbar">
      <span>
        <ol className="fileManagerList">
          <li className="fileListHeader">
            <button>
              <div className="name">Name</div>
              <span className="resize"></span>
            </button>
          </li>
          <li className="fileListHeader">
            <button>
              <div className="name">Date modified</div>
              <span className="resize"></span>
            </button>
          </li>
          <li className="fileListHeader">
            <button>
              <div className="name">Type</div>
              <span className="resize"></span>
            </button>
          </li>
          <li className="fileListHeader">
            <button>
              <div className="name">Size</div>
              <span className="resize"></span>
            </button>
          </li>
        </ol>
      </span>
      <li className="fileListItem">
        {iconState
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
