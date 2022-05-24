import AbstractView from '../framework/view/abstract-view';

export default class EmptyList extends AbstractView{
  #textAllMovies = 'There are no movies in our database';
  #textWatchlist = 'There are no movies to watch now';
  #textHistory = 'There are no watched movies now';
  #textFavorites = 'There are no favorite movies now';

  get EmptyAllMovies() {
    return `<h2 class="films-list__title"> ${ this.#textAllMovies }</h2>`;
  }

  get EmptyWatchlist() {
    return `<h2 class="films-list__title"> ${ this.#textWatchlist }</h2>`;
  }

  get EmptyHistory() {
    return `<h2 class="films-list__title"> ${ this.#textHistory }</h2>`;
  }

  get EmptyFavorites() {
    return `<h2 class="films-list__title"> ${ this.#textFavorites }</h2>`;
  }

  get template() {
    return this.EmptyAllMovies;
  }
}

export { EmptyList };
