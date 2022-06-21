export default class SortMenuModel {
  #filmArray;
  constructor(filmList) {
    this.#filmArray = filmList;
  }

  getSortedFilms = (mode = 'sortByDefault') => {
    if (mode === 'sortByDate') {
      const array = this.#filmArray.slice();
      array.sort((a, b) => Date.parse(b.filmInfo.release.date) - Date.parse(a.filmInfo.release.date));
      return array;
    } else if (mode === 'sortByRating') {
      const array = this.#filmArray.slice();
      array.sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating);
      return array;
    } else {
      return this.#filmArray;
    }
  };
}
