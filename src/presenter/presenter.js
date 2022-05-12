import { RenderPosition, render } from '../render.js';

import { User } from '../view/componentUser.js';
import { Menu } from '../view/componentMenu.js';
import { Filmcard } from '../view/componentFilmcard.js';
import { Popup } from '../view/componentPopup.js';

import {films, commentsArray, userInfo} from '../model/model.js';

const user = new User(userInfo).generate();
const menuCopy = new Menu(userInfo);
const menu = menuCopy.generateMenu();
const sortMenu = menuCopy.generateSortMenu();
const showMoreButton = menuCopy.generateShowMoreButton();

render(user, document.querySelector('.header'));
render(menu, document.querySelector('.main'), RenderPosition.AFTERBEGIN);
render(sortMenu, document.querySelector('.main'), RenderPosition.AFTERBEGIN);

for (let i = 1; i < films.length; i++) {
  const filmcard = new Filmcard(films[i]);
  render(filmcard.generate(), document.querySelector('.films-list__container'), RenderPosition.BEFOREEND);
}

render(new Popup(films[0], commentsArray).generate(), document.querySelector('.main'), RenderPosition.BEFOREEND);
render(showMoreButton, document.querySelector('.films-list'), RenderPosition.BEFOREEND);
