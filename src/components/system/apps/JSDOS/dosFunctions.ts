import { DosFn } from './DosType';

declare const Dos: DosFn;

export function openMessage() {
  let dosFinder = document.getElementById('dos') as HTMLDivElement;

  const DosApi = import.meta.env.VITE_DOS;

  if (!dosFinder) {
    console.log('dosFinder failed');
    return;
  }

  dosFinder.style.display = 'block';
  Dos(dosFinder, {
    url: DosApi,
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
