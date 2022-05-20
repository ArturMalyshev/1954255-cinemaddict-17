function getTimeFromMins(mins) {
  const hours = Math.trunc(mins/60);
  const minutes = mins % 60;
  return `${  hours  }h ${  minutes  }m`;
}

class Filmcard {
  #name;
  #img;
  #rating;
  #year;
  #duration;
  #genre;
  #description;
  #commentCount;
  #watched;
  #favorite;
  #watchlist;
  constructor(filmInfoObject) {
    this.#name = filmInfoObject.film_info.title;
    this.#img = filmInfoObject.film_info.poster;
    this.#rating = filmInfoObject.film_info.total_rating;
    this.#year = new Date (filmInfoObject.film_info.release.date);
    this.#duration = getTimeFromMins(filmInfoObject.film_info.runtime);
    this.#genre = filmInfoObject.film_info.genre;
    this.#description = filmInfoObject.film_info.description;
    this.#commentCount = filmInfoObject.comments.length;
    this.#watched = filmInfoObject.user_details.already_watched;
    this.#favorite = filmInfoObject.user_details.favorite;
    this.#watchlist = filmInfoObject.user_details.watchlist;
  }

  get generate() {
    const card = document.createElement('article');
    card.classList.add('film-card');
    card.innerHTML = `
        <a class="film-card__link">
          <h3 class="film-card__title">${  this.#name  }</h3>
          <p class="film-card__rating">${  this.#rating  }</p>
          <p class="film-card__info">
            <span class="film-card__year">${  this.#year.getFullYear()  }</span>
            <span class="film-card__duration">${  this.#duration  }</span>
            <span class="film-card__genre">${  this.#genre[0]  }</span>
          </p>
          <img src="${  this.#img  }" alt="${  this.#name  }" class="film-card__poster">
            <p class="film-card__description">${  this.#description  }</p>
            <span class="film-card__comments">${  this.#commentCount  } comments</span>
        </a>
        <div class="film-card__controls">
          <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to
            watchlist
          </button>
          <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">
          Mark as watched
          </button>
          <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite
          </button>
        </div>
    `;
    if (this.#watched) {
      card.querySelector('.film-card__controls-item--mark-as-watched').classList.add('film-card__controls-item--active');
    }
    if (this.#watchlist) {
      card.querySelector('.film-card__controls-item--add-to-watchlist').classList.add('film-card__controls-item--active');
    }
    if (this.#favorite) {
      card.querySelector('.film-card__controls-item--favorite').classList.add('film-card__controls-item--active');
    }
    return card;
  }
}

export { Filmcard };
