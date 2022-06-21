import MovieModel from '../model/movieModel';
import CommentsModel from '../model/commentsModel';
import AbstractView from '../framework/view/abstract-view';

export default class PresenterMovie extends AbstractView{
  #renderPosition;
  #filmData;
  #renderFunction;
  #filmcardView;
  #popupView;
  #comments;
  #commentsArray;
  #movieModel;
  #filmcard;

  constructor(oneFilmData, renderFunction, renderPosition, filmcardView, popupView) {
    super();
    this.#filmData = oneFilmData;
    this.#renderFunction = renderFunction;
    this.#filmcardView = filmcardView;
    this.#popupView = popupView;
    this.#comments = new CommentsModel(oneFilmData.id);
    this.#movieModel = new MovieModel();
    this.#comments.init();
    this.#comments.addObserver(this.#handleModelEvent);
    this.#movieModel.addObserver(this.#handleModelEvent);
    this.#commentsArray = [];
    this.#renderPosition = renderPosition;
  }

  #handleModelEvent = (actionType, data) => {
    if (actionType === 'comments') {
      this.#commentsArray = data;
    } else if (actionType === 'updateFilm') {
      console.log('updateFilm', data);
      this.#filmcard.updateFilmcard(data);
    } else {
      console.log('new', actionType, data);
    }
  };

  #createPopup = (filmcard) => {
    const popup = new this.#popupView(this.#filmData, this.#commentsArray);
    this.#renderFunction(popup, document.querySelector('.main'), this.#renderPosition.BEFOREEND);

    popup.closeButtonClickHandler(() => {
      document.querySelector('.film-details').remove();
      document.body.classList.remove('hide-overflow');
    });

    popup.deleteComment();

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
      this.#movieModel.updateFilmById(this.#filmData);
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
      this.#movieModel.updateFilmById(this.#filmData);
    }); //Popup favorite click handler

    popup.popupWatchedClickHandler((evt)=>{
      evt.preventDefault();
      const watchedButton = popup.element.querySelector('.film-details__control-button--watched');
      filmcard.filmCardWatchedButtonHandler();
      if (watchedButton.classList.contains('film-details__control-button--active')) {
        watchedButton.classList.remove('film-details__control-button--active');
        this.#filmData.user_details.already_watched = false;
      } else {
        watchedButton.classList.add('film-details__control-button--active');
        this.#filmData.user_details.already_watched = true;
      }
      this.#movieModel.updateFilmById(this.#filmData);
    }); //Popup watched click handler
  };

  #createFilmcard = (data) => {
    this.#filmcard = new this.#filmcardView(data);
    this.#filmcard.filmCardClickHandler(()=>{
      if (document.querySelector('.film-details')) {
        document.querySelector('.film-details').remove();
      }
      document.body.classList.add('hide-overflow');
      this.#createPopup(this.#filmcard);
    });

    this.#filmcard.filmCardFavoriteClickHandler((evt)=>{
      evt.preventDefault();
      this.#filmCardFavoriteClickHandlerCallback();
    }); //favorite button click Handler

    this.#filmcard.filmCardWatchedClickHandler((evt)=>{
      evt.preventDefault();
      this.#filmCardWatchedClickHandlerCallback();
    }); //watched button click Handler

    this.#filmcard.filmCardWatchlistClickHandler((evt)=>{
      evt.preventDefault();
      this.#filmCardWatchlistClickHandlerCallback();
    }); //watchList button click Handler

    this.#renderFunction(this.#filmcard, document.querySelector('.films-list__container'), this.#renderPosition.BEFOREEND);
  };

  #filmCardFavoriteClickHandlerCallback = () => {
    if (this.#filmData.user_details.favorite === true) {
      this.#filmData.user_details.favorite = false;
    } else {
      this.#filmData.user_details.favorite = true;
    }
    this.#movieModel.updateFilmById(this.#filmData);
  };

  #filmCardWatchedClickHandlerCallback = () => {
    if (this.#filmData.user_details.already_watched === true) {
      this.#filmData.user_details.already_watched = false;
    } else {
      this.#filmData.user_details.already_watched = true;
    }
    this.#movieModel.updateFilmById(this.#filmData);
  };

  #filmCardWatchlistClickHandlerCallback = () => {
    if (this.#filmData.user_details.watchlist === true) {
      this.#filmData.user_details.watchlist = false;
    } else {
      this.#filmData.user_details.watchlist = true;
    }
    this.#movieModel.updateFilmById(this.#filmData);
  };

  filmcard = (() => {
    this.#createFilmcard(this.#filmData);
  });

  get template() {
    return '';
  }
}
