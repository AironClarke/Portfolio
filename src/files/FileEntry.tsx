type FileEntryProps = {
  name: string;
  icon: string;
  onDoubleClick: () => void;
};

const FileEntry = ({ name, icon, onDoubleClick }: FileEntryProps) => {
  return (
    <li className="fileEntry">
      <button type="button" onDoubleClick={onDoubleClick}>
        <figure>
          <img src={icon} alt={name} draggable={false} />
          <figcaption>{name}</figcaption>
        </figure>
      </button>
    </li>
  );
};

export default FileEntry;
