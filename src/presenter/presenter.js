import { render } from '../framework/render.js';
import User from '../view/user.js';
import UserModel from '../model/userModel';
import PresenterMenu from './presenterMenu';

const user = new User(new UserModel().template);
// eslint-disable-next-line no-unused-expressions
new PresenterMenu().template;

render(user, document.querySelector('.header'));

document.querySelector('[href="#all"]').click();

document.addEventListener('keyup', (e) => {
  if (e.key === 'Escape') {
    if (document.querySelector('.film-details')) {
      document.querySelector('.film-details').remove();
      document.body.classList.remove('hide-overflow');
    }
  }
});
