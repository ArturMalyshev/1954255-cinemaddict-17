import AbstractView from '../framework/view/abstract-view';

export default class ShowMoreButton extends AbstractView{
  #callback;
  get template() {
    return '<button class="films-list__show-more">Show more</button>';
  }

  removeClickHandler = () => {
    this.element.removeEventListener('click', this.#callback);
  };

  setClickHandler = (callback) => {
    this.#callback = callback;
    this.element.addEventListener('click', this.#callback);
  };
}
