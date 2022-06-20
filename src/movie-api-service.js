import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export default class MovieApiService extends ApiService {
  #filmId;
  constructor() {
    super('https://17.ecmascript.pages.academy/cinemaddict', 'Basic 11arturka11');
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

  updateMovie = async (task) => {
    const response = await this._load({
      url: `tasks/${task.id}`,
      method: Method.PUT,
      body: JSON.stringify(task),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };
}
