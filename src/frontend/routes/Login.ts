import { el, mount, RedomComponent, RedomElement, setChildren } from 'redom';

import { AppState } from '../App';
import Page from './abstract/Page';
import { LoginResponseBody, RegisterResponseBody, tileColors, tileIcons, User, UserType } from '../constants';

import { Tile } from '../components';
import { easyAlert, easyAnimate, getClassSelector } from '../utils';
import { textToParagraphs } from '../utils';
import { TilesContainer } from '../components/Tile';

class RegisterLink implements RedomComponent {
  private a = el(
    'a.register-link',
    { href: '#' },
    "New customer? Register here."
  );
  el = el('div.register-link-container', this.a);
  onClick(handler: () => void) {
    this.a.addEventListener('click', () => {
      handler();
    });
  }
}

class LoginForm implements RedomComponent {

  inputs = {
    username: el('input.pure-input-1', {
        type: 'text',
        name: 'username',
        required: true,
        placeholder: "Username",
    }) as HTMLInputElement,
    password: el('input.pure-input-1', {
        type: 'password',
        name: 'password',
        required: true,
        placeholder: "Password",
    }) as HTMLInputElement
  };

  submitButton = el('button.btn-submit.btn-login.pure-button', "Login");

  el = el('form.pure-form.pure-form-stacked.form-login',
    el('fieldset',
      el('label', {for: 'username'}, "Username"),
      this.inputs.username,
      el('label', {for: 'password'}, "Password"),
      this.inputs.password,
      this.submitButton)) as HTMLFormElement;

  get formValues() {
    return {
      username: this.inputs.username.value,
      password: this.inputs.password.value
    };
  }

  onSubmit(handler: () => void) {
    this.submitButton.addEventListener('click', (event: MouseEvent) => {
      event.preventDefault();
      handler();
    });
  }

}

class RegisterForm implements RedomComponent {

  inputs = {
    username: el('input.pure-input-1', {
        type: 'text',
        name: 'username',
        required: true,
        placeholder: "Username",
    }) as HTMLInputElement,
    name: el('input.pure-input-1', {
        type: 'text',
        name: 'name',
        required: true,
        placeholder: "Full Name",
    }) as HTMLInputElement,
    email: el('input.pure-input-1', {
        type: 'email',
        name: 'email',
        required: true,
        placeholder: "customer@example.com",
    }) as HTMLInputElement,
    phone: el('input.pure-input-1', {
        type: 'tel',
        name: 'phone',
        required: true,
        placeholder: "Phone Number",
        pattern: "\\d{10}"
    }) as HTMLInputElement,
    password: el('input.pure-input-1', {
        type: 'password',
        name: 'password',
        required: true,
        placeholder: "Password",
    }) as HTMLInputElement,
    confirmPassword: el('input.pure-input-1', {
        type: 'password',
        name: 'confirm-password',
        required: true,
        placeholder: "Password",
    }) as HTMLInputElement
  };

  submitButton = el('button.btn-submit.btn-register.pure-button', "Register");

  el = el('form.pure-form.pure-form-stacked.form-register',
    el('fieldset',
      el('label', {for: 'username'}, "Username"),
      this.inputs.username,
      el('label', {for: 'name'}, "Full Name"),
      this.inputs.name,
      el('label', {for: 'email'}, "Email Address"),
      this.inputs.email,
      el('label', {for: 'phone'}, "Phone Number"),
      this.inputs.phone,
      el('label', {for: 'password'}, "Password"),
      this.inputs.password,
      el('label', {for: 'confirm-password'}, "Confirm Password"),
      this.inputs.confirmPassword,
      this.submitButton)) as HTMLFormElement;

  get formValues() {
    return {
      username: this.inputs.username.value,
      name: this.inputs.name.value,
      email: this.inputs.email.value,
      phone: this.inputs.phone.value,
      password: this.inputs.password.value
    };
  }

  onSubmit(handler: () => void) {
    this.submitButton.addEventListener('click', (event: MouseEvent) => {
      event.preventDefault();
      handler();
    });
  }

}
export default class Login extends Page {

  private forms = {
    login: new LoginForm(),
    register: new RegisterForm()
  }
  private logoutButton = el('button.pure-button.btn-logout', "Logout");
  private text = `Please click the button below to log out of your account.

You may also choose to simply close this browser window, and you'll be logged out automatically. We have chosen not to make user sessions persistent due to security reasons.

Before you leave, you may choose to fill up our feedback form if you want to bring something to our attention, or if you simply enjoyed the experience.

Have a great rest of your day, and we hope to see you again!`;
  private textElem = el('div.text', textToParagraphs(this.text));

  private tiles = {
    customer: new Tile(
      tileIcons.login.customer,
      "Customer",
      tileColors.login.customer
    ),
    agent: new Tile(
      tileIcons.login.agent,
      "Agent",
      tileColors.login.agent
    ),
    admin: new Tile(
      tileIcons.login.admin,
      "Administrator",
      tileColors.login.admin
    )
  };

  private tilesContainer = new TilesContainer(Object.values(this.tiles));

  private registerLink = new RegisterLink();

  animateHide() {
    return easyAnimate(
      getClassSelector(this.content), [
        { opacity: 1 }, { opacity: 0 }
      ], 0.2
    );
  }

  animateShow() {
    return easyAnimate(
      getClassSelector(this.content), [
        { opacity: 0 }, { opacity: 1 }
      ], 0.2
    );
  }

  constructor() {
    super("Login", "Access Your Account");
    mount(this, this.content);
  }

  showLogout() {
    this.heading = "Logout";
    this.subheading = "Leave Your Account";
    setChildren(this.content, [this.textElem, this.logoutButton]);
    this.logoutButton.addEventListener('click', () => {
      window.location.reload(); 
    });
  }

  setLoggedIn(appState: AppState, user: User) {
      appState.isLoggedIn = true;
      appState.user = user;
      appState.dispatchEvent(new Event('login'));
  }

  update(appState: AppState) {

    const setupRegisterForm = () => {

      this.forms.register.onSubmit(async () => {
        const res = await fetch('/api/register', {
          method: 'post',
          body: JSON.stringify({
            ...this.forms.register.formValues
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const data: RegisterResponseBody = await res.json();

        if(!data.success || data.user == null) {
          if(data.error != null)
            easyAlert('error', "Error", data.error);
          return;
        }

        easyAlert(
          'success',
          "Welcome",
          `You have been registered with us. Please login as ${data.user.username} to continue.`
        );

        appState.dispatchEvent(new Event('register'));

      });

    }

    const setupLoginForm = (userType: UserType) => {

      this.forms.login.onSubmit(async () => {
        const res = await fetch('/api/login', {
          method: 'post',
          body: JSON.stringify({
            type: userType,
            ...this.forms.login.formValues
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const data: LoginResponseBody = await res.json();

        if(!data.success || data.user == null) {
          if(data.error != null)
            easyAlert('error', "Error", data.error);
          return;
        }

        await this.animateHide();

        this.setLoggedIn(appState, data.user);

        easyAlert(
          'success',
          "Welcome",
          `You are now logged in as ${data.user.username}`
        );

        this.animateShow();

      });

    }

    const setupTile = (userType: UserType) => {

      this.tiles[userType].onClick(async () => {

        await this.animateHide();

        const children: RedomElement[] = [this.forms.login];

        if(userType == UserType.CUSTOMER) {
          setupRegisterForm();
          this.registerLink.onClick(async () => {
            this.heading = "Register";
            this.subheading = "Become Our Valued Customer";
            await this.animateHide();
            setChildren(this.content, [this.forms.register]);
            await this.animateShow();
          })
          children.push(this.registerLink);
        }

        setChildren(this.content, children);

        setupLoginForm(userType);

        await this.animateShow();

      });

    }

    if(appState.isLoggedIn) {
      this.showLogout();
      return;
    }

    setChildren(this.content, [this.tilesContainer]);

    Object.keys(this.tiles).forEach((key: UserType) => {
      setupTile(key);
    });
  }

}
