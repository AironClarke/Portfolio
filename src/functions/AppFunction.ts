import ThisPc from '/thisPC.svg';
import folder2 from '/folderTest.svg';
import DukeNukem3D from '/DukeNukem3DIcon.png';
import word from '/wordIcon.svg';
import VSCode from '/VSCodeIcon.svg';
import PDFIcon from '/pdfIcon.svg';
import Portfolio from '/folderFilled.ico';

export function imageMapping(name: string): string {
  switch (name) {
    case 'Portfolio':
      // return Portfolio;
      return Portfolio;

    case 'ThisPC':
      return ThisPc;

    case 'Folder2':
      return folder2;

    case 'DukenNukem3D':
      return DukeNukem3D;

    case 'Word':
      return word;

    case 'Monaco Editor':
      return VSCode;

    case 'PDFIcon':
      return PDFIcon;

    default:
      return '/notfound';
  }
}
