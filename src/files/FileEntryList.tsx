const FileEntryList = ({ onDoubleClick, image, icon }) => {
  console.log(image);
  return (
    <button onDoubleClick={onDoubleClick}>
      <figure>
        <picture>
          <img src={image} alt={icon.name} width="16px" height="16px" />
        </picture>
        <figcaption>{icon.name}</figcaption>
      </figure>
      <div className="fileListItemDetails">
        <div className="dateMod">{icon.dateMod}</div>
        <div className="type">{icon.type}</div>
        <div className="size">{icon.size}</div>
      </div>
    </button>
  );
};

export default FileEntryList;
