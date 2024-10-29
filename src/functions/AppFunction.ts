import icon from '/thisPC.svg';
import folder2 from '/folderTest.svg';

export function imageMapping(name: string): string {
  switch (name) {
    case 'Resume':
      // return Resume;
      return icon;

    case 'Folder2':
      return folder2;

    default:
      return '/notfound';
  }
}
