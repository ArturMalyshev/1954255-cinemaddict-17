export default class SortMenuModel {
  #filmArray;
  constructor(filmList) {
    this.#filmArray = filmList;
  }

  getSortedFilms = (mode = 'sortByDefault') => {
    if (mode === 'sortByDate') {
      const array = this.#filmArray.slice();
      array.sort((a, b) => Date.parse(b.film_info.release.date) - Date.parse(a.film_info.release.date));
      return array;
    } else if (mode === 'sortByRating') {
      const array = this.#filmArray.slice();
      array.sort((a, b) => b.film_info.total_rating - a.film_info.total_rating);
      return array;
    } else {
      return this.#filmArray;
    }
  };
}
