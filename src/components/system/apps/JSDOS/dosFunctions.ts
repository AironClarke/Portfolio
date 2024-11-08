import { DosFn } from './DosType';

declare const Dos: DosFn;

export function openMessage() {
  let dosFinder = document.getElementById('dos') as HTMLDivElement;

  if (!dosFinder) {
    console.log('dosFinder failed');
    return;
  }

  dosFinder.style.display = 'block';
  Dos(dosFinder, {
    url: 'https://pub-0f43c31da6244b9c8d180a4b62a89572.r2.dev/duke3D.jsdos',
    theme: 'light',
    autoStart: true,
    noCloud: true,
    imageRendering: 'smooth',
    renderAspect: '16/9'
  });
}

export function closeMessage() {
  let dosFinder = document.getElementById('dos');

  if (!dosFinder) {
    console.log('dosFinder failed');
    return;
  }

  dosFinder.style.display = 'none';
  Dos(dosFinder).stop();
}
