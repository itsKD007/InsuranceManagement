import { el } from 'redom';
import Scene from 'scenejs';

export function getClassSelector(element: HTMLElement) {
  const tagName = element.tagName.toLocaleLowerCase();
  const classes = element.className.split(' ').join('.');
  return `${tagName}.${classes}`;
} 

export function textToParagraphs(text: string) {
  return text.split('\n\n').map(text => el('p', text))
}

export async function animateShow(selector: string, duration: number = 0.5) {
  await new Promise(resolve => {
    new Scene({
      [selector]: {
        0: "opacity: 0;",
        1: "opacity: 1;"
      }
    }, {
        selector: true,
        duration,
        easing: 'ease',
        fillMode: 'forwards'
    }).playCSS().on('ended', resolve);
  });
}

export async function animateHide(selector: string, duration: number = 0.5) {
  await new Promise(resolve => {
    new Scene({
      [selector]: {
        0: "opacity: 1;",
        1: "opacity: 0;"
      }
    }, {
        selector: true,
        duration,
        easing: 'ease',
        fillMode: 'forwards'
    }).playCSS().on('ended', resolve);
  });
}

