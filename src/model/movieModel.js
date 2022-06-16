import {filmData, getFilmInformation} from "../mock/data";

export default class MovieModel {
  #films;
  constructor() {
    const FILM_COUNT = 8;
    this.#films = [];

    for (let i = 0; i < FILM_COUNT; i++){
      const newFilm = getFilmInformation(filmData);
      this.#films.push(newFilm);
    }
  }

  get template () {
    return this.#films;
  }
}
