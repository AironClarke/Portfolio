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
      active: { height: '350px', paddingTop: 0 },
      initial: { height: 0, paddingTop: '350px' }
    }
  };
};

export default useStartMenuTransition;
