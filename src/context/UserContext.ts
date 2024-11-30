import { createContext, CSSProperties, Dispatch, SetStateAction } from 'react';

type TapItem = {
  title: string;
  icon: string;
};

export type Tap = TapItem[];

export type UserContextType = {
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
  inlineStyle: (name: string) => CSSProperties;
  inlineStyleExpand: (name: string) => CSSProperties;
  deleteTap: (name: string) => void;
  iconState: {
    folderId: string;
    name: string;
    pic: string;
  }[]; //why?
  setIconState: React.Dispatch<
    React.SetStateAction<{ name: string; pic: string }[]>
  >; // State setter for updating iconState why??
  imageMapping: (name: string) => string | null;
  handleShow: (name: string) => void;
  tap: TapItem[];
  setTap: React.Dispatch<React.SetStateAction<TapItem[]>>;
  handleHideFolder: (indeX: number) => void;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);
