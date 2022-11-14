import { el } from 'redom';
import Scene from 'scenejs';
import Swal from 'sweetalert2';
import { inRange } from 'lodash';

import { alertIconColors } from './constants';

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

export function easyAlert(icon: 'success' | 'error', title: string, text: string) {
    
  return new Promise(resolve => { 
    Swal.fire({
      title,
      text,
      icon,
      confirmButtonText: 'OK',
      confirmButtonColor: '#2592E6',
      iconColor: alertIconColors[icon],
      background: '#f6f6f6'
    }).then(resolve)
  });
}

export function calculatePremium(baseAmount: number, age: number) {

  let amount = baseAmount;

  // For ages 18 - 25
  if(inRange(age, 18, 25))
    amount *= 1.1;
  // For ages 25 - 30
  else if(inRange(age, 25, 30))
    amount *= Math.pow(1.1, 2);
  // For ages 30 - 35
  else if(inRange(age, 30, 35))
    amount *= Math.pow(1.1, 3);
  // For ages 35 - 40
  else if(inRange(age, 35, 40))
    amount *= Math.pow(1.1, 4);
  // For ages 40+
  else {
    amount *= Math.pow(1.1, 4);
    amount *= 1.02;
  }

  return amount;

}
