import { Tap } from 'src/context/UserContext';
import { useContext } from 'react';
import { UserContext } from 'src/context/UserContext';

// style function for bg tap
// we should remove theses = 'none' values when polishing this file
export function StyleHide(index: number, tap: Tap) {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error('userContext not found');
  }

  const { ObjectState } = userContext;

  const boxshadowstyleTrue = 'none';
  const bgStyleTrue = 'rgba(0, 0, 0, 60%)';

  const boxshadowstyleFalse = 'none';

  const setState = ObjectState();

  const namePassed = tap[index].title.split(' ').join('').toLowerCase();

  const foundItem = setState.find((item: { name: string }) => {
    const itemName = item.name.split(' ').join('').toLowerCase();

    return itemName === namePassed;
  });

  if (foundItem) {
    return foundItem.usestate.focusItem
      ? { boxShadow: boxshadowstyleTrue, background: bgStyleTrue }
      : { boxShadow: boxshadowstyleFalse };
  }

  return {};
}
