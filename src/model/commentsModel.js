import Observable from '../framework/observable';
import {movieApiService} from '../presenter/presenter';
// eslint-disable-next-line no-undef
const he = require('he');

export default class CommentsModel extends Observable{
  #commentsArray;
  #commentApi;
  constructor(filmId) {
    super();
    this.#commentApi = movieApiService;
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

  createComment = (filmId, text, emotion) => {
    const textEncoded = he.encode(text);
    const data = this.#commentApi.createComment(filmId, emotion, textEncoded);
    this._notify('commentCreate', data);
  };

  deleteComment = (commentId) => {
    const data = {
      promise: this.#commentApi.deleteComment(commentId),
      commentID: commentId
    };
    this._notify('commentDelete', data);
  };

  get template() {
    return this.#commentsArray;
  }
}
