import { useCallback, useState } from 'react';
import { RndResizeCallback } from 'react-rnd';

type Size = {
  height: string;
  width: string;
};

const defaultWindowSize = {
  height: '250px',
  width: '280px'
};

const useResizable = (maximized: boolean = false) => {
  const [{ height, width }, setSize] = useState<Size>(defaultWindowSize);
  const updateSize = useCallback<RndResizeCallback>(
    (
      _event,
      _direction,
      { style: { height: elementHeight, width: elementWidth } }
    ) => setSize({ height: elementHeight, width: elementWidth }),
    []
  );

  return {
    height: maximized ? '100%' : height,
    width: maximized ? '100%' : width,
    updateSize
  };
};

export default useResizable;
