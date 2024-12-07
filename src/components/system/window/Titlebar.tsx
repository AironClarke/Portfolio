import React, { useState, useEffect } from 'react';
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
  PortfolioExpand: {
    expand: boolean;
    show: boolean;
    hide: boolean;
    focusItem: boolean;
    x: number;
    y: number;
    item_1Focus: boolean;
  };
  setPortfolioExpand: Dispatch<
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
  PortfolioExpand,
  setPortfolioExpand,
  resetPosition,
  dosOpen,
  dosClose,
  isTouchDevice
}: TitlebarProps) => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error('userContext is undefined');
  }

  const {
    inlineStyleExpand,
    inlineStyle,
    deleteTap,
    StyleHide,
    hoveredIcon,
    setHoveredIcon,
    openedIcon,
    setOpenedIcon
  } = userContext;

  // Ensure no item is hovered after a refresh
  useEffect(() => {
    setHoveredIcon(false);
  }, []); // Runs only once on component mount

  function handleExpandStateToggle() {
    setPortfolioExpand((prevState) => ({
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
        backgroundColor: PortfolioExpand.focusItem ? 'black' : '#444444'
      }}
    >
      <h1
        style={
          PortfolioExpand.expand
            ? inlineStyleExpand('Type')
            : inlineStyle('Type')
        }
      >
        <figure>
          <img
            src={icon}
            alt={title}
            draggable={false}
            className="titleIconSize"
          />
          <figcaption>{title}</figcaption>
        </figure>
      </h1>
      <nav className="cancel">
        {/* Minimize Button */}
        <button
          className={`${hoveredIcon === 'hoveredMin' ? 'hoveredMin' : ''} ${openedIcon ? 'opened' : ''}`}
          onClick={
            !isTouchDevice
              ? (e) => {
                  e.stopPropagation();
                  setPortfolioExpand((prev) => ({
                    ...prev,
                    hide: true,
                    focusItem: false
                  }));
                  StyleHide({ title });
                  title = 'Minimise';
                }
              : undefined
          }
          onTouchStart={() => {
            setHoveredIcon('hoveredMin'); // Update hovered icon
          }}
          onTouchEnd={(e) => {
            e.stopPropagation();
            setPortfolioExpand((prev) => ({
              ...prev,
              hide: true,
              focusItem: false
            }));
            StyleHide({ title });
            title = 'Minimise';
          }}
        >
          <MinimizeIcon />
        </button>

        {/* Maximize Button */}
        <button
          className={`${hoveredIcon === 'hoveredMax' ? 'hoveredMax' : ''} ${openedIcon ? 'opened' : ''}`}
          onClick={!isTouchDevice ? () => handleExpandStateToggle() : undefined}
          onTouchStart={() => {
            setHoveredIcon('hoveredMax'); // Update hovered icon
          }}
          onTouchEnd={() => {
            handleExpandStateToggle();
          }}
          type="button"
          title="Maximise"
        >
          <MaximizeIcon />
        </button>

        {/* Close Button */}
        <button
          type="button"
          className={`close ${hoveredIcon === 'hoveredCancel' ? 'hoveredCancel' : ''} ${openedIcon ? 'opened' : ''}`}
          onClick={
            !isTouchDevice
              ? () => {
                  handleClose(title);
                }
              : undefined
          }
          onTouchStart={() => {
            setHoveredIcon('hoveredCancel'); // Update hovered icon
          }}
          onTouchEnd={() => {
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
