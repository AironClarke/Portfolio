type FileEntryProps = {
  name: string;
  icon: string;
  onDoubleClick: () => void;
};

const FileEntry = ({
  name,
  icon,
  onDoubleClick,
  onTouchStart,
  onClick,
  className
}: FileEntryProps) => {
  return (
    <li className={className}>
      <button
        type="button"
        onDoubleClick={onDoubleClick}
        onTouchStart={onTouchStart}
        onClick={onClick}
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
