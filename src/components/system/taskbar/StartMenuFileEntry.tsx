type FileEntryProps = {
  name: string;
  icon: string;
  onDoubleClick: () => void;
};

const StartMenuFileEntry = ({ name, icon, onDoubleClick }: FileEntryProps) => {
  return (
    <li className="startMenuFileEntry">
      <button type="button" onDoubleClick={onDoubleClick}>
        <figure>
          <img src={icon} alt={name} draggable={false} />
          <figcaption>{name}</figcaption>
        </figure>
      </button>
    </li>
  );
};

export default StartMenuFileEntry;
