import MovieApiService from '../movie-api-service';
import 'regenerator-runtime/runtime';
import Observable from '../framework/observable';

export default class MovieModel extends Observable {
  #films;
  #filmApi;
  #watchlistNum;
  #historyNum;
  #favoritesNum;
  #oneFilmFromServer;
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

  updateFilmById = async (thisFilm) => {
    this.#oneFilmFromServer = await this.#filmApi.updateMovie(thisFilm);
    this._notify('updateFilm', this.#oneFilmFromServer);
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
