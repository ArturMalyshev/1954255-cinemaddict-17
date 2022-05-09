class Filmcard {
  constructor(filmInfoObject) {
    this.name = filmInfoObject.filmName;
    this.img = filmInfoObject.imgPath;
    this.rating = filmInfoObject.rating;
    this.year = filmInfoObject.year;
    this.duration = filmInfoObject.duration;
    this.genre = filmInfoObject.genre;
    this.description = filmInfoObject.description;
    this.commentCount = filmInfoObject.commentCount;
  }

  generate() {
    const card = document.createElement('article');
    card.classList.add('film-card');
    card.innerHTML = `
        <a class="film-card__link">
          <h3 class="film-card__title">${  this.name  }</h3>
          <p class="film-card__rating">${  this.rating  }</p>
          <p class="film-card__info">
            <span class="film-card__year">${  this.year  }</span>
            <span class="film-card__duration">${  this.duration  }</span>
            <span class="film-card__genre">${  this.genre[0]  }</span>
          </p>
          <img src="${  this.img  }" alt="${  this.name  }" class="film-card__poster">
            <p class="film-card__description">${  this.description  }</p>
            <span class="film-card__comments">${  this.commentCount  } comments</span>
        </a>
        <div class="film-card__controls">
          <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to
            watchlist
          </button>
          <button
            class="film-card__controls-item film-card__controls-item--mark-as-watched film-card__controls-item--active"
            type="button">Mark as watched
          </button>
          <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite
          </button>
        </div>
    `;
    return card;
  }
}

export { Filmcard };
