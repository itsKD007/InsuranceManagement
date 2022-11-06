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

export function easyAnimate(selector: string, keyframes: [object, object], duration: number = 0.5) {
  return new Promise(resolve => {
    new Scene({
      [selector]: keyframes
    }, {
        selector: true,
        duration,
        easing: 'ease',
        fillMode: 'forwards'
    }).playCSS().on('ended', resolve);
  });
}

