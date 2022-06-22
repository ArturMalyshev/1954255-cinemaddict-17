import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
};

export default class MovieApiService extends ApiService {
  #filmId;
  constructor() {
    super('https://17.ecmascript.pages.academy/cinemaddict', 'Basic arturka');
    this.#filmId = false;
  }

  #adaptToServer = async (data) => {
    const adapted = {
      ...data,
      'user_details' : {
        'already_watched' : data['userDetails']['alreadyWatched'],
        'watching_date' : data['userDetails']['watchingDate'],
        'watchlist': data['userDetails']['watchlist'],
        'favorite' : data['userDetails']['favorite'],
      },
      'film_info' : {
        'title' : data['filmInfo']['title'],
        'alternative_title' : data['filmInfo']['alternativeTitle'],
        'total_rating': data['filmInfo']['totalRating'],
        'poster' : data['filmInfo']['poster'],
        'age_rating' : data['filmInfo']['ageRating'],
        'description' : data['filmInfo']['description'],
        'director' : data['filmInfo']['director'],
        'genre' : data['filmInfo']['genre'],
        'release' : {
          'date' : data['filmInfo']['release']['date'],
          'release_country' : data['filmInfo']['release']['releaseCountry'],
        },
        'runtime' : data['filmInfo']['runtime'],
        'writers' : data['filmInfo']['writers'],
        'actors' : data['filmInfo']['actors'],
      }
    };

    delete adapted['userDetails'];
    delete adapted['filmInfo'];
    return adapted;
  };

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
      body: JSON.stringify(await this.#adaptToServer(movie)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });
    return ApiService.parseResponse(response);
  };

  createComment = async (filmId, emoji, text) => {
    const body = {
      emotion: emoji,
      comment: text
    };
    const response = await this._load({
      url: `comments/${ filmId }`,
      method: Method.POST,
      body: JSON.stringify(body),
      headers: new Headers({'Content-Type': 'application/json'}),
    });
    return ApiService.parseResponse(response);
  };

  deleteComment = async (commentId) => {
    await this._load({
      url: `comments/${ commentId }`,
      method: Method.DELETE,
    });
    return ApiService.response;
  };
}
