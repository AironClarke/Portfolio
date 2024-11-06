import icon from '/thisPC.svg';
import folder2 from '/folderTest.svg';
import DukeNukem3D from '/DukeNukem3DIcon.png';

export function imageMapping(name: string): string {
  switch (name) {
    case 'Resume':
      // return Resume;
      return icon;

    case 'Folder2':
      return folder2;

    case 'DukenNukem3D':
      return DukeNukem3D;

    default:
      return '/notfound';
  }
}
