import { MinimizeIcon } from '../taskbar/icons';
import { MaximizeIcon } from '../taskbar/icons';
import { CloseIcon } from '../taskbar/icons';
import { Dispatch, SetStateAction, useContext } from 'react';
import UserContext from 'src/context/UserContext';

type TitlebarProps = {
  icon: string;
  title: string;
  ResumeExpand: {
    expand: boolean;
    show: boolean;
    hide: boolean;
    focusItem: boolean;
    x: number;
    y: number;
    item_1Focus: boolean;
  };
  setResumeExpand: Dispatch<
    SetStateAction<{
      expand: boolean;
      show: boolean;
      hide: boolean;
      focusItem: boolean;
      x: number;
      y: number;
      item_1Focus: boolean;
    }>
  >;
};

const Titlebar = ({
  icon,
  title,
  ResumeExpand,
  setResumeExpand
}: TitlebarProps) => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error('userContext is undefined');
  }

  const { inlineStyleExpand, inlineStyle } = userContext;
  return (
    <header className="titlebarHeader">
      <h1
        style={
          ResumeExpand.expand ? inlineStyleExpand('Type') : inlineStyle('Type')
        }
      >
        <figure>
          <img src={icon} alt={title} />
          <figcaption>{title}</figcaption>
        </figure>
      </h1>
      <nav className="cancel">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setResumeExpand((prev) => ({
              ...prev,
              hide: true,
              focusItem: false
            }));
          }}
        >
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
};

export default Titlebar;
