import 'regenerator-runtime/runtime';
import Observable from '../framework/observable';
import {movieApiService} from '../presenter/presenter';

export default class MovieModel extends Observable {
  #films;
  #filmApi;
  #watchlistNum;
  #historyNum;
  #favoritesNum;
  #oneFilmFromServer;
  constructor() {
    super();
    this.#filmApi = movieApiService;
    this.#films = [];
    this.#watchlistNum = [];
    this.#historyNum = [];
    this.#favoritesNum = [];
  }

  adaptFromServer = (data) => {
    const adapted = {
      ...data,
      'userDetails' : {
        'alreadyWatched' : data['user_details']['already_watched'],
        'watchingDate' : data['user_details']['watching_date'],
        'watchlist': data['user_details']['watchlist'],
        'favorite' : data['user_details']['favorite'],
      },
      'filmInfo' : {
        'title' : data['film_info']['title'],
        'alternativeTitle' : data['film_info']['alternative_title'],
        'totalRating': data['film_info']['total_rating'],
        'poster' : data['film_info']['poster'],
        'ageRating' : data['film_info']['age_rating'],
        'description' : data['film_info']['description'],
        'director' : data['film_info']['director'],
        'genre' : data['film_info']['genre'],
        'release' : {
          'date' : data['film_info']['release']['date'],
          'releaseCountry' : data['film_info']['release']['release_country'],
        },
        'runtime' : data['film_info']['runtime'],
        'writers' : data['film_info']['writers'],
        'actors' : data['film_info']['actors'],
      }
    };

    delete adapted['user_details'];
    delete adapted['film_info'];
    return adapted;
  };

  init = async (clickAllMovies) => {
    try {
      this.#watchlistNum = [];
      this.#historyNum = [];
      this.#favoritesNum = [];
      this.#films = await this.#filmApi.movies;
      for (let i = 0; i < this.#films.length; i++) {
        this.#films[i] = this.adaptFromServer(this.#films[i]);
      }
      this.#films.forEach((film)=>{
        if(film.userDetails.watchlist){
          this.#watchlistNum.push(film);
        }
        if(film.userDetails.alreadyWatched) {
          this.#historyNum.push(film);
        }
        if(film.userDetails.favorite){
          this.#favoritesNum.push(film);
        }
      });
    } catch(err) {
      this.#films = [];
    }

    this._notify('init', this.sortedFilms);
    if (clickAllMovies) {
      document.querySelector('[href="#all"]').click();
    }
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
