import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export default class MovieApiService extends ApiService {
  #filmId;
  constructor() {
    super('https://17.ecmascript.pages.academy/cinemaddict', 'Basic arturka');
    this.#filmId = false;
  }

  get movies() {
    return this._load({url: 'movies'})
      .then(ApiService.parseResponse);
  }

  set comments(filmId) {
    this.#filmId = filmId;
  }

  get comments() {
    if (this.#filmId === false) {
      return [];
    } else {
      return this._load({url: `comments/${ this.#filmId }`})
        .then(ApiService.parseResponse);
    }
  }

  updateMovie = async (movie) => {
    const response = await this._load({
      url: `movies/${ movie.id }`,
      method: Method.PUT,
      body: JSON.stringify(movie),
      headers: new Headers({'Content-Type': 'application/json'}),
    });
    return ApiService.parseResponse(response);
  };
}
