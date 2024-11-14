import FileManager from 'src/files/FileManager';
import '../css/heroFeature.css';
import Taskbar from 'src/components/system/taskbar';
import ResumeFolder from 'src/folders/ResumeFolder';
import { useRef, useState } from 'react';
import { UserContext } from 'src/context/UserContext';
import iconInfo from 'src/icon.json';
import { imageMapping } from 'src/functions/AppFunction';
import { transform } from 'typescript';
import OtherFolder from 'src/folders/OtherFolder';
import { StyleHide } from 'src/functions/StyleHide';
import DukeNukem3D from 'src/components/system/apps/JSDOS/DukeNukem3D';
import { openMessage } from 'src/components/system/apps/JSDOS/dosFunctions';
import { closeMessage } from 'src/components/system/apps/JSDOS/dosFunctions';

export type ObjectStateItem = {
  name: string;
  setter: (value: any) => void; // Adjust the `any` to the specific type as needed
  usestate: any; // Adjust `any` to the type of state, like `boolean` if it's a boolean state
};

const HeroFeature = (): JSX.Element => {
  const [ResumeExpand, setResumeExpand] = useState({
    expand: false,
    show: false,
    hide: false,
    focusItem: true,
    x: 0,
    y: 0,
    item_1Focus: false
  });

  const [OtherExpand, setOtherExpand] = useState({
    expand: false,
    show: false,
    hide: false,
    focusItem: true,
    x: 0,
    y: 0,
    item_1Focus: false
  });

  const [Duke3DExpand, setDuke3DExpand] = useState({
    expand: false,
    show: false,
    hide: false,
    focusItem: true,
    x: 0,
    y: 0,
    item_1Focus: false
  });

  const [tap, setTap] = useState<{ title: string; icon: string }[]>([]);

  function ObjectState(): ObjectStateItem[] {
    return [
      { name: 'Resume', setter: setResumeExpand, usestate: ResumeExpand },
      { name: 'Other', setter: setOtherExpand, usestate: OtherExpand },
      { name: 'Duke Nukem 3D', setter: setDuke3DExpand, usestate: Duke3DExpand }
    ];
  }

  function handleSetFocusItemTrue(name: string) {
    //click on one, other goes false

    const LowerCaseName = name.toLowerCase().split(' ').join('').trim();
    const setState = ObjectState();

    setState.forEach((item) => {
      const itemName = item.name.toLowerCase().split(' ').join('').trim();
      if (itemName === LowerCaseName) {
        item.setter((prev) => ({ ...prev, focusItem: true }));
      } else {
        item.setter((prev) => ({ ...prev, focusItem: false }));
      }
    });

    setIconState((prevIcons) =>
      prevIcons.map((icon) => ({
        ...icon,
        focus: false
      }))
    );
  }

  function inlineStyleExpand(name: string) {
    const passedName = name.split(' ').join('').toLowerCase();
    const setState = ObjectState();

    const item = setState.find((item) => {
      const itemName = item.name.split(' ').join('').toLowerCase();
      return itemName === passedName;
    });

    if (item) {
      return {
        display: item.usestate.show ? 'block' : '',
        maxWidth: 'none',
        width: '100%',
        height: 'calc(100% - 30px)',
        // if this app works at the end, remove the bellow code
        // left: `${item.usestate.x <= 0 ? Math.abs(item.usestate.x) * 2 + item.usestate.x : -item.usestate.x}px`,
        // top: `${item.usestate.y <= 0 ? Math.abs(item.usestate.y) * 2 + item.usestate.y : -item.usestate.y}px`,
        opacity: item.usestate.hide ? '0' : '1',
        zIndex: item.usestate.hide
          ? '-1'
          : item.usestate.focusItem
            ? '999'
            : '3'
        // pointerEvents: item.usestate.hide ? 'none' : 'auto',
        // resize: item.usestate.expand ? 'none' : ''
      };
    }
    return {};
  }

  function inlineStyle(name: string) {
    const setState = ObjectState();
    const passedName = name.split(' ').join('').toLowerCase();

    const item = setState.find((item) => {
      const itemName = item.name.split(' ').join('').toLowerCase();
      return itemName === passedName;
    });

    if (item) {
      return {
        display: item.usestate.show ? 'block' : '',
        opacity: item.usestate.hide ? '0' : '1',
        zIndex: item.usestate.hide
          ? '-1'
          : item.usestate.focusItem
            ? '999'
            : '3'
        // pointerEvents: item.usestate.hide ? 'none' : 'auto'
      };
    }
    return {};
  }

  function deleteTap(name: string) {
    const setState = ObjectState();
    const passedName = name.toLowerCase().split(' ').join('');

    setState.forEach((item) => {
      const itemName = item.name.toLowerCase().split(' ').join('');

      if (itemName === passedName) {
        item.setter((prev) => ({
          ...prev,
          show: false,
          expand: false,
          hide: false
        }));

        setTap((prevTap) =>
          prevTap.filter((tapItem) => {
            // get prevTap to prevent error
            const tapItemName = tapItem.title.toLowerCase().split(' ').join('');
            return tapItemName !== passedName;
          })
        );
      }
    });
  }

  function handleShow(name: string) {
    const lowerCaseName = name.toLowerCase().split(' ').join('');

    const allSetItems = ObjectState(); // call all usestate object

    allSetItems.forEach((item) => {
      const itemName = item.name.toLowerCase().split(' ').join('').trim();

      if (itemName === lowerCaseName) {
        setTimeout(() => {
          item.setter((prev) => ({
            ...prev,
            show: true,
            focusItem: true,
            hide: false
          }));
        }, 100);
      }

      if (itemName !== lowerCaseName) {
        item.setter((prev) => ({ ...prev, focusItem: false }));
      }
      if (itemName === lowerCaseName) {
        item.setter((prev) => ({ ...prev, hide: false }));
      }

      if (lowerCaseName == 'dukenukem3d') {
        openMessage();
      }
    });
    if (tap.some((tapItem) => tapItem.title == name)) return;
    setStartActive(false);

    if (name === 'Run') return; // not showing run on tap

    setTap((prevTap) => [
      ...prevTap,
      { title: name, icon: name } // create a new object for tap
    ]);

    setIconState((prevIcons) =>
      prevIcons.map((icon) => ({ ...icon, focus: false }))
    );
  }

  //getting icons to work
  const [iconState, setIconState] = useState(() =>
    iconInfo.map((icon) => ({
      ...icon
    }))
  );

  //taskbar

  function handleHideFolder(index: number) {
    // unhide icon from tap

    const lowerCaseName = tap[index].title
      .toLowerCase()
      .split(' ')
      .join('')
      .trim();

    const allSetItems = ObjectState(); // all the usestate name to toggle

    allSetItems.forEach((item) => {
      const itemName = item.name.toLowerCase().split(' ').join('').trim();

      if (itemName === lowerCaseName) {
        item.setter((prev) => ({ ...prev, focusItem: true }));
        if (item.usestate.hide) {
          item.setter((prev) => ({ ...prev, hide: false }));
        }
      }

      if (itemName !== lowerCaseName) {
        item.setter((prev) => ({ ...prev, focusItem: false }));
      }
    });
  }

  //start button stuff
  const [startActive, setStartActive] = useState(false);
  const startRef = useRef<HTMLButtonElement>(null);

  //folderCount
  const [folderCount, setFolderCount] = useState(0);

  //hasmoved
  // const [hasMoved, setHasMoved] = useState(false);

  //context

  const contextValue = {
    ResumeExpand,
    setResumeExpand,
    OtherExpand,
    setOtherExpand,
    Duke3DExpand,
    setDuke3DExpand,
    inlineStyle,
    inlineStyleExpand,
    deleteTap,
    iconState,
    setIconState,
    imageMapping,
    handleShow,
    tap,
    setTap,
    handleHideFolder,
    handleSetFocusItemTrue,
    StyleHide,
    ObjectState,
    openMessage,
    closeMessage,
    startActive,
    setStartActive,
    startRef,
    folderCount,
    setFolderCount
    // hasMoved,
    // setHasMoved
  };

  return (
    <UserContext.Provider value={contextValue}>
      <section className="heroContainer">
        <section className="fullscreen">
          <FileManager />
          <ResumeFolder />
          <OtherFolder />
          <DukeNukem3D />
        </section>
        <Taskbar />
      </section>
    </UserContext.Provider>
  );
};

export default HeroFeature;
