import AbstractStatefulView from '../framework/view/abstract-stateful-view';

export default class Menu extends AbstractStatefulView{
  #watchlistNum;
  #historyNum;
  #favoritesNum;
  #menuClickerCallback;
  constructor(menuInfoCount) {
    super();
    this.#watchlistNum = menuInfoCount.watchlist;
    this.#historyNum = menuInfoCount.history;
    this.#favoritesNum = menuInfoCount.favorite;
    this._restoreHandlers = () => {
      const buttons = document.body.querySelectorAll('.main-navigation__item');
      buttons.forEach((button)=>{
        button.addEventListener('click', this.#menuClickerCallback);
      });
    };
  }

  get template() {
    return `<nav class="main-navigation">
      <a href="#all" class="main-navigation__item">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span
        class="main-navigation__item-count">${  this.#watchlistNum  }</span></a>
      <a href="#history" class="main-navigation__item">History <span
        class="main-navigation__item-count">${  this.#historyNum  }</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span
        class="main-navigation__item-count">${  this.#favoritesNum  }</span></a>
    </nav>`;
  }

  get watchlistNum () {
    return '';
  }

  set watchlistNum (intValue) {
    document.querySelector('[href="#watchlist"] .main-navigation__item-count').textContent = intValue;
  }

  get historyNum () {
    return '';
  }

  set historyNum (intValue) {
    document.querySelector('[href="#history"] .main-navigation__item-count').textContent = intValue;
  }

  get favoritesNum () {
    return '';
  }

  set favoritesNum (intValue) {
    document.querySelector('[href="#favorites"] .main-navigation__item-count').textContent = intValue;
  }

  updateMenu = (filmsNum) => {
    this.favoritesNum = filmsNum.favorite;
    this.historyNum = filmsNum.history;
    this.watchlistNum = filmsNum.watchlist;
  };

  menuClickHandler = (callback) => {
    const buttons = document.body.querySelectorAll('.main-navigation__item');
    this.#menuClickerCallback = callback;
    buttons.forEach((button)=>{
      button.addEventListener('click', callback);
    });
  };
}
