import AbstractView from '../framework/view/abstract-view';

export default class SortMenu extends AbstractView{
  #filmsArray;

  constructor(allFilms) {
    super();
    this.#filmsArray = allFilms;
  }

  #sortByDate = () => {
    const array = this.#filmsArray.slice();
    array.sort((a, b) => Date.parse(b.film_info.release.date) - Date.parse(a.film_info.release.date));
    return array;
  };

  #sortByRating = () => {
    const array = this.#filmsArray.slice();
    array.sort((a, b) => b.film_info.total_rating - a.film_info.total_rating);
    return array;
  };

  get filmList() {
    const elem = document.querySelector('.sort__button--active');
    if (elem.textContent === 'Sort by date') {
      return this.#sortByDate();
    } else if (elem.textContent === 'Sort by rating') {
      return this.#sortByRating();
    } else {
      return this.#filmsArray;
    }
  }

  get template() {
    return `<ul class="sort">
        <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
        <li><a href="#" class="sort__button">Sort by date</a></li>
        <li><a href="#" class="sort__button">Sort by rating</a></li>
      </ul>`;
  }

  sortMenuClickHandler = (callback, element) => {
    document.body.querySelector(element).addEventListener('click', callback);
  };
}

