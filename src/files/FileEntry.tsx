type FileEntryProps = {
  name: string;
  icon: string;
  onDoubleClick: () => void;
};

const FileEntry = ({ name, icon, onDoubleClick }: FileEntryProps) => {
  return (
    <li>
      <button type="button" onDoubleClick={onDoubleClick}>
        <figure>
          <img src={icon} alt={name} />
          <figcaption>{name}</figcaption>
        </figure>
      </button>
    </li>
  );
};

export default FileEntry;
