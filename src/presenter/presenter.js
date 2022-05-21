import { RenderPosition, render } from '../render.js';

import { User } from '../view/componentUser.js';
import { Menu } from '../view/componentMenu.js';
import { Filmcard } from '../view/componentFilmcard.js';
import { Popup } from '../view/componentPopup.js';
import { EmptyList } from '../view/componentEmptyList.js';

import {films, commentsArray, userInfo} from '../model/model.js';

const user = new User(userInfo).generate;
const menuCopy = new Menu(userInfo);
const menu = menuCopy.menu;
const sortMenu = menuCopy.sortMenu;
const showMoreButton = menuCopy.showMoreButton;
const FILMCARD_COUNT_PER_STEP = 5;
let RenderedFilmcards = 5;
render(user, document.querySelector('.header'));
render(menu, document.querySelector('.main'), RenderPosition.AFTERBEGIN);
render(sortMenu, document.querySelector('.main'), RenderPosition.AFTERBEGIN);

if (films.length === 0) {
  const content = new EmptyList();
  render(content.EmptyAllMovies, document.querySelector('.films-list'), RenderPosition.BEFOREEND);
} else if (films.length <= FILMCARD_COUNT_PER_STEP){
  for (let i = 0; i < films.length; i++) {
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
} else {
  for (let i = 0; i < FILMCARD_COUNT_PER_STEP; i++) {
    const filmcard = new Filmcard(films[i]).generate;
    filmcard.addEventListener('click', () => {
      if (document.querySelector('.film-details')) {
        document.querySelector('.film-details').remove();
      }
      render(new Popup(films[i], commentsArray).generate, document.querySelector('.main'), RenderPosition.BEFOREEND);
      document.body.classList.add('hide-overflow');
    });
    render(filmcard, document.querySelector('.films-list__container'), RenderPosition.BEFOREEND);
    render(showMoreButton, document.querySelector('.films-list'), RenderPosition.BEFOREEND);
  }
}

document.addEventListener('keyup', (e) => {
  if (e.key === 'Escape') {
    if (document.querySelector('.film-details')) {
      document.querySelector('.film-details').remove();
      document.body.classList.remove('hide-overflow');
    }
  }
});

showMoreButton.addEventListener('click', () => {
  films.slice(RenderedFilmcards, RenderedFilmcards + FILMCARD_COUNT_PER_STEP)
    .forEach((task) => {
      const filmcard = new Filmcard(task).generate;
      filmcard.addEventListener('click', () => {
        if (document.querySelector('.film-details')) {
          document.querySelector('.film-details').remove();
        }
        render(new Popup(task, commentsArray).generate, document.querySelector('.main'), RenderPosition.BEFOREEND);
        document.body.classList.add('hide-overflow');
      });
      render(filmcard, document.querySelector('.films-list__container'), RenderPosition.BEFOREEND);
    });

  RenderedFilmcards += FILMCARD_COUNT_PER_STEP;

  if (RenderedFilmcards >= films.length) {
    showMoreButton.remove();
  }
});
