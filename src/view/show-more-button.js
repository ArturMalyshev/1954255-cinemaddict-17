import AbstractView from '../framework/view/abstract-view';

export default class ShowMoreButton extends AbstractView{
  get template() {
    return '<button class="films-list__show-more">Show more</button>';
  }

  setClickHandler = (callback) => {
    console.log(this.element);
    this.element.addEventListener('click', callback);
  };
}
