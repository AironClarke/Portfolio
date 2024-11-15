import type { MotionProps } from 'framer-motion';

const useStartMenuTransition = (): MotionProps => {
  return {
    animate: 'active',
    exit: 'initial',
    initial: 'initial',
    transition: {
      duration: 0.4,
      ease: [-0.15, 1, 0, 1]
    },
    variants: {
      active: { height: '350px' },
      initial: { height: 0 }
    }
  };
};

export default useStartMenuTransition;
