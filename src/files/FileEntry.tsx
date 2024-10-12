type FileEntryProps = {
  name: string;
  icon: string;
};

const FileEntry = ({ name, icon }: FileEntryProps) => {
  return (
    <li>
      <button type="button">
        <figure>
          <img src={icon} alt={name} />
          <figcaption>{name}</figcaption>
        </figure>
      </button>
    </li>
  );
};

export default FileEntry;
