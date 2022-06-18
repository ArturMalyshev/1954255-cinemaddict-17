import {filmData, getFilmInformation} from '../mock/data';
import MovieApiService from '../movie-api-service';
import 'regenerator-runtime/runtime';

export default class MovieModel {
  #films;
  #FILM_COUNT;
  #filmApi;
  constructor() {
    this.#filmApi = new MovieApiService('https://17.ecmascript.pages.academy/cinemaddict', 'Basic 11arturka11');
    this.#FILM_COUNT = 8;
    console.log(this.#filmApi);
    this.#films = [];
  }

  updateFilmById = (filmId, thisFilm) => {
    for (let i = 0; i < this.#films.length; i++) {
      if (this.#films[i].id === filmId) {
        this.#films[i] = thisFilm;
      }
    }
  };

  get template () {
    this.#filmApi.movies.then((film)=>{
      console.log(film);
    });
    for (let i = 0; i < this.#FILM_COUNT; i++){
      this.#films.push(getFilmInformation(filmData));
    }
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
