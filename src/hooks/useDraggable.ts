import { DraggableEventHandler } from 'react-draggable';
import { useCallback, useState } from 'react';

type Position = {
  x: number;
  y: number;
};

type Draggable = Position & {
  updatePosition: DraggableEventHandler;
};

//TODO: Centre on screen
const defaultWindowPosition = {
  x: 0,
  y: 0
};

export const useDraggable = (maximized = false): Draggable => {
  const [{ x, y }, setPosition] = useState<Position>(defaultWindowPosition);
  const updatePosition = useCallback<DraggableEventHandler>(
    (_event, { x: elementX, y: elementY }) =>
      setPosition({ x: elementX, y: elementY }),
    []
  );

  const resetPosition = useCallback(() => {
    setPosition({ x: 0, y: 0 });

    return { x: x, y: y };
  }, []);

  return {
    x: maximized ? 0 : x,
    y: maximized ? 0 : y,
    updatePosition,
    resetPosition
  };
};

export default useDraggable;
