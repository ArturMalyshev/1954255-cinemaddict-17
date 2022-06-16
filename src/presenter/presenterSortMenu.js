import AbstractView from '../framework/view/abstract-view';
import SortMenu from '../view/sort-menu.js';
import {remove, render, RenderPosition} from '../framework/render';
import PresenterMenu from './presenterMenu';
import PresenterMovie from './presenterMovie';
import Filmcard from '../view/filmcard.js';
import Popup from '../view/popup.js';
import ShowMoreButton from '../view/show-more-button';
import EmptyList from '../view/empty-list';
import MovieModel from "../model/movieModel";
import CommentsModel from "../model/commentsModel";


export default class PresenterSortMenu extends AbstractView{
  #filmsArray;
  #menu;
  #FILMCARD_COUNT_PER_STEP;
  #RenderedFilmcards;
  #showMoreButton;
  constructor(films) {
    super();
    this.#filmsArray = films;
    this.#menu = new PresenterMenu(new MovieModel().template);
    this.#FILMCARD_COUNT_PER_STEP = 5;
    this.#RenderedFilmcards = 5;
    this.#showMoreButton = new ShowMoreButton();
  }

  #sortByDate = (films) => {
    const array = films.slice();
    array.sort((a, b) => Date.parse(b.film_info.release.date) - Date.parse(a.film_info.release.date));
    return array;
  };

  #sortByRating = (films) => {
    const array = films.slice();
    array.sort((a, b) => b.film_info.total_rating - a.film_info.total_rating);
    return array;
  };

  get template () {
    const sortMenu = new SortMenu(this.#filmsArray);
    render(sortMenu, document.querySelector('.main'), RenderPosition.AFTERBEGIN);
    return '';
  }

  renderer = (filmsArray) => {
    const FILMCARD_COUNT_PER_STEP = 5;
    const RenderedFilmcards = 5;
    let RenderedFilmcards2 = 5;
    if (filmsArray.length === 0) {
      const newEmptyList = new EmptyList();
      const selectedMenuItem = document.querySelector('.main-navigation__item--active').getAttribute('href');
      if (document.querySelector('.sort').style.visibility !== 'hidden') {
        document.querySelector('.sort').style.visibility = 'hidden';
      }
      let emptyTemplate;
      if (selectedMenuItem === '#watchlist') {
        emptyTemplate = newEmptyList.EmptyWatchlist;
      } else if (selectedMenuItem === '#favorites') {
        emptyTemplate = newEmptyList.EmptyFavorites;
      } else if (selectedMenuItem === '#history') {
        emptyTemplate = newEmptyList.EmptyHistory;
      } else {
        emptyTemplate = newEmptyList.EmptyAllMovies;
      }
      document.querySelector('.films-list__container').innerHTML = '';
      document.querySelector('.films-list__container').appendChild(emptyTemplate);
    } else if (filmsArray.length <= this.#FILMCARD_COUNT_PER_STEP){
      if (document.querySelector('.sort').style.visibility === 'hidden') {
        document.querySelector('.sort').style.visibility = 'visible';
      }
      for (let i = 0; i < filmsArray.length; i++) {
        new PresenterMovie(filmsArray[i], new CommentsModel().template, render, RenderPosition, Filmcard, Popup).filmcard();
      }
    } else {
      if (document.querySelector('.sort').style.visibility === 'hidden') {
        document.querySelector('.sort').style.visibility = 'visible';
      }
      for (let i = 0; i < this.#FILMCARD_COUNT_PER_STEP; i++) {
        new PresenterMovie(filmsArray[i], new CommentsModel().template, render, RenderPosition, Filmcard, Popup).filmcard();
      }
      render(this.#showMoreButton, document.querySelector('.films-list'), RenderPosition.BEFOREEND);
      this.#showMoreButton.removeClickHandler();
      this.#showMoreButton.setClickHandler(()=>{
        const filmsArray2 = filmsArray.slice(RenderedFilmcards2, RenderedFilmcards + FILMCARD_COUNT_PER_STEP);
        for (let i = 0; i < filmsArray2.length; i++) {
          new PresenterMovie(filmsArray2[i], new CommentsModel().template, render, RenderPosition, Filmcard, Popup).filmcard();
        }
        RenderedFilmcards2 += FILMCARD_COUNT_PER_STEP;
        if (RenderedFilmcards2 >= filmsArray.length) {
          remove(this.#showMoreButton);
        }
      });
    }
  };

  get filmList() {
    document.querySelector('.films-list__container').innerHTML='';
    const elem = document.querySelector('.sort__button--active');
    if (elem.textContent === 'Sort by date') {
      this.#filmsArray = this.#menu.getFilmArray;
      this.renderer(this.#sortByDate(this.#filmsArray));
    } else if (elem.textContent === 'Sort by rating') {
      this.#filmsArray = this.#menu.getFilmArray;
      this.renderer(this.#sortByRating(this.#filmsArray));
    } else {
      this.renderer(this.#filmsArray);
    }
    return '';
  }

  set filmList (value) {
    this.#filmsArray = value;
  }
}
