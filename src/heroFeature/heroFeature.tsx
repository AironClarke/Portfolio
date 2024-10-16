import FileManager from 'src/files/FileManager';
import '../css/heroFeature.css';
import Taskbar from 'src/components/system/taskbar';
import ResumeFolder from 'src/folders/ResumeFolder';
import { useState } from 'react';
import UserContext from 'src/context/UserContext';

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

  function ObjectState() {
    return [
      { name: 'Resume', setter: setResumeExpand, usestate: ResumeExpand }
    ];
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
        display: item.usestate.show ? 'block' : ''
        // maxWidth: 'none',
        // width: '100%',
        // height: 'calc(100% - 37px)',
        // left: `${item.usestate.x <= 0 ? Math.abs(item.usestate.x) * 2 + item.usestate.x : -item.usestate.x}px`,
        // top: `${item.usestate.y <= 0 ? Math.abs(item.usestate.y) * 2 + item.usestate.y : -item.usestate.y}px`,
        // opacity: item.usestate.hide ? '0' : '1',
        // zIndex: item.usestate.hide ? '-1' : item.usestate.focusItem ? '999' : '3',
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
        opacity: item.usestate.hide ? '0' : '1'
        // zIndex: item.usestate.hide ? '-1' : item.usestate.focusItem ? '999' : '3'
        // pointerEvents: item.usestate.hide ? 'none' : 'auto'
      };
    }
    return {};
  }

  const contextValue = {
    ResumeExpand,
    setResumeExpand,
    inlineStyle,
    inlineStyleExpand
  };

  return (
    <UserContext.Provider value={contextValue}>
      <section className="heroContainer">
        <h1>Hello, world!</h1>;
        <FileManager />
        <ResumeFolder />
        <Taskbar />
      </section>
    </UserContext.Provider>
  );
};

export default HeroFeature;
