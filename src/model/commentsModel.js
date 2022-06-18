import {commentsData, getCommentInformation} from '../mock/data';
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
    console.log(textEncoded);
    console.log(emotion);
  };

  get template() {
    return this.#commentsArray;
  }
}
