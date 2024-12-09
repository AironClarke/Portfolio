import FileEntryList from 'src/files/FileEntryList';

function FileManagerContainerList({ iconState, imageMapping, handleShow }) {
  return (
    <ol className="folderFileManagerList customScrollbar">
      <span>
        <ol className="fileManagerList">
          <li className="fileListHeader">
            <div className="name">Name</div>
            <span className="resize"></span>
          </li>
          <li className="fileListHeader">
            <div className="name">Date modified</div>
            <span className="resize"></span>
          </li>
          <li className="fileListHeader">
            <div className="name">Type</div>
            <span className="resize"></span>
          </li>
          <li className="fileListHeader">
            <div className="name">Size</div>
            <span className="resize"></span>
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
