import { render, RenderPosition, remove } from '../framework/render.js';

import User from '../view/user.js';
import Menu from '../view/menu.js';
import Filmcard from '../view/filmcard.js';
import Popup from '../view/popup.js';
import EmptyList from '../view/empty-list.js';
import SortMenu from '../view/sort-menu.js';
import ShowMoreButton from '../view/show-more-button.js';

import PresenterMovie from './presenterMovie';

import { filmsArrayFromModel, commentsArray, userInfo } from '../model/model.js';

const user = new User(userInfo);
const menuCopy = new Menu(filmsArrayFromModel);
const sortMenu = new SortMenu(filmsArrayFromModel);
const showMoreButton = new ShowMoreButton();

render(user, document.querySelector('.header'),);
render(sortMenu, document.querySelector('.main'), RenderPosition.AFTERBEGIN);
render(menuCopy, document.querySelector('.main'), RenderPosition.AFTERBEGIN);

const FILMCARD_COUNT_PER_STEP = 5;
let RenderedFilmcards = 5;

const renderer = (filmsArray, emptyTemplate) => {
  if (filmsArray.length === 0) {
    document.querySelector('.films-list').appendChild(emptyTemplate);
  } else if (filmsArray.length <= FILMCARD_COUNT_PER_STEP){
    for (let i = 0; i < filmsArray.length; i++) {
      new PresenterMovie(filmsArray[i], commentsArray, render, RenderPosition, Filmcard, Popup).filmcard();
    }
  } else {
    for (let i = 0; i < FILMCARD_COUNT_PER_STEP; i++) {
      new PresenterMovie(filmsArray[i], commentsArray, render, RenderPosition, Filmcard, Popup).filmcard();
    }
    render(showMoreButton, document.querySelector('.films-list'), RenderPosition.BEFOREEND);
  }
};

document.querySelectorAll('.sort__button').forEach((button)=>{
  button.addEventListener('click', (evt)=>{
    evt.preventDefault();
    document.querySelector('.sort__button--active').classList.remove('sort__button--active');
    if(!button.classList.contains('sort__button--active')) {
      button.classList.add('sort__button--active');
    }

    document.querySelector('.films-list__container').innerHTML='';

    const films = sortMenu.filmList;

    menuCopy.menuClickHandler((event) => {
      event.preventDefault();
      document.querySelector('.films-list__container').innerHTML='';
      document.querySelector('.films-list').innerHTML = '<div class="films-list__container"></div>';
      const goodFilms = [];
      Array.from(films).forEach((film)=>{
        goodFilms.push(film);
      });
      const lastSelectedMenu = document.querySelector('.main-navigation__item--active');
      lastSelectedMenu.classList.remove('main-navigation__item--active');
      document.querySelector('[href="#all"]').classList.add('main-navigation__item--active');
      renderer(goodFilms, new EmptyList().EmptyAllMovies);
      showMoreButton.setClickHandler(() => {
        let RenderedFilmcards2 = 5;
        const filmsArray = goodFilms.slice(RenderedFilmcards2, RenderedFilmcards + FILMCARD_COUNT_PER_STEP);
        for (let i = 0; i< filmsArray.length; i++) {
          new PresenterMovie(filmsArray[i], commentsArray, render, RenderPosition, Filmcard, Popup).filmcard();
        }
        RenderedFilmcards2 += FILMCARD_COUNT_PER_STEP;
        if (RenderedFilmcards2 >= goodFilms.length) {
          remove(showMoreButton);
        }
      });
    }, '[href="#all"]');

    menuCopy.menuClickHandler((event) => {
      event.preventDefault();
      document.querySelector('.films-list__container').innerHTML='';
      document.querySelector('.films-list').innerHTML = '<div class="films-list__container"></div>';
      const goodFilms = [];

      Array.from(films).forEach((film)=>{
        if(film.user_details.watchlist){
          goodFilms.push(film);
        }
      });

      const lastSelectedMenu = document.querySelector('.main-navigation__item--active');
      lastSelectedMenu.classList.remove('main-navigation__item--active');
      document.querySelector('[href="#watchlist"]').classList.add('main-navigation__item--active');
      const content3 = new EmptyList().EmptyWatchlist;
      renderer(goodFilms, content3);
      showMoreButton.setClickHandler(() => {
        if (goodFilms.length > FILMCARD_COUNT_PER_STEP) {
          let RenderedFilmcards3 = FILMCARD_COUNT_PER_STEP;
          const filmsArray = goodFilms.slice(RenderedFilmcards3, RenderedFilmcards3 + FILMCARD_COUNT_PER_STEP);
          for (let i = 0; i< filmsArray.length; i++) {
            new PresenterMovie(filmsArray[i], commentsArray, render, RenderPosition, Filmcard, Popup).filmcard();
          }
          RenderedFilmcards3 += FILMCARD_COUNT_PER_STEP;
          if (RenderedFilmcards3 >= goodFilms.length) {
            remove(showMoreButton);
          }
        } else {
          let RenderedFilmcards3 = goodFilms.length;
          const filmsArray = goodFilms.slice(RenderedFilmcards3, RenderedFilmcards3 + FILMCARD_COUNT_PER_STEP);
          for (let i = 0; i< filmsArray.length; i++) {
            new PresenterMovie(filmsArray[i], commentsArray, render, RenderPosition, Filmcard, Popup).filmcard();
          }
          RenderedFilmcards3 += FILMCARD_COUNT_PER_STEP;
          if (RenderedFilmcards3 >= goodFilms.length) {
            remove(showMoreButton);
          }
        }
      });
    }, '[href="#watchlist"]');

    menuCopy.menuClickHandler((event) => {
      event.preventDefault();
      document.querySelector('.films-list__container').innerHTML='';
      document.querySelector('.films-list').innerHTML = '<div class="films-list__container"></div>';
      const goodFilms = [];
      Array.from(films).forEach((film)=>{
        if(film.user_details.alreadyWatched){
          goodFilms.push(film);
        }
      });

      const content4 = new EmptyList().EmptyHistory;
      renderer(goodFilms, content4);
      const lastSelectedMenu = document.querySelector('.main-navigation__item--active');
      lastSelectedMenu.classList.remove('main-navigation__item--active');
      document.querySelector('[href="#history"]').classList.add('main-navigation__item--active');
      showMoreButton.setClickHandler(() => {
        if (goodFilms.length > FILMCARD_COUNT_PER_STEP) {
          let RenderedFilmcards3 = FILMCARD_COUNT_PER_STEP;
          const filmsArray = goodFilms.slice(RenderedFilmcards3, RenderedFilmcards3 + FILMCARD_COUNT_PER_STEP);
          for (let i = 0; i< filmsArray.length; i++) {
            new PresenterMovie(filmsArray[i], commentsArray, render, RenderPosition, Filmcard, Popup).filmcard();
          }
          RenderedFilmcards3 += FILMCARD_COUNT_PER_STEP;
          if (RenderedFilmcards3 >= goodFilms.length) {
            remove(showMoreButton);
          }
        } else {
          let RenderedFilmcards3 = goodFilms.length;
          const filmsArray = goodFilms.slice(RenderedFilmcards3, RenderedFilmcards3 + FILMCARD_COUNT_PER_STEP);
          for (let i = 0; i< filmsArray.length; i++) {
            new PresenterMovie(filmsArray[i], commentsArray, render, RenderPosition, Filmcard, Popup).filmcard();
          }
          RenderedFilmcards3 += FILMCARD_COUNT_PER_STEP;
          if (RenderedFilmcards3 >= goodFilms.length) {
            remove(showMoreButton);
          }
        }
      });
    }, '[href="#history"]');

    menuCopy.menuClickHandler((event) => {
      event.preventDefault();
      document.querySelector('.films-list').innerHTML = '<div class="films-list__container"></div>';
      const goodFilms = [];
      Array.from(films).forEach((film)=>{
        if(film.user_details.favorite){
          goodFilms.push(film);
        }
      });
      renderer(goodFilms, new EmptyList().EmptyFavorites);
      const lastSelectedMenu = document.querySelector('.main-navigation__item--active');
      lastSelectedMenu.classList.remove('main-navigation__item--active');
      document.querySelector('[href="#favorites"]').classList.add('main-navigation__item--active');
      showMoreButton.setClickHandler(() => {
        if (goodFilms.length > FILMCARD_COUNT_PER_STEP) {
          let RenderedFilmcards3 = FILMCARD_COUNT_PER_STEP;
          const filmsArray = goodFilms.slice(RenderedFilmcards3, RenderedFilmcards3 + FILMCARD_COUNT_PER_STEP);
          for (let i = 0; i< filmsArray.length; i++) {
            new PresenterMovie(filmsArray[i], commentsArray, render, RenderPosition, Filmcard, Popup).filmcard();
          }
          RenderedFilmcards3 += FILMCARD_COUNT_PER_STEP;
          if (RenderedFilmcards3 >= goodFilms.length) {
            remove(showMoreButton);
          }
        } else {
          let RenderedFilmcards3 = goodFilms.length;
          const filmsArray = goodFilms.slice(RenderedFilmcards3, RenderedFilmcards3 + FILMCARD_COUNT_PER_STEP);
          for (let i = 0; i< filmsArray.length; i++) {
            new PresenterMovie(filmsArray[i], commentsArray, render, RenderPosition, Filmcard, Popup).filmcard();
          }
          RenderedFilmcards3 += FILMCARD_COUNT_PER_STEP;
          if (RenderedFilmcards3 >= goodFilms.length) {
            remove(showMoreButton);
          }
        }
      });
    }, '[href="#favorites"]');

    const content = new EmptyList().EmptyAllMovies;
    renderer(films.slice(), content);
    showMoreButton.setClickHandler(() => {

      const filmsArray = films.slice(RenderedFilmcards, RenderedFilmcards + FILMCARD_COUNT_PER_STEP);
      for (let i = 0; i< filmsArray.length; i++) {
        new PresenterMovie(filmsArray[i], commentsArray, render, RenderPosition, Filmcard, Popup).filmcard();
      }

      RenderedFilmcards += FILMCARD_COUNT_PER_STEP;

      if (RenderedFilmcards >= films.length) {
        remove(showMoreButton);
      }
    });
  });
});

document.querySelector('.sort__button--active').click();

document.addEventListener('keyup', (e) => {
  if (e.key === 'Escape') {
    if (document.querySelector('.film-details')) {
      document.querySelector('.film-details').remove();
      document.body.classList.remove('hide-overflow');
    }
  }
});
