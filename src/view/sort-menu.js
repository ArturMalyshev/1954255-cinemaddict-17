import AbstractView from '../framework/view/abstract-view';

export default class SortMenu extends AbstractView{
  get template() {
    return `<ul class="sort">
        <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
        <li><a href="#" class="sort__button">Sort by date</a></li>
        <li><a href="#" class="sort__button">Sort by rating</a></li>
      </ul>`;
  }

  sortMenuClickHandler = (callback) => {
    document.querySelectorAll('.sort__button').forEach((element)=>{
      element.addEventListener('click', callback);
    });
  };
}

