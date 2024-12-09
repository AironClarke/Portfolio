import FileEntry from 'src/files/FileEntry';

function FileManagerContainer({ iconState, imageMapping, handleShow }) {
  return (
    <ol className="folderFileManager customScrollbar">
      {iconState
        .filter((icon) => icon.folderId == 'ThisPc')
        .map((icon) => (
          <FileEntry
            name={icon.name}
            icon={imageMapping(icon.pic) || '|| operator test'}
            onDoubleClick={() => handleShow(icon.name)}
          />
        ))}
    </ol>
  );
}

export default FileManagerContainer;
