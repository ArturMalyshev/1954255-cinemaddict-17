import {filmData, getFilmInformation} from '../mock/data';

export default class MovieModel {
  #films;
  #FILM_COUNT;
  constructor() {
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

  get template () {
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
