import AbstractView from '../framework/view/abstract-view';
import MovieModel from '../model/movieModel';
import {commentsData} from '../mock/data';
import CommentsModel from '../model/commentsModel';

export default class PresenterMovie extends AbstractView{
  //умеет выдавать свою карточку
  //умеет по клику выдавть попап
  #renderPosition;
  #filmData;
  #renderFunction;
  #filmcardView;
  #popupView;
  #commentsArray;

  constructor(oneFilmData, comments, renderFunction, renderPosition, filmcardView, popupView) {
    super();
    this.#filmData = oneFilmData;
    this.#renderFunction = renderFunction;
    this.#filmcardView = filmcardView;
    this.#popupView = popupView;
    this.#commentsArray = comments;
    this.#renderPosition = renderPosition;
  }

  #createPopup = (filmcard) => {
    const popup = new this.#popupView(this.#filmData, this.#commentsArray);
    this.#renderFunction(popup, document.querySelector('.main'), this.#renderPosition.BEFOREEND);

    popup.closeButtonClickHandler(() => {
      document.querySelector('.film-details').remove();
      document.body.classList.remove('hide-overflow');
    });

    popup.deleteComment();

    const movieModel = new MovieModel();
    popup.popupEmotionClickHandler();

    popup.popupAddSaveCommentHandler(()=>{
      const pressed = new Set();
      document.addEventListener('keyup', (evt)=>{
        if (evt.key === 'Meta' || evt.key === 'Enter' || evt.key === 'Ctrl') {
          pressed.clear();
        }
      });
      document.addEventListener('keydown', (evt)=>{
        pressed.add(evt.key);
        const emojiField = document.querySelector('.film-details__add-emoji-label');
        const commentField = document.querySelector('.film-details__comment-input');
        if ((pressed.has('Meta') && (pressed.has('Enter'))) || (pressed.has('Ctrl') && (pressed.has('Enter')))) {
          if (emojiField.innerHTML !== ''){
            if (commentField.value !== '') {
              const emojiName = emojiField.firstChild.getAttribute('alt').slice(6);
              new CommentsModel().createComment(commentField.value, emojiName);
              popup.updatePopup(filmcard);
            }
          }
        } else {
          pressed.clear();
          if (evt.key === 'Meta') {
            pressed.add('Meta');
          } else if (evt.key === 'Enter') {
            pressed.add('Enter');
          } else if (evt.key === 'Ctrl') {
            pressed.add('Enter');
          }
          return;
        }
        pressed.clear();
      });
    });

    popup.popupWatchlistClickHandler((evt)=>{
      evt.preventDefault();
      const watchListButton = popup.element.querySelector('.film-details__control-button--watchlist');
      filmcard.filmCardWatchListButtonHandler();
      if (watchListButton.classList.contains('film-details__control-button--active')) {
        watchListButton.classList.remove('film-details__control-button--active');
        this.#filmData.user_details.watchlist = false;
      } else {
        watchListButton.classList.add('film-details__control-button--active');
        this.#filmData.user_details.watchlist = true;
      }
      movieModel.updateFilmById(this.#filmData.id, this.#filmData);
    }); //Popup watchlist click handler

    popup.popupFavoriteClickHandler((evt)=>{
      evt.preventDefault();
      const favoriteButton = popup.element.querySelector('.film-details__control-button--favorite');
      filmcard.filmCardFavoriteButtonHandler();
      if (favoriteButton.classList.contains('film-details__control-button--active')) {
        favoriteButton.classList.remove('film-details__control-button--active');
        this.#filmData.user_details.favorite = false;
      } else {
        favoriteButton.classList.add('film-details__control-button--active');
        this.#filmData.user_details.favorite = true;
      }
      movieModel.updateFilmById(this.#filmData.id, this.#filmData);
    }); //Popup favorite click handler

    popup.popupWatchedClickHandler((evt)=>{
      evt.preventDefault();
      const watchedButton = popup.element.querySelector('.film-details__control-button--watched');
      filmcard.filmCardWatchedButtonHandler();
      if (watchedButton.classList.contains('film-details__control-button--active')) {
        watchedButton.classList.remove('film-details__control-button--active');
        this.#filmData.user_details.alreadyWatched = false;
      } else {
        watchedButton.classList.add('film-details__control-button--active');
        this.#filmData.user_details.alreadyWatched = true;
      }
      movieModel.updateFilmById(this.#filmData.id, this.#filmData);
    }); //Popup watched click handler
  };

  #createFilmcard = (data) => {
    const filmcard = new this.#filmcardView(data);
    filmcard.filmCardClickHandler(()=>{
      if (document.querySelector('.film-details')) {
        document.querySelector('.film-details').remove();
      }
      document.body.classList.add('hide-overflow');
      this.#createPopup(filmcard);
    });
    const movieModel = new MovieModel();

    filmcard.filmCardFavoriteClickHandler((evt)=>{
      evt.preventDefault();
      const favoriteButton = filmcard.element.querySelector('.film-card__controls-item--favorite');
      if (favoriteButton.classList.contains('film-card__controls-item--active')) {
        favoriteButton.classList.remove('film-card__controls-item--active');
        this.#filmData.user_details.favorite = false;
        if (document.querySelector('.main-navigation__item--active').innerHTML.includes('Favorites')) {
          filmcard.element.remove();
        }
      } else {
        favoriteButton.classList.add('film-card__controls-item--active');
        this.#filmData.user_details.favorite = true;
      }
      movieModel.updateFilmById(this.#filmData.id, this.#filmData);
    }); //favorite button click Handler

    filmcard.filmCardWatchedClickHandler((evt)=>{
      evt.preventDefault();
      const watchedButton = filmcard.element.querySelector('.film-card__controls-item--mark-as-watched');
      if (watchedButton.classList.contains('film-card__controls-item--active')) {
        watchedButton.classList.remove('film-card__controls-item--active');
        this.#filmData.user_details.alreadyWatched = false;
        if (document.querySelector('.main-navigation__item--active').innerHTML.includes('History')) {
          filmcard.element.remove();
        }
      } else {
        watchedButton.classList.add('film-card__controls-item--active');
        this.#filmData.user_details.alreadyWatched = true;
      }
      movieModel.updateFilmById(this.#filmData.id, this.#filmData);
    }); //watched button click Handler

    filmcard.filmCardWatchlistClickHandler((evt)=>{
      evt.preventDefault();
      const watchListButton = filmcard.element.querySelector('.film-card__controls-item--add-to-watchlist');
      if (watchListButton.classList.contains('film-card__controls-item--active')) {
        watchListButton.classList.remove('film-card__controls-item--active');
        this.#filmData.user_details.watchlist = false;
        if (document.querySelector('.main-navigation__item--active').innerHTML.includes('Watchlist')) {
          filmcard.element.remove();
        }
      } else {
        watchListButton.classList.add('film-card__controls-item--active');
        this.#filmData.user_details.watchlist = true;
        movieModel.updateFilmById(this.#filmData.id, this.#filmData);
      }
    }); //watchList button click Handler

    this.#renderFunction(filmcard, document.querySelector('.films-list__container'), this.#renderPosition.BEFOREEND);
  };

  filmcard = (() => {
    this.#createFilmcard(this.#filmData);
  });

  get template() {
    return '';
  }
}
