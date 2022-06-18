import {commentsData, getCommentInformation} from '../mock/data';
// eslint-disable-next-line no-undef
const he = require('he');

export default class CommentsModel {
  #commentsArray;
  constructor() {
    const MAX_COMMENT_COUNT = 6;

    this.#commentsArray = [];
    for (let i = 0; i < MAX_COMMENT_COUNT; i++){
      const comment = getCommentInformation(commentsData, i);
      comment.comment = he.decode(comment.comment);
      this.#commentsArray.push(comment);
    }
  }

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
