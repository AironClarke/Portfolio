import type { MotionProps } from 'framer-motion';

const active = {
  height: 'inherit',
  opacity: 1,
  scale: 1,
  width: 'inherit'
};

const initial = {
  height: 'inherit',
  opacity: 0,
  scale: 0.95,
  width: 'inherit'
};

const useWindowTransitions = (): MotionProps => {
  return {
    animate: 'active',
    exit: 'initial',
    initial: 'initial',
    transition: {
      duration: 0.25
    },
    variants: { active, initial }
  };
};

export default useWindowTransitions;
