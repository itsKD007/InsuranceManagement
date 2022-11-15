import { el, mount, RedomComponent, RedomElement, setChildren } from 'redom';
import { startCase } from 'lodash';

import { AppState } from '../App';
import Page from './abstract/Page';
import { LoginResponseBody, RegisterResponseBody, tileColors, tileIcons, User, UserType } from '../constants';

import { Tile } from '../components';
import { easyAlert } from '../utils';
import { textToParagraphs } from '../utils';
import { TilesContainer } from '../components/Tile';

class RegisterLink implements RedomComponent {
  private a = el(
    'a.register-link',
    { href: '#' },
    ""
  );
  el = el('div.register-link-container', this.a);
  constructor() {
    this.a.addEventListener('click', () => {
      this.clickHandler();
    });
  }
  set text(text: string) {
    this.a.textContent = text;
  }
  clickHandler() { }
  onClick(handler: () => void) {
    this.clickHandler = handler;
  }
}

class LoginForm implements RedomComponent {

  private inputs = {
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

  private submitButton = el('button.btn-submit.btn-login.pure-button', "Login");

  el = el('form.pure-form.pure-form-stacked.kdi-form.form-login',
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

  constructor() {
    this.submitButton.addEventListener('click', (event: MouseEvent) => {
      event.preventDefault();
      this.submitHandler();
    });
  }

  submitHandler() {}

  onSubmit(handler: () => void) {
    this.submitHandler = handler;
  }

}

class RegisterForm implements RedomComponent {

  private inputs = {
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

  private submitButton = el('button.btn-submit.btn-register.pure-button', "Register");

  el = el('form.pure-form.pure-form-stacked.kdi-form.form-register',
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

  validate() {
    const passwordsMatch = (
      this.inputs.password.value ==
        this.inputs.confirmPassword.value
    );
    const inputsValid = Object.values(this.inputs)
      .every(input => input.validity.valid);
    
    if(!passwordsMatch)
      easyAlert('error', "Error", "Passwords do not match.");
    else if(!inputsValid)
      easyAlert('error', "Error", "Some of the fields have invalid input.");

    return passwordsMatch && inputsValid;

  }

  constructor() {
    this.submitButton.addEventListener('click', (event: MouseEvent) => {
      event.preventDefault();
      this.submitHandler();
    });
  }

  private submitHandler() {}

  onSubmit(handler: () => void) {
    this.submitHandler = handler;
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

    const setupRegisterForm = (userType: UserType) => {

      this.forms.register.onSubmit(async () => {

        if(!this.forms.register.validate())
          return;

        const res = await fetch('/api/register', {
          method: 'post',
          body: JSON.stringify({
            type: userType,
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

        if([UserType.CUSTOMER, UserType.AGENT].includes(userType)) {
          setupRegisterForm(userType);
          this.registerLink.text = ({
            [UserType.CUSTOMER]: "New Customer? Register Here.",
            [UserType.AGENT]: "Want to work with us? Register Here.",
            [UserType.ADMIN]: "Found a bug? Report to us."
          }[userType]);
          this.registerLink.onClick(async () => {
            this.heading = "Register";
            this.subheading = `Become Our Valued ${startCase(userType.toString())}`;
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

    this.heading = "Login";
    this.subheading = "Access Your Account";

    Object.keys(this.tiles).forEach((key: UserType) => {
      setupTile(key);
    });
  }

}
