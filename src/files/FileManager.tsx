import FileEntry from './FileEntry';

const FileManager = (): JSX.Element => (
  <ol className="fileManager">
    <FileEntry name="test2" icon="./thisPC.svg" />
    <FileEntry name="test1" icon="./folderTest.svg" />
  </ol>
);

export default FileManager;
