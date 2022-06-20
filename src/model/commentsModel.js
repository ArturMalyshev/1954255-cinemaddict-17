import MovieApiService from '../movie-api-service';
import Observable from '../framework/observable';
// eslint-disable-next-line no-undef
const he = require('he');

export default class CommentsModel extends Observable{
  #commentsArray;
  #commentApi;
  constructor(filmId) {
    super();
    this.#commentApi = new MovieApiService();
    this.#commentApi.comments = filmId;
    this.#commentsArray = [];
  }

  init = async () => {
    try {
      this.#commentsArray = await this.#commentApi.comments;
    } catch(err) {
      this.#commentApi = [];
    }

    this._notify('comments', this.#commentsArray);
  };

  createComment = (text, emotion) => {
    const textEncoded = he.encode(text);
    // eslint-disable-next-line no-console
    console.log(textEncoded);
    // eslint-disable-next-line no-console
    console.log(emotion);
  };

  get template() {
    return this.#commentsArray;
  }
}
