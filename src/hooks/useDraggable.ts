import { DraggableEventHandler } from 'react-draggable';
import { useCallback, useState, useEffect } from 'react';

type Position = {
  x: number;
  y: number;
};

type Draggable = Position & {
  updatePosition: DraggableEventHandler;
  resetPosition: () => Position;
};

// Calculate center position based on window size and component dimensions
const calculateCenterPosition = (width: number, height: number) => ({
  x: (window.innerWidth - width) / 2,
  y: (window.innerHeight - height) / 2
});

export const useDraggable = (
  maximized = false,
  width: number = 400, // Provide default width
  height: number = 300 // Provide default height
): Draggable => {
  // Initial state starts with (0,0) until width/height are available
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  // Update the component's position
  const updatePosition = useCallback<DraggableEventHandler>(
    (_event, { x: elementX, y: elementY }) =>
      setPosition({ x: elementX, y: elementY }),
    []
  );

  // Reset to center position
  const resetPosition = useCallback(() => {
    const center = calculateCenterPosition(width, height);
    setPosition(center);
    return center;
  }, [width, height]);

  // Set initial center position once width and height are defined
  useEffect(() => {
    if (width > 0 && height > 0) {
      // Only center when dimensions are known
      setPosition(calculateCenterPosition(width, height));
    }
  }, [width, height]);

  // Recalculate center position when the window is resized
  useEffect(() => {
    const handleResize = () =>
      setPosition(calculateCenterPosition(width, height));
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [width, height]);

  return {
    x: maximized ? 0 : position.x,
    y: maximized ? 0 : position.y,
    updatePosition,
    resetPosition
  };
};

export default useDraggable;
