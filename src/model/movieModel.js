import MovieApiService from '../movie-api-service';
import 'regenerator-runtime/runtime';
import Observable from '../framework/observable';

export default class MovieModel extends Observable {
  #films;
  #filmApi;
  #watchlistNum;
  #historyNum;
  #favoritesNum;
  constructor() {
    super();
    this.#filmApi = new MovieApiService();
    this.#films = [];
    this.#watchlistNum = [];
    this.#historyNum = [];
    this.#favoritesNum = [];
  }

  init = async () => {
    try {
      this.#films = await this.#filmApi.movies;
      this.#films.forEach((film)=>{
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
    } catch(err) {
      this.#films = [];
    }

    this._notify('init', this.sortedFilms);
    document.querySelector('[href="#all"]').click();
  };

  updateFilmById = (filmId, thisFilm) => {
    for (let i = 0; i < this.#films.length; i++) {
      if (this.#films[i].id === filmId) {
        this.#films[i] = thisFilm;
      }
    }
  };

  get template () {
    return this.#films;
  }

  get sortedFilms () {
    return {
      watchlist: this.#watchlistNum.length,
      history: this.#historyNum.length,
      favorite: this.#favoritesNum.length
    };
  }

  get watchlistFilms () {
    return this.#watchlistNum;
  }

  get historyFilms () {
    return this.#historyNum;
  }

  get favoriteFilms () {
    return this.#favoritesNum;
  }
}
