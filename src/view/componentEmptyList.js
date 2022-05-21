class EmptyList {
  #textAllMovies = 'There are no movies in our database';
  #textWatchlist = 'There are no movies to watch now';
  #textHistory = 'There are no watched movies now';
  #textFavorites = 'There are no favorite movies now';

  get EmptyAllMovies() {
    const text = document.createElement('h2');
    text.classList.add('films-list__title');
    text.textContent = this.#textAllMovies;
    return text;
  }

  get EmptyWatchlist() {
    const text = document.createElement('h2');
    text.classList.add('films-list__title');
    text.textContent = this.#textWatchlist;
    return text;
  }

  get EmptyHistory() {
    const text = document.createElement('h2');
    text.classList.add('films-list__title');
    text.textContent = this.#textHistory;
    return text;
  }

  get EmptyFavorites() {
    const text = document.createElement('h2');
    text.classList.add('films-list__title');
    text.textContent = this.#textFavorites;
    return text;
  }
}

export { EmptyList };
