import { Tap } from 'src/context/UserContext';
import { ObjectStateItem } from 'src/heroFeature/heroFeature';

// style function for bg tap
// we should remove theses = 'none' values when polishing this file
export function StyleHide(
  index: number,
  tap: Tap,
  ObjectState: ObjectStateItem
) {
  console.log(tap, index);
  const boxshadowstyleTrue = 'none';
  const bgStyleTrue = 'rgba(0, 0, 0, 60%)';

  const boxshadowstyleFalse = 'none';
  const bgStyleFalse = 'none';

  const setState = ObjectState();

  const namePassed = tap[index].title.split(' ').join('').toLowerCase();

  const foundItem = setState.find((item) => {
    const itemName = item.name.split(' ').join('').toLowerCase();

    return itemName === namePassed;
  });

  if (foundItem) {
    return foundItem.usestate.focusItem
      ? { boxShadow: boxshadowstyleTrue, background: bgStyleTrue }
      : { boxShadow: boxshadowstyleFalse, background: bgStyleFalse };
  }

  return {};
}
