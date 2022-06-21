import dayjs from 'dayjs';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';

function getTimeFromMins(mins) {
  if (mins > 59) {
    return dayjs().minute(mins+60).format('H[h] m[m]');
  } else {
    return dayjs().minute(mins).format('m[m]');
  }
}

export default class Filmcard extends AbstractStatefulView{
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
  #state;
  #filmCardClickHandlerCallback;
  #filmCardWatchlistClickHandlerCallback;
  #filmCardFavoriteClickHandlerCallback;
  #filmCardWatchedClickHandlerCallback;
  constructor(filmInfoObject) {
    super();
    this.#filmId = filmInfoObject.id;
    this.#name = filmInfoObject.filmInfo.title;
    this.#img = filmInfoObject.filmInfo.poster;
    this.#rating = filmInfoObject.filmInfo.totalRating;
    this.#year = new Date (filmInfoObject.filmInfo.release.date);
    this.#duration = getTimeFromMins(filmInfoObject.filmInfo.runtime);
    this.#genre = filmInfoObject.filmInfo.genre;
    this.#description = filmInfoObject.filmInfo.description;
    this.#commentCount = filmInfoObject.comments.length;
    this.#state = {
      watched: false,
      favorite:  false,
      watchlist: false
    };
    this.#state.watched = filmInfoObject.userDetails.alreadyWatched;
    this.#state.favorite = filmInfoObject.userDetails.favorite;
    this.#state.watchlist = filmInfoObject.userDetails.watchlist;

    if (this.#state.watched) {
      this.#watchedClass = 'film-card__controls-item--active';
    } else {
      this.#watchedClass = '';
    }

    if (this.#state.watchlist) {
      this.#watchlistClass = 'film-card__controls-item--active';
    } else {
      this.#watchlistClass = '';
    }

    if (this.#state.favorite) {
      this.#favoriteClass = 'film-card__controls-item--active';
    } else {
      this.#favoriteClass = '';
    }

    this._restoreHandlers = () => {
      if (this.#state.favorite) {
        this.element.querySelector('.film-card__controls-item--favorite').classList.add('film-card__controls-item--active');
      } else {
        this.element.querySelector('.film-card__controls-item--favorite').classList.remove('film-card__controls-item--active');
      }
      if (this.#state.watchlist) {
        this.element.querySelector('.film-card__controls-item--add-to-watchlist').classList.add('film-card__controls-item--active');
      } else {
        this.element.querySelector('.film-card__controls-item--add-to-watchlist').classList.remove('film-card__controls-item--active');
      }
      if (this.#state.watched) {
        this.element.querySelector('.film-card__controls-item--mark-as-watched').classList.add('film-card__controls-item--active');
      } else {
        this.element.querySelector('.film-card__controls-item--mark-as-watched').classList.remove('film-card__controls-item--active');
      }
      this.element.querySelector('.film-card__link').addEventListener('click', this.#filmCardClickHandlerCallback);
      this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this.#filmCardWatchlistClickHandlerCallback);
      this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#filmCardFavoriteClickHandlerCallback);
      this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#filmCardWatchedClickHandlerCallback);
    };
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

  updateFilmcard = (filmData) => {
    this.#state = {
      watched: filmData.userDetails.alreadyWatched,
      favorite:  filmData.userDetails.favorite,
      watchlist: filmData.userDetails.watchlist,
    };
    this.updateElement(this.#state);
  };

  filmCardClickHandler = (callback) => {
    this.#filmCardClickHandlerCallback = callback;
    this.element.querySelector('.film-card__link').addEventListener('click', this.#filmCardClickHandlerCallback);
  };

  filmCardWatchlistClickHandler = (callback) => {
    this.#filmCardWatchlistClickHandlerCallback = callback;
    this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this.#filmCardWatchlistClickHandlerCallback);
  };

  filmCardFavoriteClickHandler = (callback) => {
    this.#filmCardFavoriteClickHandlerCallback = callback;
    this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#filmCardFavoriteClickHandlerCallback);
  };

  filmCardWatchedClickHandler = (callback) => {
    this.#filmCardWatchedClickHandlerCallback = callback;
    this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#filmCardWatchedClickHandlerCallback);
  };

}

