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
import SortMenuModel from "../model/sortMenuModel";


export default class PresenterSortMenu extends AbstractView{
  #sortedFilms;
  #filmsArray;
  #FILMCARD_COUNT_PER_STEP;
  #RenderedFilmcards;
  #showMoreButton;
  constructor() {
    super();
    // this.#menu = new PresenterMenu(new MovieModel().template);
    this.#FILMCARD_COUNT_PER_STEP = 5;
    this.#RenderedFilmcards = 5;
    this.#showMoreButton = new ShowMoreButton();
  }

  get template () {
    const sortMenu = new SortMenu();
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
      this.renderer(this.#sortedFilms.getSortedFilms('sortByDate'));
    } else if (elem.textContent === 'Sort by rating') {
      this.renderer(this.#sortedFilms.getSortedFilms('sortByRating'));
    } else {
      this.renderer(this.#sortedFilms.getSortedFilms());
    }
    return '';
  }

  set filmList (value) {
    this.#filmsArray = value;
    this.#sortedFilms = new SortMenuModel(this.#filmsArray);
  }
}
