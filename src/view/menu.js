import AbstractView from '../framework/view/abstract-view';

export default class Menu extends AbstractView{
  #watchlistNum;
  #historyNum;
  #favoritesNum;
  constructor(menuInfo) {
    super();
    this.#watchlistNum = [];
    this.#historyNum = [];
    this.#favoritesNum = [];

    menuInfo.forEach((film)=>{
      if(film.user_details.watchlist){
        this.#watchlistNum.push(film.user_details.watchlist);
      }
      if(film.user_details.already_watched) {
        this.#historyNum.push(film.user_details.already_watched);
      }
      if(film.user_details.favorite){
        this.#favoritesNum.push(film.user_details.favorite);
      }
    });

    this.#watchlistNum = this.#watchlistNum.length;
    this.#historyNum = this.#historyNum.length;
    this.#favoritesNum = this.#favoritesNum.length;
  }

  get template() {
    return `<nav class="main-navigation">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span
        class="main-navigation__item-count">${  this.#watchlistNum  }</span></a>
      <a href="#history" class="main-navigation__item">History <span
        class="main-navigation__item-count">${  this.#historyNum  }</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span
        class="main-navigation__item-count">${  this.#favoritesNum  }</span></a>
    </nav>`;
  }

  menuClickHandler = (callback, element) => {
    document.body.querySelector(element).addEventListener('click', callback);
  };
}
