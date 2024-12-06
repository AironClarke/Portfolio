import ThisPc from '/thisPC.svg';
import folder2 from '/folderTest.svg';
import DukeNukem3D from '/DukeNukem3DIcon.png';
import TinyMCE from '/tinymcelogo.svg';
import VSCode from '/VSCodeIcon.svg';
import PDFIcon from '/pdfIcon.svg';
import Portfolio from '/folderFilled.ico';

export function imageMapping(name: string): string {
  switch (name) {
    case 'Portfolio':
      // return Portfolio;
      return Portfolio;

    case 'ThisPC':
    case 'This PC':
      return ThisPc;

    case 'Folder2':
      return folder2;

    case 'DukenNukem3D':
    case 'Duke Nukem 3D':
      return DukeNukem3D;

    case 'TinyMCE':
      return TinyMCE;

    case 'Monaco Editor':
      return VSCode;

    case 'PDFIcon':
    case 'Resume':
      return PDFIcon;

    default:
      return '/notfound';
  }
}

export function handleDoubleClickEnterLink(
  name,
  setOpenProjectExpand,
  setProjectUrl
) {
  switch (name) {
    case 'Linkedin':
      window.open('https://www.linkedin.com/feed/', '_blank');
      break;
    case 'Github':
      window.open('https://github.com/', '_blank');
      break;
    default:
      break;
  }
}

export function handleDoubleTapEnterMobile(
  name,
  lastTapTime,
  setLastTapTime,
  setOpenProjectExpand,
  setProjectUrl
) {
  const now = Date.now();
  if (now - lastTapTime < 300) {
    switch (name) {
      case 'Linkedin':
        window.open('https://www.linkedin.com/feed/', '_blank');
        break;
      case 'Github':
        window.open('https://github.com/', '_blank');
        break;
      default:
        break;
    }
  }
  setLastTapTime(now);
}
