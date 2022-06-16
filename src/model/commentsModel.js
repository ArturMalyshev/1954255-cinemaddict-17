import {commentsData, getCommentInformation} from "../mock/data";

export default class CommentsModel {
  #commentsArray;
  constructor() {
    const MAX_COMMENT_COUNT = 6;

    this.#commentsArray = [];
    for (let i = 0; i < MAX_COMMENT_COUNT; i++){
      this.#commentsArray.push(getCommentInformation(commentsData, i));
    }

  }

  get template() {
    return this.#commentsArray;
  }
}
