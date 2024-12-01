type FileEntryProps = {
  name: string;
  icon: string;
  onDoubleClick: () => void;
};

const FileEntry = ({
  name,
  icon,
  onDoubleClick,
  onTouchStart
}: FileEntryProps) => {
  return (
    <li className="fileEntry">
      <button
        type="button"
        onDoubleClick={onDoubleClick}
        onTouchStart={onTouchStart}
      >
        <figure>
          <img src={icon} alt={name} draggable={false} />
          <figcaption>{name}</figcaption>
        </figure>
      </button>
    </li>
  );
};

export default FileEntry;
