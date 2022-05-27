import AbstractView from '../framework/view/abstract-view.js';

export default class EmptyList extends AbstractView{
  #textAllMovies = 'There are no movies in our database';
  #textWatchlist = 'There are no movies to watch now';
  #textHistory = 'There are no watched movies now';
  #textFavorites = 'There are no favorite movies now';
  #selected;

  get EmptyAllMovies() {
    this.#selected = document.createElement('h2');
    this.#selected.classList.add('films-list__title');
    this.#selected.innerHTML = this.#textAllMovies;
    return this.#selected;
  }

  get EmptyWatchlist() {
    this.#selected = document.createElement('h2');
    this.#selected.classList.add('films-list__title');
    this.#selected.innerHTML = this.#textWatchlist;
    return this.#selected;
  }

  get EmptyHistory() {
    this.#selected = document.createElement('h2');
    this.#selected.classList.add('films-list__title');
    this.#selected.innerHTML = this.#textHistory;
    return this.#selected;
  }

  get EmptyFavorites() {
    this.#selected = document.createElement('h2');
    this.#selected.classList.add('films-list__title');
    this.#selected.innerHTML = this.#textFavorites;
    return this.#selected;
  }

  get template() {
    return this.#selected;
  }
}

export { EmptyList };
