import Menu from '../view/menu';
import AbstractView from '../framework/view/abstract-view';
import { render, RenderPosition} from '../framework/render';
import PresenterSortMenu from './presenterSortMenu';
import {filmsArrayFromModel} from '../model/model';

export default class PresenterMenu extends AbstractView {
  #allFilms;
  #watchlistNum;
  #historyNum;
  #favoritesNum;
  #menu;
  #filmCount;
  constructor(filmsArray) {
    super();
    this.#allFilms = filmsArray;
    this.#watchlistNum = [];
    this.#historyNum = [];
    this.#favoritesNum = [];

    filmsArray.forEach((film)=>{
      if(film.user_details.watchlist){
        this.#watchlistNum.push(film);
      }
      if(film.user_details.alreadyWatched) {
        this.#historyNum.push(film);
      }
      if(film.user_details.favorite){
        this.#favoritesNum.push(film);
      }
    });

    this.#filmCount = {
      watchlist: this.#watchlistNum.length,
      history: this.#historyNum.length,
      favorite: this.#favoritesNum.length
    };
  }

  get getFilmArray () {
    const activeButton = document.querySelector('.main-navigation__item--active');
    if (activeButton.textContent.includes('movies')) {
      return this.#allFilms;
    } else if (activeButton.innerHTML.includes('Watchlist')) {
      return this.#watchlistNum;
    } else if (activeButton.innerHTML.includes('History')) {
      return this.#historyNum;
    } else if (activeButton.innerHTML.includes('Favorite')) {
      return this.#favoritesNum;
    } else {
      return activeButton.textContent;
    }
  }

  get template () {
    const sortMenu = new PresenterSortMenu(filmsArrayFromModel);
    // eslint-disable-next-line no-unused-expressions
    sortMenu.template;

    this.#menu = new Menu(this.#filmCount);
    render(this.#menu, document.querySelector('.main'), RenderPosition.AFTERBEGIN);
    this.#menu.menuClickHandler((evt)=>{
      evt.preventDefault();
      if (document.querySelector('.films-list__show-more')) {
        document.querySelector('.films-list__show-more').remove();
      }
      if (!evt.path[0].classList.contains('main-navigation__item--active')) {
        if (document.querySelector('.main-navigation__item--active')) {
          document.querySelector('.main-navigation__item--active').classList.remove('main-navigation__item--active');
        }
        evt.path[0].classList.add('main-navigation__item--active');
        sortMenu.filmList = this.getFilmArray;
        // eslint-disable-next-line no-unused-expressions
        sortMenu.filmList;
      }
    }, '.main-navigation__item');

    document.querySelectorAll('.sort__button').forEach((button)=>{
      button.addEventListener('click', (evt)=>{
        evt.preventDefault();
        if(!button.classList.contains('sort__button--active')) {
          document.querySelector('.sort__button--active').classList.remove('sort__button--active');
          button.classList.add('sort__button--active');
          document.querySelector('.films-list__container').innerHTML ='';
          // eslint-disable-next-line no-unused-expressions
          sortMenu.filmList;
        }
      });
    });

    return '';
  }
}
