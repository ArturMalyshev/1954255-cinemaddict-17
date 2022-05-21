class MoreButton {
  #allFilms;
  constructor (filmsArray) {
    this.#allFilms = filmsArray;
  }

  get films() {
    return this.#allFilms;
  }

  get showMoreButton() {
    const button = document.createElement('button');
    button.classList.add('films-list__show-more');
    button.textContent = 'Show more';
    button.addEventListener('click', () => {
      console.log(this.films);
    });
    return button;
  }
}

export { MoreButton };
