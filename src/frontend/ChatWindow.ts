import { el, RedomComponent, mount } from 'redom';
import Scene from 'scenejs';

import Icon from './Icon';
import { getClassSelector } from './utils';

abstract class ChatBubble implements RedomComponent {
  textElem = el('div.message-text');
  bubble = el('div.chat-bubble', this.textElem);
  el = el('div.chat-bubble-container', this.bubble);
}

class UserChatBubble extends ChatBubble {
  constructor(message: string) {
    super();
    this.bubble.classList.add('chat-bubble-user')
    this.textElem.textContent = message;
  }
}

class BotChatBubble extends ChatBubble {
  constructor(isFirstMessage: boolean = false) {
    super();
    this.bubble.classList.add('chat-bubble-bot')
    this.textElem.textContent = (
      isFirstMessage
    ? "Welcome to KDI Pvt. Ltd. I am an automated user assistance system. How may I help you?"
    : "Thank you for contacting us. I am forwarding your query to our customer service team. You may speak to them shortly."
    );
  }
}

class ChatCompose implements RedomComponent {

  input: HTMLInputElement = el('input.chat-input', {type: 'text', placeholder: "Type a message..."}) as HTMLInputElement;
  send = el('div.chat-send', new Icon('mdi:send'));
  el = el('div.chat-compose', this.input, this.send);

  onSend(handler: () => void) {
    this.send.addEventListener('click', _event => {
      handler();
    });
    this.input.addEventListener('keydown', event => {
      if(event.key == 'Enter')
        handler();
    });
  }

}

export default class ChatWindow implements RedomComponent {

  closeButton = el('div.chat-close', new Icon('mdi:window-close'))
  header = el('div.chat-header',
    el('div.chat-logo',
      el('div.chat-logo-circle', new Icon('mdi:robot'))),
    el('div.chat-heading', "Chat With Us"),
    this.closeButton
  );
  body = el('div.chat-body');
  compose = new ChatCompose();
  el = el('div.chat-window', this.header, this.body, this.compose);

  constructor() {
    mount(this.body, new BotChatBubble(true));
    this.compose.onSend(async () => {
      this.addUserMessage(this.compose.input.value);
      this.compose.input.value = '';
      this.body.scrollTop = this.body.scrollHeight;
      await new Promise(resolve => setTimeout(resolve, 1000));
      this.addBotMessage();
      this.body.scrollTop = this.body.scrollHeight;
    });
  }

  addUserMessage(message: string) {
    mount(this.body, new UserChatBubble(message));
  }

  addBotMessage() {
    mount(this.body, new BotChatBubble());
  }

  onClose(handler: () => void) {
    this.closeButton.addEventListener('click', _event => {
      handler();
    });
  }

  async animateOpen() {
    await new Promise(resolve => {
      new Scene({
        [getClassSelector(this.el)]: {
          0: 'transform: translateY(100%); opacity: 0;',
          1: 'transform: translateY(0); opacity: 1;'
        }
      }, {
          selector: true,
          duration: 0.3,
          easing: 'ease',
          delay: 0
      }).playCSS().on('ended', resolve)
    });
  }

  async animateClose() {
    await new Promise(resolve => {
      new Scene({
        [getClassSelector(this.el)]: {
          0: 'transform: translateY(0); opacity: 1;',
          1: 'transform: translateY(100%); opacity: 0;'
        }
      }, {
          selector: true,
          duration: 0.3,
          easing: 'ease',
          delay: 0
      }).playCSS().on('ended', resolve)
    });
  }

  async onmount() {
    await this.animateOpen();
    this.body.scrollTop = this.body.scrollHeight;
    this.compose.input.focus();
  }

}