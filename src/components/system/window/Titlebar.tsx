import { MinimizeIcon } from '../taskbar/icons';
import { MaximizeIcon } from '../taskbar/icons';
import { CloseIcon } from '../taskbar/icons';

type TitlebarProps = {
  icon: string;
  title: string;
};

const Titlebar = ({ icon, title }: TitlebarProps) => (
  <header className="titlebarHeader">
    <h1>
      <figure>
        <img src={icon} alt={title} />
        <figcaption>{title}</figcaption>
      </figure>
    </h1>
    <nav className="cancel">
      <button type="button">
        <MinimizeIcon />
      </button>
      <button type="button">
        <MaximizeIcon />
      </button>
      <button type="button" className="close">
        <CloseIcon />
      </button>
    </nav>
  </header>
);

export default Titlebar;
