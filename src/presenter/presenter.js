import { render } from '../framework/render.js';
shimport User from '../view/user.js';
import UserModel from '../model/userModel'
import PresenterMenu from './presenterMenu';
import MovieModel from "../model/movieModel";

const user = new User(new UserModel().template);
const menu = new PresenterMenu(new MovieModel().template);
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
