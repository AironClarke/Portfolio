import { MinimizeIcon } from '../taskbar/icons';
import { MaximizeIcon } from '../taskbar/icons';
import { CloseIcon } from '../taskbar/icons';
import { Dispatch, SetStateAction, useContext } from 'react';
import { UserContext } from 'src/context/UserContext';
import { motion } from 'framer-motion';
import { closeMessage } from '../apps/JSDOS/dosFunctions';

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
  setResumeExpand,
  resetPosition,
  dosOpen,
  dosClose
}: TitlebarProps) => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error('userContext is undefined');
  }

  const { inlineStyleExpand, inlineStyle, deleteTap, StyleHide } = userContext;

  function handleExpandStateToggle() {
    setResumeExpand((prevState) => ({
      ...prevState,
      expand: !prevState.expand
    }));
  }

  function handleClose(title: string) {
    // Reset position and handle close action7
    resetPosition();
    deleteTap(title);

    if (title == 'Duke Nukem 3D') {
      closeMessage();
    }
  }

  return (
    <header
      className="titlebarHeader draggable-titlebar"
      style={{
        backgroundColor: ResumeExpand.focusItem ? 'black' : '#444444'
      }}
    >
      <h1
        style={
          ResumeExpand.expand ? inlineStyleExpand('Type') : inlineStyle('Type')
        }
      >
        <figure>
          <img src={icon} alt={title} draggable={false} />
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
            })),
              StyleHide({ title });
            title = 'Minimise';
          }}
        >
          <MinimizeIcon />
        </button>
        <button
          onClick={() => {
            handleExpandStateToggle();
          }}
          type="button"
          title="Maximise"
        >
          <MaximizeIcon />
        </button>
        <button
          type="button"
          className="close"
          onClick={() => {
            handleClose(title);
          }}
          title="close"
        >
          <CloseIcon />
        </button>
      </nav>
    </header>
  );
};

export default Titlebar;
