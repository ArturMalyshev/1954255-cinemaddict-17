import Menu from '../view/menu';
import { render, RenderPosition} from '../framework/render';
import PresenterSortMenu from './presenterSortMenu';
import MovieModel from '../model/movieModel';
import AbstractView from '../framework/view/abstract-view';

export default class PresenterMenu extends AbstractView {
  #allFilms;
  #menu;
  #filmCount;
  #films;
  constructor() {
    super();
    this.#films = new MovieModel();
    this.#films.init();
    this.#allFilms = [];

    this.#films.addObserver(this.#handleModelEvent);

    this.#filmCount = this.#films.sortedFilms;
  }

  #handleModelEvent = (actionType, films) => {
    switch (actionType) {
      case 'init':
        console.log(actionType, films);
        this.#menu.updateMenu(films);
        break;
    }
  };

  #handleViewAction = (actionType, update) => {
    console.log(actionType, update);
  };

  get getFilmArray () {
    const activeButton = document.querySelector('.main-navigation__item--active');
    if (activeButton.textContent.includes('movies')) {
      return this.#films.template;
    } else if (activeButton.innerHTML.includes('Watchlist')) {
      return this.#films.watchlistFilms;
    } else if (activeButton.innerHTML.includes('History')) {
      return this.#films.historyFilms;
    } else if (activeButton.innerHTML.includes('Favorite')) {
      return this.#films.favoriteFilms;
    } else {
      return '';
    }
  }

  get movies () {
    this.#allFilms = this.#films.template;
    return this.#allFilms;
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
        sortMenu.template();
        sortMenu.filmList = this.getFilmArray;
        // eslint-disable-next-line no-unused-expressions
        sortMenu.filmList;
      }
    });
    return '';
  }
}
