import AbstractView from '../framework/view/abstract-view';
import SortMenu from '../view/sort-menu.js';
import {remove, render, RenderPosition} from '../framework/render';
import PresenterMovie from './presenterMovie';
import Filmcard from '../view/filmcard.js';
import Popup from '../view/popup.js';
import ShowMoreButton from '../view/show-more-button';
import EmptyList from '../view/empty-list';
import CommentsModel from '../model/commentsModel';
import SortMenuModel from '../model/sortMenuModel';
import MovieModel from '../model/movieModel';
import Menu from '../view/menu';


export default class PresenterSortMenu extends AbstractView{
  #sortedFilms;
  #filmsArray;
  #FILMCARD_COUNT_PER_STEP;
  #RenderedFilmcards;
  #showMoreButton;
  #newWatchlistNum;
  #newHistoryNum;
  #newFavoritesNum;
  constructor() {
    super();
    this.#FILMCARD_COUNT_PER_STEP = 5;
    this.#RenderedFilmcards = 5;
    this.#showMoreButton = new ShowMoreButton();
  }

  get template () {
    const sortMenu = new SortMenu();
    render(sortMenu, document.querySelector('.films'), RenderPosition.BEFOREBEGIN);
    sortMenu.sortMenuClickHandler((evt)=>{
      evt.preventDefault();
      if(!evt.path[0].classList.contains('sort__button--active')) {
        document.querySelector('.sort__button--active').classList.remove('sort__button--active');
        evt.path[0].classList.add('sort__button--active');
        document.querySelector('.films-list__container').innerHTML ='';
        if (document.querySelector('.films-list__show-more')) {
          document.querySelector('.films-list__show-more').remove();
        }
        this.filmList;
      }
    });
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
      setTimeout(()=>{
        if (document.querySelector('.film-card__controls-item')) {
          document.querySelectorAll('.film-card__controls-item').forEach((button)=>{
            button.addEventListener('click', ()=>{
              this.#recalculateMenu();
            });
          });
        }
      }, 500);
    } else {
      if (document.querySelector('.sort').style.visibility === 'hidden') {
        document.querySelector('.sort').style.visibility = 'visible';
      }
      for (let i = 0; i < this.#FILMCARD_COUNT_PER_STEP; i++) {
        new PresenterMovie(filmsArray[i], new CommentsModel().template, render, RenderPosition, Filmcard, Popup).filmcard();
      }
      setTimeout(()=>{
        if (document.querySelector('.film-card__controls-item')) {
          document.querySelectorAll('.film-card__controls-item').forEach((button)=>{
            button.addEventListener('click', ()=>{
              this.#recalculateMenu();
            });
          });
        }
      }, 500);
      render(this.#showMoreButton, document.querySelector('.films-list'), RenderPosition.BEFOREEND);
      this.#showMoreButton.removeClickHandler();
      this.#showMoreButton.setClickHandler(()=>{
        const filmsArray2 = filmsArray.slice(RenderedFilmcards2, RenderedFilmcards + FILMCARD_COUNT_PER_STEP);
        for (let i = 0; i < filmsArray2.length; i++) {
          new PresenterMovie(filmsArray2[i], new CommentsModel().template, render, RenderPosition, Filmcard, Popup).filmcard();
        }
        setTimeout(()=>{
          if (document.querySelector('.film-card__controls-item')) {
            document.querySelectorAll('.film-card__controls-item').forEach((button)=>{
              button.addEventListener('click', ()=>{
                this.#recalculateMenu();
              });
            });
          }
        }, 500);
        RenderedFilmcards2 += FILMCARD_COUNT_PER_STEP;
        if (RenderedFilmcards2 >= filmsArray.length) {
          remove(this.#showMoreButton);
        }
      });
    }
  };

  #recalculateMenu = () => {
    const films = new MovieModel().template2;
    this.#newWatchlistNum = [];
    this.#newHistoryNum = [];
    this.#newFavoritesNum = [];

    films.forEach((film)=>{
      if(film.user_details.watchlist){
        this.#newWatchlistNum.push(film);
      }
      if(film.user_details.alreadyWatched) {
        this.#newHistoryNum.push(film);
      }
      if(film.user_details.favorite){
        this.#newFavoritesNum.push(film);
      }
    });

    const filmCount = {
      watchlist: 12,
      history: 32,
      favorite: 43
    };

    if (document.querySelector('[href="#watchlist"] .main-navigation__item-count').textContent !== this.#newWatchlistNum.length) {
      new Menu(filmCount).watchlistNum = this.#newWatchlistNum.length;
    }
    if (document.querySelector('[href="#history"] .main-navigation__item-count').textContent !== this.#newHistoryNum.length) {
      new Menu(filmCount).historyNum = this.#newHistoryNum.length;
    }
    if (document.querySelector('[href="#favorites"] .main-navigation__item-count').textContent !== this.#newFavoritesNum.length) {
      new Menu(filmCount).favoritesNum = this.#newFavoritesNum.length;
    }
  };

  set filmList (value) {
    this.#filmsArray = value;
    this.#sortedFilms = new SortMenuModel(this.#filmsArray);
  }

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
}
