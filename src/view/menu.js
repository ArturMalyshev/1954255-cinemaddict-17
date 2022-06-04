import AbstractView from '../framework/view/abstract-view';

export default class Menu extends AbstractView{
  #watchlistNum;
  #historyNum;
  #favoritesNum;
  constructor(menuInfoCount) {
    super();
    this.#watchlistNum = menuInfoCount.watchlist;
    this.#historyNum = menuInfoCount.history;
    this.#favoritesNum = menuInfoCount.favorite;
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

  menuClickHandler = (callback, element) => {
    const buttons = document.body.querySelectorAll(element);
    buttons.forEach((button)=>{
      button.addEventListener('click', callback);
    });
  };
}
