function handleShow(name) {
  if (name === '' || !name) return;

  const lowerCaseName = name.toLowerCase().split(' ').join('');

  const allSetItems = ObjectState(); // call all usestate object

  allSetItems.forEach((item) => {
    const itemName = item.name.toLowerCase().trim();

    if (itemName === lowerCaseName) {
      setTimeout(() => {
        item.setter((prev) => ({
          ...prev,
          show: true,
          focusItem: true,
          hide: false
        }));
      }, 100);
      if (lowerCaseName === 'mail') clippySendemailfunction();
      if (lowerCaseName === 'winamp') clippySongFunction();
      if (lowerCaseName === 'msn') clippyUsernameFunction();
      if (lowerCaseName === 'nft') {
        handleDoubleClickiframe('Nft', setOpenProjectExpand, setProjectUrl);
        handleShow('Internet');
      }
      if (lowerCaseName === 'note') {
        handleDoubleClickiframe('Note', setOpenProjectExpand, setProjectUrl);
        handleShow('Internet');
      }
    }
    item.setter((prev) => ({ ...prev, focusItem: false }));
  });
  if (tap.includes(name)) return;
  setStartActive(false);

  if (name === 'Run' || name === 'Nft' || name === 'Note') return; // not showing run on tap

  setTap((prevTap) => [...prevTap, name]);
  setDesktopIcon((prevIcons) =>
    prevIcons.map((icon) => ({ ...icon, focus: false }))
  );
}

function handleShowMobile(name) {
  const now = Date.now();

  if (now - lastTapTime < 300) {
    if (name === '' || !name) return;

    const lowerCaseName = name.toLowerCase().split(' ').join('');

    const allSetItems = ObjectState();

    allSetItems.forEach((item) => {
      const itemName = item.name.toLowerCase().trim();

      if (itemName === lowerCaseName) {
        setTimeout(() => {
          item.setter((prev) => ({
            ...prev,
            show: true,
            focusItem: true,
            hide: false
          }));
        }, 100);
        if (lowerCaseName === 'mail') clippySendemailfunction();
        if (lowerCaseName === 'winamp') clippySongFunction();
        if (lowerCaseName === 'msn') clippyUsernameFunction();
        if (lowerCaseName === 'nft') {
          handleDoubleClickiframe('Nft', setOpenProjectExpand, setProjectUrl);
          handleShow('Internet');
        }
        if (lowerCaseName === 'note') {
          handleDoubleClickiframe('Note', setOpenProjectExpand, setProjectUrl);
          handleShow('Internet');
        }
      }

      item.setter((prev) => ({ ...prev, focusItem: false }));
    });

    if (tap.includes(name)) return;
    setStartActive(false);

    if (name === 'Run' || name === 'Nft' || name === 'Note') return; // not showing run on tap

    setTap((prevTap) => [...prevTap, name]);
    setDesktopIcon((prevIcons) =>
      prevIcons.map((icon) => ({ ...icon, focus: false }))
    );
  }
  setLastTapTime(now);
}
