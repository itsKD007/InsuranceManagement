import './public/styles/main.scss';
import './public/assets/favicon.ico';

import { mount } from 'redom';

import App from './App';

window.addEventListener('load', () => {
  mount(document.body, new App());
});

