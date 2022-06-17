import Menu from '../view/menu';
import AbstractView from '../framework/view/abstract-view';
import { render, RenderPosition} from '../framework/render';
import PresenterSortMenu from './presenterSortMenu';
import MovieModel from '../model/movieModel';

export default class PresenterMenu extends AbstractView {
  #allFilms;
  #watchlistNum;
  #historyNum;
  #favoritesNum;
  #menu;
  #filmCount;
  #films;
  constructor() {
    super();
    this.#films = new MovieModel();
    this.#allFilms = this.#films.template;
    this.#watchlistNum = [];
    this.#historyNum = [];
    this.#favoritesNum = [];

    this.#allFilms.forEach((film)=>{
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
          document.querySelector('.sort').remove();
        }
        evt.path[0].classList.add('main-navigation__item--active');
        const sortMenu = new PresenterSortMenu(this.#films);
        sortMenu.template;
        sortMenu.filmList = this.getFilmArray;
        sortMenu.filmList;
      }
    }, '.main-navigation__item');
    return '';
  }
}
