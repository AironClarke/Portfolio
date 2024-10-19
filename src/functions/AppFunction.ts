import icon from '/thisPC.svg';

export function imageMapping(name: string): string {
  switch (name) {
    case 'Resume':
      // return Resume;
      return icon;

    default:
      return '/notfound';
  }
}
