import { RenderPosition, render } from '../render.js';

import { User } from '../view/componentUser.js';
import { Menu } from '../view/componentMenu.js';
import { Filmcard } from '../view/componentFilmcard.js';
import { Popup } from '../view/componentPopup.js';

import {films, commentsArray, userInfo} from '../model/model.js';

const user = new User(userInfo).generate;
const menuCopy = new Menu(userInfo);
const menu = menuCopy.menu;
const sortMenu = menuCopy.sortMenu;
const showMoreButton = menuCopy.showMoreButton;

render(user, document.querySelector('.header'));
render(menu, document.querySelector('.main'), RenderPosition.AFTERBEGIN);
render(sortMenu, document.querySelector('.main'), RenderPosition.AFTERBEGIN);
render(showMoreButton, document.querySelector('.films-list'), RenderPosition.BEFOREEND);

for (let i = 1; i < films.length; i++) {
  const filmcard = new Filmcard(films[i]).generate;
  filmcard.addEventListener('click', () => {
    if(document.querySelector('.film-details')){
      document.querySelector('.film-details').remove();
    }
    render(new Popup(films[i], commentsArray).generate, document.querySelector('.main'), RenderPosition.BEFOREEND);
    document.querySelector('body').classList.add('hide-overflow');
  });
  render(filmcard, document.querySelector('.films-list__container'), RenderPosition.BEFOREEND);
}

document.addEventListener('keyup', (e) => {
  if (e.key === 'Escape') {
    if (document.querySelector('.film-details')) {
      document.querySelector('.film-details').remove();
    }
  }
});
