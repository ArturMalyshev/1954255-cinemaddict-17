import {filmData, getFilmInformation} from '../mock/data';
import MovieApiService from '../movie-api-service';
import 'regenerator-runtime/runtime';
import Observable from '../framework/observable';

export default class MovieModel extends Observable{
  #films;
  #FILM_COUNT;
  #filmApi;
  constructor() {
    super();
    this.#filmApi = new MovieApiService('https://17.ecmascript.pages.academy/cinemaddict', 'Basic 11arturka11');
    this.#FILM_COUNT = 8;
    this.#films = [];
  }

  updateFilmById = (filmId, thisFilm) => {
    for (let i = 0; i < this.#films.length; i++) {
      if (this.#films[i].id === filmId) {
        this.#films[i] = thisFilm;
      }
    }
  };

  init = async () => {
    try {
      this.#films = await this.#filmApi.movies;
      console.log(this.#films);
    } catch (err) {
      this.#films = [];
    }
    this._notify('INIT', '');
    return 'INIT';
  };

  get template () {
    return this.#films;
  }

  get template2 () {
    const data = [];
    for (let i = 0; i < this.#FILM_COUNT; i++){
      data.push(getFilmInformation(filmData));
    }
    return data;
  }
}
