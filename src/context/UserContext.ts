import { createContext, CSSProperties, Dispatch, SetStateAction } from 'react';

type UserContextType = {
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
  inlineStyle: (name: string) => CSSProperties;
  inlineStyleExpand: (name: string) => CSSProperties;
  deleteTap: (name: string) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export default UserContext;
