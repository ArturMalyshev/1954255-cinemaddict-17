import { User } from './componentUser.js';
import { Menu } from './componentMenu.js';
import { Filmcard } from './componentFilmcard.js';
import { Popup } from './componentPopup.js';

import { RenderPosition, render } from '../render';

const filmInfo = {
  filmName: 'Рататуй',
  originalName: 'rat and food',
  imgPath: './images/posters/popeye-meets-sinbad.png',
  rating: '7.2',
  year: '2022',
  date: '12 march 2022',
  duration: '1h 12min',
  genre: ['Action', 'Mystery', 'Film-Noir'],
  description: 'Тут должно быть очень интересное описание',
  commentCount: 12,
  country: 'USA',
  director: 'Губка боб',
  autors: [
    'Anne Wigton',
    'Heinz Herald',
    'Richard Weil'
  ],
  actors: [
    'Erich von Stroheim',
    'Mary Beth Hughes',
    'Dan Duryea'
  ],
  ageLimit: '18+'
};

const userInfo = {
  name: 'Имя Имя',
  img: 'images/bitmap@2x.png',
  watchlistNum: 12,
  historyNum: 32,
  favoritesNum: 12
};

const user = new User(userInfo);
const user1 = user.generate();

const menu = new Menu(userInfo);
const menu1 = menu.generateMenu();
const sortMenu = menu.generateSortMenu();
const showMoreButton = menu.generateShowMoreButton();

const filmcard = new Filmcard(filmInfo);


const filmPopup = new Popup(filmInfo);
const filmePopup1 = filmPopup.generate();

render(user1, document.querySelector('.header'));
render(menu1, document.querySelector('.main'), RenderPosition.AFTERBEGIN);
render(sortMenu, document.querySelector('.main'), RenderPosition.AFTERBEGIN);
render(filmcard.generate(), document.querySelector('.films-list__container'), RenderPosition.BEFOREEND);
render(filmcard.generate(), document.querySelector('.films-list__container'), RenderPosition.BEFOREEND);
render(filmcard.generate(), document.querySelector('.films-list__container'), RenderPosition.BEFOREEND);
render(filmcard.generate(), document.querySelector('.films-list__container'), RenderPosition.BEFOREEND);
render(filmcard.generate(), document.querySelector('.films-list__container'), RenderPosition.BEFOREEND);
render(filmePopup1, document.querySelector('.main'), RenderPosition.BEFOREEND);
render(showMoreButton, document.querySelector('.films-list'), RenderPosition.BEFOREEND);
