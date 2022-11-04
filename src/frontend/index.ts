import './public/styles/main.scss';

import { mount } from 'redom';

import App from './App';

window.addEventListener('load', () => {
  mount(document.body, new App());
});

