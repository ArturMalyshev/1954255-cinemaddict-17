class Menu{
  #watchlistNum;
  #historyNum;
  #favoritesNum;
  constructor(menuInfo) {
    this.#watchlistNum = menuInfo.watchlistNum;
    this.#historyNum = menuInfo.historyNum;
    this.#favoritesNum = menuInfo.favoritesNum;
  }

  get menu() {
    const elementMenu = document.createElement('nav');
    elementMenu.classList.add('main-navigation');
    elementMenu.innerHTML = `
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span
        class="main-navigation__item-count">${  this.#watchlistNum  }</span></a>
      <a href="#history" class="main-navigation__item">History <span
        class="main-navigation__item-count">${  this.#historyNum  }</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span
        class="main-navigation__item-count">${  this.#favoritesNum  }</span></a>`;
    return elementMenu;
  }

  get sortMenu() {
    const elementSortMenu = document.createElement('ul');
    elementSortMenu.classList.add('sort');
    elementSortMenu.innerHTML = `
      <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" class="sort__button">Sort by date</a></li>
      <li><a href="#" class="sort__button">Sort by rating</a></li>
    `;
    return elementSortMenu;
  }

  get showMoreButton() {
    const button = document.createElement('button');
    button.classList.add('films-list__show-more');
    button.textContent = 'Show more';
    button.addEventListener('click', (evt) => {
      evt.preventDefault();
    });
    return button;
  }
}

export { Menu };
