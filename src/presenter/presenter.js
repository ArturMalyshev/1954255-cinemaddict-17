import { render } from '../framework/render.js';

import User from '../view/user.js';

import { filmsArrayFromModel, userInfo } from '../model/model.js';
import PresenterMenu from './presenterMenu';

const user = new User(userInfo);

const menu = new PresenterMenu(filmsArrayFromModel);
// eslint-disable-next-line no-unused-expressions
menu.template;

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
