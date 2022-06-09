import AbstractView from '../framework/view/abstract-view';
import dayjs from 'dayjs';

function getTimeFromMins(mins) {
  if (mins > 59) {
    return dayjs().minute(mins+60).format('H[h] m[m]');
  } else {
    return dayjs().minute(mins).format('m[m]');
  }
}

export default class Filmcard extends AbstractView{
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
  #watchlistClass;
  #watchedClass;
  #favoriteClass;
  #filmId;
  constructor(filmInfoObject) {
    super();
    this.#filmId = filmInfoObject.id;
    this.#name = filmInfoObject.film_info.title;
    this.#img = filmInfoObject.film_info.poster;
    this.#rating = filmInfoObject.film_info.total_rating;
    this.#year = new Date (filmInfoObject.film_info.release.date);
    this.#duration = getTimeFromMins(filmInfoObject.film_info.runtime);
    this.#genre = filmInfoObject.film_info.genre;
    this.#description = filmInfoObject.film_info.description;
    this.#commentCount = filmInfoObject.comments.length;
    this.#watched = filmInfoObject.user_details.alreadyWatched;
    this.#favorite = filmInfoObject.user_details.favorite;
    this.#watchlist = filmInfoObject.user_details.watchlist;

    if (this.#watched) {
      this.#watchedClass = 'film-card__controls-item--active';
    } else {
      this.#watchedClass = '';
    }

    if (this.#watchlist) {
      this.#watchlistClass = 'film-card__controls-item--active';
    } else {
      this.#watchlistClass = '';
    }

    if (this.#favorite) {
      this.#favoriteClass = 'film-card__controls-item--active';
    } else {
      this.#favoriteClass = '';
    }
  }

  get template() {
    return `
      <article class="film-card">
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
          <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${ this.#watchlistClass }" type="button">Add to
            watchlist
          </button>
          <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${ this.#watchedClass }" type="button">
          Mark as watched
          </button>
          <button class="film-card__controls-item film-card__controls-item--favorite ${ this.#favoriteClass }" type="button">Mark as favorite
          </button>
        </div>
      </article>
    `;
  }

  filmCardClickHandler = (callback) => {
    this.element.querySelector('.film-card__link').addEventListener('click', callback);
  };

  filmCardWatchlistClickHandler = (callback) => {
    this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', callback);
  };

  filmCardFavoriteClickHandler = (callback) => {
    this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', callback);
  };

  filmCardWatchedClickHandler = (callback) => {
    this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', callback);
  };

  filmCardWatchListButtonHandler = () => {
    const button = this.element.querySelector('.film-card__controls-item--add-to-watchlist');
    if (button.classList.contains('film-card__controls-item--active')) {
      button.classList.remove('film-card__controls-item--active');
    } else {
      button.classList.add('film-card__controls-item--active');
    }
  };

  filmCardFavoriteButtonHandler = () => {
    const button = this.element.querySelector('.film-card__controls-item--favorite');
    if (button.classList.contains('film-card__controls-item--active')) {
      button.classList.remove('film-card__controls-item--active');
    } else {
      button.classList.add('film-card__controls-item--active');
    }
  };

  filmCardWatchedButtonHandler = () => {
    const button = this.element.querySelector('.film-card__controls-item--mark-as-watched');
    if (button.classList.contains('film-card__controls-item--active')) {
      button.classList.remove('film-card__controls-item--active');
    } else {
      button.classList.add('film-card__controls-item--active');
    }
  };

}

